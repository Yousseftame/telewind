// src/pages/admin/AdminPartner/PartnerViewDialog.tsx - UPDATED

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Phone, Globe, Tag, MapPin } from "lucide-react";

interface PartnerViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partner: {
    id: number;
    email: string;
    type: string;
    region: string | null; // ✅ region is now top-level
    phone: string;
    website: string;
    translations: Array<{
      locale: string;
      name: string;
      country: string;
      contact: string;
      focus: string[];
    }>;
  } | null;
  isLoading?: boolean;
}

export default function PartnerViewDialog({
  open,
  onOpenChange,
  partner,
  isLoading = false,
}: PartnerViewDialogProps) {
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

  if (!partner) {
    return null;
  }

  const getTranslation = (locale: string) => {
    return partner.translations.find((t) => t.locale === locale) || partner.translations[0];
  };

  const enTranslation = getTranslation("en");
  const arTranslation = getTranslation("ar");
  const frTranslation = getTranslation("fr");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Partner Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium break-all">{partner.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{partner.phone}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Website</p>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline break-all"
                  >
                    {partner.website}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Type</p>
                  <Badge variant="secondary" className="capitalize">
                    {partner.type}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ ADDED: Region display as top-level field */}
          {partner.region && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Region</p>
                  <p className="font-medium">{partner.region}</p>
                </div>
              </div>
            </div>
          )}

          {/* ID Badge */}
          <div>
            <Badge variant="outline" className="text-sm">
              Partner ID: {partner.id}
            </Badge>
          </div>

          {/* Translations Tabs - WITHOUT REGION */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Partner Information</h3>
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="ar">العربية</TabsTrigger>
                <TabsTrigger value="fr">Français</TabsTrigger>
              </TabsList>

              {/* English Content */}
              <TabsContent value="en" className="space-y-4 pt-4">
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-4">
                    {enTranslation.name}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-background border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Country</p>
                      <p className="font-medium">{enTranslation.country}</p>
                    </div>
                    <div className="p-3 bg-background border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Contact Person</p>
                      <p className="font-medium">{enTranslation.contact}</p>
                    </div>
                  </div>

                  {enTranslation.focus && enTranslation.focus.length > 0 && (
                    <div>
                      <h5 className="font-semibold mb-2">Focus Areas</h5>
                      <div className="flex flex-wrap gap-2">
                        {enTranslation.focus.map((item, index) => (
                          <Badge key={index} variant="secondary">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Arabic Content */}
              <TabsContent value="ar" className="space-y-4 pt-4" dir="rtl">
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-4">
                    {arTranslation.name}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-background border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">الدولة</p>
                      <p className="font-medium">{arTranslation.country}</p>
                    </div>
                    <div className="p-3 bg-background border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">جهة الاتصال</p>
                      <p className="font-medium">{arTranslation.contact}</p>
                    </div>
                  </div>

                  {arTranslation.focus && arTranslation.focus.length > 0 && (
                    <div>
                      <h5 className="font-semibold mb-2">مجالات التركيز</h5>
                      <div className="flex flex-wrap gap-2">
                        {arTranslation.focus.map((item, index) => (
                          <Badge key={index} variant="secondary">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* French Content */}
              <TabsContent value="fr" className="space-y-4 pt-4">
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-4">
                    {frTranslation.name}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-background border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Pays</p>
                      <p className="font-medium">{frTranslation.country}</p>
                    </div>
                    <div className="p-3 bg-background border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Contact</p>
                      <p className="font-medium">{frTranslation.contact}</p>
                    </div>
                  </div>

                  {frTranslation.focus && frTranslation.focus.length > 0 && (
                    <div>
                      <h5 className="font-semibold mb-2">Domaines d'expertise</h5>
                      <div className="flex flex-wrap gap-2">
                        {frTranslation.focus.map((item, index) => (
                          <Badge key={index} variant="secondary">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}