// src/pages/admin/AdminIndustries/IndustryViewDialog.tsx

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface IndustryViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  industry: {
    id: number;
    slug: string;
    icon: string;
    translations: Array<{
      locale: string;
      title: string;
      description: string;
      applications: string[];
    }>;
  } | null;
  isLoading?: boolean;
}

export default function IndustryViewDialog({
  open,
  onOpenChange,
  industry,
  isLoading = false,
}: IndustryViewDialogProps) {
  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!industry) {
    return null;
  }

  const getTranslation = (locale: string) => {
    return (
      industry.translations.find((t) => t.locale === locale) ||
      industry.translations[0]
    );
  };

  const enTranslation = getTranslation("en");
  const arTranslation = getTranslation("ar");
  const frTranslation = getTranslation("fr"); // ✅ UPDATED: Changed from tw
  const deTranslation = getTranslation("de"); // ✅ UPDATED: Changed from ch

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Industry Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Icon Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              Industry Icon
            </h3>
            <div className="flex items-center justify-center h-32 bg-muted rounded-lg">
              <img
                src={industry.icon}
                alt="Icon"
                className="max-h-24 object-contain"
              />
            </div>
          </div>

          {/* ID and Slug */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Badge variant="outline" className="text-sm">
                ID: {industry.id}
              </Badge>
            </div>
            <div>
              <Badge variant="secondary" className="text-sm">
                Slug: {industry.slug}
              </Badge>
            </div>
          </div>

          {/* Translations Tabs - ✅ UPDATED */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Industry Information
            </h3>
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="ar">العربية</TabsTrigger>
                <TabsTrigger value="fr">Français</TabsTrigger>
                <TabsTrigger value="de">Deutsch</TabsTrigger>
              </TabsList>

              {/* English Content */}
              <TabsContent value="en" className="space-y-4 pt-4">
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {enTranslation.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {enTranslation.description}
                  </p>
                </div>

                {enTranslation.applications &&
                  enTranslation.applications.length > 0 && (
                    <div>
                      <h5 className="font-semibold mb-2">Applications</h5>
                      <div className="flex flex-wrap gap-2">
                        {enTranslation.applications.map((app, index) => (
                          <Badge key={index} variant="secondary">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </TabsContent>

              {/* Arabic Content */}
              <TabsContent value="ar" className="space-y-4 pt-4" dir="rtl">
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {arTranslation.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {arTranslation.description}
                  </p>
                </div>

                {arTranslation.applications &&
                  arTranslation.applications.length > 0 && (
                    <div>
                      <h5 className="font-semibold mb-2">التطبيقات</h5>
                      <div className="flex flex-wrap gap-2">
                        {arTranslation.applications.map((app, index) => (
                          <Badge key={index} variant="secondary">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </TabsContent>

              {/* French Content - ✅ UPDATED */}
              <TabsContent value="fr" className="space-y-4 pt-4">
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {frTranslation.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {frTranslation.description}
                  </p>
                </div>

                {frTranslation.applications &&
                  frTranslation.applications.length > 0 && (
                    <div>
                      <h5 className="font-semibold mb-2">Applications</h5>
                      <div className="flex flex-wrap gap-2">
                        {frTranslation.applications.map((app, index) => (
                          <Badge key={index} variant="secondary">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </TabsContent>

              {/* German Content - ✅ UPDATED */}
              <TabsContent value="de" className="space-y-4 pt-4">
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {deTranslation.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {deTranslation.description}
                  </p>
                </div>

                {deTranslation.applications &&
                  deTranslation.applications.length > 0 && (
                    <div>
                      <h5 className="font-semibold mb-2">Anwendungen</h5>
                      <div className="flex flex-wrap gap-2">
                        {deTranslation.applications.map((app, index) => (
                          <Badge key={index} variant="secondary">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}