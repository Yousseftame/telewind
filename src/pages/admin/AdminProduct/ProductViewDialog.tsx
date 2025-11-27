import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Radio, Image as ImageIcon, FileText, Download } from "lucide-react";

interface ProductViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: number;
    image: string;
    specification_pdf: string | null; // ✅ NEW
    supported_bands: string[];
    translations: Array<{
      locale: string;
      title: string;
      description: string;
      key_features: string[];
    }>;
  } | null;
  isLoading?: boolean;
}

export default function ProductViewDialog({
  open,
  onOpenChange,
  product,
  isLoading = false,
}: ProductViewDialogProps) {
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

  if (!product) {
    return null;
  }

  const getTranslation = (locale: string) => {
    return (
      product.translations.find((t) => t.locale === locale) ||
      product.translations[0]
    );
  };

  const enTranslation = getTranslation("en");
  const arTranslation = getTranslation("ar");
  const frTranslation = getTranslation("fr");  // ⚠️ Changed from twTranslation
const deTranslation = getTranslation("de");  // ⚠️ Changed from chTranslation

  // ✅ NEW: Extract PDF filename from URL
  const pdfFileName = product.specification_pdf 
    ? product.specification_pdf.split('/').pop() || "specification.pdf"
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Product Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Image */}
          {product.image && (
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src={product.image}
                  alt="Product"
                  className="w-full h-auto rounded-lg border shadow-sm object-cover"
                />
              </div>
            </div>
          )}

          {/* ✅ NEW: PDF Download Section */}
          {product.specification_pdf && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-900 mb-0.5">
                      Product Specification
                    </p>
                    <p className="text-xs text-blue-700 truncate">
                      {pdfFileName}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 border-blue-300 text-blue-700 hover:bg-blue-100"
                  onClick={() => window.open(product.specification_pdf!, '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          )}

          {/* Basic Info Card */}
          <div className="p-4 bg-muted/50 rounded-lg space-y-3">
            <div className="flex items-start gap-2">
              <Radio className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-2">
                  Supported Bands
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.supported_bands &&
                  product.supported_bands.length > 0 ? (
                    product.supported_bands.map((band, index) => (
                      <Badge key={index} variant="secondary">
                        {band}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No bands specified
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ID Badge */}
          <div>
            <Badge variant="outline" className="text-sm">
              Product ID: {product.id}
            </Badge>
          </div>

          {/* Translations Tabs */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Product Information
            </h3>
            <Tabs defaultValue="en" className="w-full">
             <TabsList className="grid w-full grid-cols-4">
  <TabsTrigger value="en">English</TabsTrigger>
  <TabsTrigger value="ar">العربية</TabsTrigger>
  <TabsTrigger value="fr">Français</TabsTrigger>  {/* ⚠️ Changed from Taiwan */}
  <TabsTrigger value="de">Deutsch</TabsTrigger>   {/* ⚠️ Changed from Chinese */}
</TabsList>

              {/* English Content */}
              <TabsContent value="en" className="space-y-4 pt-4">
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-4">
                    {enTranslation.title}
                  </h4>

                  <div className="p-4 bg-background border rounded-lg mb-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      Description
                    </p>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {enTranslation.description}
                    </p>
                  </div>

                  {enTranslation.key_features &&
                    enTranslation.key_features.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-3">Key Features</h5>
                        <ul className="space-y-2">
                          {enTranslation.key_features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 p-3 bg-background border rounded-lg"
                            >
                              <span className="text-primary font-bold mt-0.5">
                                •
                              </span>
                              <span className="flex-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </TabsContent>

              {/* Arabic Content */}
              <TabsContent value="ar" className="space-y-4 pt-4" dir="rtl">
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-4">
                    {arTranslation.title}
                  </h4>

                  <div className="p-4 bg-background border rounded-lg mb-4">
                    <p className="text-xs text-muted-foreground mb-2">الوصف</p>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {arTranslation.description}
                    </p>
                  </div>

                  {arTranslation.key_features &&
                    arTranslation.key_features.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-3">الميزات الرئيسية</h5>
                        <ul className="space-y-2">
                          {arTranslation.key_features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 p-3 bg-background border rounded-lg"
                            >
                              <span className="text-primary font-bold mt-0.5">
                                •
                              </span>
                              <span className="flex-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </TabsContent>

             {/* French Content */}
<TabsContent value="fr" className="space-y-4 pt-4">
  <div>
    <h4 className="text-xl font-bold text-foreground mb-4">
      {frTranslation.title}
    </h4>

    <div className="p-4 bg-background border rounded-lg mb-4">
      <p className="text-xs text-muted-foreground mb-2">Description</p>
      <p className="text-sm leading-relaxed whitespace-pre-wrap">
        {frTranslation.description}
      </p>
    </div>

    {frTranslation.key_features &&
      frTranslation.key_features.length > 0 && (
        <div>
          <h5 className="font-semibold mb-3">Caractéristiques principales</h5>
          <ul className="space-y-2">
            {frTranslation.key_features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 p-3 bg-background border rounded-lg"
              >
                <span className="text-primary font-bold mt-0.5">
                  •
                </span>
                <span className="flex-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
  </div>
</TabsContent>

              {/* German Content */}
<TabsContent value="de" className="space-y-4 pt-4">
  <div>
    <h4 className="text-xl font-bold text-foreground mb-4">
      {deTranslation.title}
    </h4>

    <div className="p-4 bg-background border rounded-lg mb-4">
      <p className="text-xs text-muted-foreground mb-2">Beschreibung</p>
      <p className="text-sm leading-relaxed whitespace-pre-wrap">
        {deTranslation.description}
      </p>
    </div>

    {deTranslation.key_features &&
      deTranslation.key_features.length > 0 && (
        <div>
          <h5 className="font-semibold mb-3">Hauptmerkmale</h5>
          <ul className="space-y-2">
            {deTranslation.key_features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 p-3 bg-background border rounded-lg"
              >
                <span className="text-primary font-bold mt-0.5">
                  •
                </span>
                <span className="flex-1">{feature}</span>
              </li>
            ))}
          </ul>
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