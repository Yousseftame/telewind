import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface CategoryViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: {
    id: number;
    image: string;
    icon: string;
    translations: Array<{
      locale: string;
      title: string;
      description: string;
    }>;
  } | null;
  isLoading?: boolean;
}

export default function CategoryViewDialog({
  open,
  onOpenChange,
  category,
  isLoading = false,
}: CategoryViewDialogProps) {
  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!category) {
    return null;
  }

  const getTranslation = (locale: string) => {
    return (
      category.translations.find((t) => t.locale === locale) || {
        locale,
        title: "",
        description: "",
      }
    );
  };

 const enTranslation = getTranslation("en");
const arTranslation = getTranslation("ar");
const frTranslation = getTranslation("fr"); // ⚠️ Changed from twTranslation
const deTranslation = getTranslation("de"); // ⚠️ Changed from chTranslation

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Category Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                Category Image
              </h3>
              <img
                src={category.image}
                alt={enTranslation.title}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                Category Icon
              </h3>
              <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
                <img
                  src={category.icon}
                  alt="Icon"
                  className="max-h-32 object-contain"
                />
              </div>
            </div>
          </div>

          {/* ID Badge */}
          <div>
            <Badge variant="outline" className="text-sm">
              ID: {category.id}
            </Badge>
          </div>

          {/* Translations Tabs */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Translations
            </h3>
            <Tabs defaultValue="en" className="w-full">
             <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
  <TabsTrigger value="en">English</TabsTrigger>
  <TabsTrigger value="ar">العربية</TabsTrigger>
  <TabsTrigger value="fr">Français</TabsTrigger>
  <TabsTrigger value="de">Deutsch</TabsTrigger>
</TabsList>

              {/* English Content */}
              <TabsContent value="en" className="space-y-4 pt-4">
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    Title : {enTranslation.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Description : {enTranslation.description}
                  </p>
                </div>
              </TabsContent>

              {/* Arabic Content */}
              <TabsContent value="ar" className="space-y-4 pt-4">
                <div dir="rtl">
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    عنوان : {arTranslation.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    الوصف : {arTranslation.description}
                  </p>
                </div>
              </TabsContent>

              {/* taiwan Content */}
             <TabsContent value="fr" className="space-y-4 pt-4">
  <div>
    <h4 className="text-xl font-bold text-foreground mb-2">
      Titre : {frTranslation.title}
    </h4>
    <p className="text-muted-foreground leading-relaxed">
      Description : {frTranslation.description}
    </p>
  </div>
</TabsContent>

              {/* Simplified / Chinese Content */}
              <TabsContent value="de" className="space-y-4 pt-4">
  <div>
    <h4 className="text-xl font-bold text-foreground mb-2">
      Titel : {deTranslation.title}
    </h4>
    <p className="text-muted-foreground leading-relaxed">
      Beschreibung : {deTranslation.description}
    </p>
  </div>
</TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
