import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, Upload } from "lucide-react";

interface Product {
  id: number;
  image: string;
  supported_bands: string[];
  translations: Array<{
    locale: string;
    title: string;
    description: string;
    key_features: string[];
  }>;
}

interface localizedContent{ title: string; description: string; key_features: string[] }

interface ProductFormData {
  image: string;
  supported_bands: string[];
  translations: {
    en: localizedContent;
    ar: localizedContent;
    tw: localizedContent;
  };
}

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProductFormData) => void;
  isSubmitting?: boolean;
  product?: Product | null;
}

export default function ProductFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
  product = null,
}: ProductFormDialogProps) {
  const isEditMode = !!product;

  // State for dynamic arrays
  const [supportedBands, setSupportedBands] = useState<string[]>([""]);
  const [keyFeaturesEn, setKeyFeaturesEn] = useState<string[]>([""]);
  const [keyFeaturesAr, setKeyFeaturesAr] = useState<string[]>([""]);
  const [keyFeaturesTw, setKeyFeaturesTw] = useState<string[]>([""]);
  const [imagePreview, setImagePreview] = useState<string>("");

  const getDefaultTranslations = () => {
    if (!product) {
      return {
        en: { title: "", description: "", key_features: [] },
        ar: { title: "", description: "", key_features: [] },
        tw: { title: "", description: "", key_features: [] },
      };
    }

    const translations = {
      en: { title: "", description: "", key_features: [] as string[] },
      ar: { title: "", description: "", key_features: [] as string[] },
      tw: { title: "", description: "", key_features: [] as string[] },
    };

    product.translations.forEach((t) => {
      translations[t.locale as keyof typeof translations] = {
        title: t.title,
        description: t.description,
        key_features: t.key_features || [],
      };
    });

    return translations;
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      image: product?.image || "",
      supported_bands: product?.supported_bands || [],
      translations: getDefaultTranslations(),
    },
  });

  useEffect(() => {
    if (open) {
      const translations = getDefaultTranslations();
      reset({
        image: product?.image || "",
        supported_bands: product?.supported_bands || [],
        translations,
      });

      setSupportedBands(product?.supported_bands && product.supported_bands.length > 0 ? product.supported_bands : [""]);
      setKeyFeaturesEn(translations.en.key_features.length > 0 ? translations.en.key_features : [""]);
      setKeyFeaturesAr(translations.ar.key_features.length > 0 ? translations.ar.key_features : [""]);
      setKeyFeaturesTw(translations.tw.key_features.length > 0 ? translations.tw.key_features : [""]);
      setImagePreview(product?.image || "");
    }
  }, [open, reset, product]);

  const handleFormSubmit = (data: ProductFormData) => {
    onSubmit({
      ...data,
      supported_bands: supportedBands.filter(b => b.trim()),
      translations: {
        en: { ...data.translations.en, key_features: keyFeaturesEn.filter(f => f.trim()) },
        ar: { ...data.translations.ar, key_features: keyFeaturesAr.filter(f => f.trim()) },
        tw: { ...data.translations.tw, key_features: keyFeaturesTw.filter(f => f.trim()) },
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setValue("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Supported Bands handlers
  const addBand = () => setSupportedBands([...supportedBands, ""]);
  const removeBand = (index: number) => setSupportedBands(supportedBands.filter((_, i) => i !== index));
  const updateBand = (index: number, value: string) => {
    const newBands = [...supportedBands];
    newBands[index] = value;
    setSupportedBands(newBands);
  };

  // Key Features handlers
  const addKeyFeature = (lang: "en" | "ar" | "tw") => {
    if (lang === "en") setKeyFeaturesEn([...keyFeaturesEn, ""]);
    if (lang === "ar") setKeyFeaturesAr([...keyFeaturesAr, ""]);
    if (lang === "tw") setKeyFeaturesTw([...keyFeaturesTw, ""]);
  };

  const removeKeyFeature = (lang: "en" | "ar" | "tw", index: number) => {
    if (lang === "en") setKeyFeaturesEn(keyFeaturesEn.filter((_, i) => i !== index));
    if (lang === "ar") setKeyFeaturesAr(keyFeaturesAr.filter((_, i) => i !== index));
    if (lang === "tw") setKeyFeaturesTw(keyFeaturesTw.filter((_, i) => i !== index));
  };

  const updateKeyFeature = (lang: "en" | "ar" | "tw", index: number, value: string) => {
    if (lang === "en") {
      const newFeatures = [...keyFeaturesEn];
      newFeatures[index] = value;
      setKeyFeaturesEn(newFeatures);
    }
    if (lang === "ar") {
      const newFeatures = [...keyFeaturesAr];
      newFeatures[index] = value;
      setKeyFeaturesAr(newFeatures);
    }
    if (lang === "tw") {
      const newFeatures = [...keyFeaturesTw];
      newFeatures[index] = value;
      setKeyFeaturesTw(newFeatures);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Product Image *</Label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              )}
              <div className="flex-1">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Upload a product image (JPG, PNG, WebP)
                </p>
              </div>
            </div>
          </div>

          {/* Supported Bands */}
          <div className="space-y-2">
            <Label>Supported Bands *</Label>
            {supportedBands.map((band, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={band}
                  onChange={(e) => updateBand(index, e.target.value)}
                  placeholder="e.g., 2.4GHz, 5GHz"
                />
                {supportedBands.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeBand(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addBand}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Band
            </Button>
          </div>

          {/* Language Tabs */}
          <div className="space-y-2">
            <Label>Translations *</Label>
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="ar">العربية</TabsTrigger>
                <TabsTrigger value="tw">繁體中文</TabsTrigger>
              </TabsList>

              {/* English Tab */}
              <TabsContent value="en" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translations.en.title">Title (EN) *</Label>
                  <Input
                    id="translations.en.title"
                    {...register("translations.en.title", { required: "Title is required" })}
                    placeholder="Product title in English"
                  />
                  {errors.translations?.en?.title && (
                    <p className="text-sm text-destructive">
                      {errors.translations.en.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="translations.en.description">Description (EN) *</Label>
                  <Textarea
                    id="translations.en.description"
                    {...register("translations.en.description", { required: "Description is required" })}
                    placeholder="Product description in English"
                    rows={4}
                  />
                  {errors.translations?.en?.description && (
                    <p className="text-sm text-destructive">
                      {errors.translations.en.description.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Key Features (EN)</Label>
                  {keyFeaturesEn.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateKeyFeature("en", index, e.target.value)}
                        placeholder="Key feature"
                      />
                      {keyFeaturesEn.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeKeyFeature("en", index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addKeyFeature("en")}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Key Feature
                  </Button>
                </div>
              </TabsContent>

              {/* Arabic Tab */}
              <TabsContent value="ar" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translations.ar.title">العنوان (AR) *</Label>
                  <Input
                    id="translations.ar.title"
                    {...register("translations.ar.title", { required: "العنوان مطلوب" })}
                    placeholder="عنوان المنتج بالعربية"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="translations.ar.description">الوصف (AR) *</Label>
                  <Textarea
                    id="translations.ar.description"
                    {...register("translations.ar.description", { required: "الوصف مطلوب" })}
                    placeholder="وصف المنتج بالعربية"
                    rows={4}
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label>الميزات الرئيسية (AR)</Label>
                  {keyFeaturesAr.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateKeyFeature("ar", index, e.target.value)}
                        placeholder="ميزة رئيسية"
                        dir="rtl"
                      />
                      {keyFeaturesAr.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeKeyFeature("ar", index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addKeyFeature("ar")}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة ميزة رئيسية
                  </Button>
                </div>
              </TabsContent>

              {/* Taiwan/Chinese Tab */}
              <TabsContent value="tw" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translations.tw.title">標題 (TW) *</Label>
                  <Input
                    id="translations.tw.title"
                    {...register("translations.tw.title", { required: "標題為必填項" })}
                    placeholder="產品標題（繁體中文）"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="translations.tw.description">描述 (TW) *</Label>
                  <Textarea
                    id="translations.tw.description"
                    {...register("translations.tw.description", { required: "描述為必填項" })}
                    placeholder="產品描述（繁體中文）"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>主要功能 (TW)</Label>
                  {keyFeaturesTw.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateKeyFeature("tw", index, e.target.value)}
                        placeholder="主要功能"
                      />
                      {keyFeaturesTw.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeKeyFeature("tw", index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addKeyFeature("tw")}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    添加主要功能
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEditMode ? "Update Product" : "Create Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}