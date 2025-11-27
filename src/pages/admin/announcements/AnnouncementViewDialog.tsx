import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Announcement } from "@/services/types";
import { getTranslation } from "@/utils/formDataHelpers";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  announcement: Announcement | null;
}

export function AnnouncementViewDialog({
  open,
  onOpenChange,
  announcement,
}: Props) {
  if (!announcement) return null;

  const enTrans = getTranslation(announcement, "en");
  const arTrans = getTranslation(announcement, "ar");
  const frTrans = getTranslation(announcement, "fr");
  const deTrans = getTranslation(announcement, "de");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Announcement Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* ID */}
          <div>
            <h3 className="text-sm font-medium">ID</h3>
            <p className="text-muted-foreground">{announcement.id}</p>
          </div>

          {/* Date */}
          <div>
            <h3 className="text-sm font-medium">Date</h3>
            <p className="text-muted-foreground">{announcement.date}</p>
          </div>

          {/* Type */}
          <div>
            <h3 className="text-sm font-medium">Type</h3>
            <p className="text-muted-foreground">{announcement.type}</p>
          </div>

          {/* Translations */}
          <div>
            <h3 className="text-sm font-medium mb-2">Translations</h3>
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="ar">Arabic</TabsTrigger>
                <TabsTrigger value="fr">French</TabsTrigger>
                <TabsTrigger value="de">German</TabsTrigger>
              </TabsList>

              {/* English Tab */}
              <TabsContent value="en" className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Title</h4>
                  <p className="text-muted-foreground">
                    {enTrans?.title || "-"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {enTrans?.description || "-"}
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
                <div>
                  <h4 className="text-sm font-medium">Description</h4>
                  <p
                    className="text-muted-foreground whitespace-pre-wrap"
                    dir="rtl"
                  >
                    {arTrans?.description || "-"}
                  </p>
                </div>
              </TabsContent>

              {/* French Tab */}
              <TabsContent value="fr" className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Title</h4>
                  <p className="text-muted-foreground">
                    {frTrans?.title || "-"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {frTrans?.description || "-"}
                  </p>
                </div>
              </TabsContent>

              {/* German Tab */}
              <TabsContent value="de" className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Title</h4>
                  <p className="text-muted-foreground">
                    {deTrans?.title || "-"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {deTrans?.description || "-"}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Creation Date */}
          {announcement.creationDate && (
            <div>
              <h3 className="text-sm font-medium">Created At</h3>
              <p className="text-muted-foreground">
                {new Date(announcement.creationDate).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}