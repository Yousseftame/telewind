import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Certification } from "@/services/types";
import { getTranslation } from "@/utils/formDataHelpers";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  certification: Certification | null;
}

export function CertificationViewDialog({
  open,
  onOpenChange,
  certification,
}: Props) {
  if (!certification) return null;

  const enTrans = getTranslation(certification, "en");
  const arTrans = getTranslation(certification, "ar");
  const twTrans = getTranslation(certification, "tw");
  const chTrans = getTranslation(certification, "ch");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Certification Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div>
            <h3 className="text-sm font-medium mb-2">Image</h3>
            {certification.image ? (
              <img
                src={certification.image}
                alt="Certification"
                className="w-full max-w-md rounded-lg border"
              />
            ) : (
              <p className="text-muted-foreground">No image</p>
            )}
          </div>

          {/* ID */}
          <div>
            <h3 className="text-sm font-medium">ID</h3>
            <p className="text-muted-foreground">{certification.id}</p>
          </div>

          {/* Translations */}
          <div>
            <h3 className="text-sm font-medium mb-2">Translations</h3>
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="ar">Arabic</TabsTrigger>
                <TabsTrigger value="tw">Taiwan</TabsTrigger>
                <TabsTrigger value="ch">Chinese</TabsTrigger>
              </TabsList>

              {/* English Tab */}
              <TabsContent value="en" className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Title</h4>
                  <p className="text-muted-foreground">
                    {enTrans?.title || "-"}
                  </p>
                </div>
              </TabsContent>

              {/* Arabic Tab */}
              <TabsContent value="ar" className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Title</h4>
                  <p className="text-muted-foreground" dir="rtl">
                    {arTrans?.title || "-"}
                  </p>
                </div>
              </TabsContent>

              {/* Taiwan / Traditional Chinese Tab */}
              <TabsContent value="tw" className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Title</h4>
                  <p className="text-muted-foreground">
                    {twTrans?.title || "-"}
                  </p>
                </div>
              </TabsContent>

              {/* Simplified / Chinese Content Tab */}
              <TabsContent value="ch" className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Title</h4>
                  <p className="text-muted-foreground">
                    {chTrans?.title || "-"}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Creation Date */}
          {certification.creationDate && (
            <div>
              <h3 className="text-sm font-medium">Created At</h3>
              <p className="text-muted-foreground">
                {new Date(certification.creationDate).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
