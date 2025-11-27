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
import { X, Plus, Upload, Loader2, FileText } from "lucide-react";
import { useCategoryCRUD } from "../AdminCate/useCategoryCRUD";
import { Product } from "@/services/types";

interface localizedContent {
  title: string;
  description: string;
  key_features: string[];
}

// ✅ UPDATED: Added specification_pdf to form data
export interface ProductFormData {
  category_id: number;
  image: File | null;
  specification_pdf: File | null;
  supported_bands: string[];
  translations: {
    en: localizedContent;
    ar: localizedContent;
    fr: localizedContent;  // ⚠️ Changed from tw
    de: localizedContent;  // ⚠️ Changed from ch
  };
}


interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProductFormData) => void;
  isSubmitting?: boolean;
  product?: Product;
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
  const [keyFeaturesFr, setKeyFeaturesFr] = useState<string[]>([""]);  // ⚠️ Changed from Tw
const [keyFeaturesDe, setKeyFeaturesDe] = useState<string[]>([""]);  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  
  // ✅ NEW: State for PDF file
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string>("");

  const { items: categories, isLoading: categoriesLoading } = useCategoryCRUD();

  const getDefaultTranslations = (): ProductFormData["translations"] => {
  const base = {
    en: { title: "", description: "", key_features: [] },
    ar: { title: "", description: "", key_features: [] },
    fr: { title: "", description: "", key_features: [] },  // ⚠️ Changed from tw
    de: { title: "", description: "", key_features: [] },  // ⚠️ Changed from ch
  };

  if (!product) return base;

  const langMap: ProductFormData["translations"] = { ...base };

  product.translations.forEach((t) => {
    if (t.locale in langMap) {
      langMap[t.locale as keyof typeof langMap] = {
        title: t.title,
        description: t.description,
        key_features: t.key_features ?? [],
      };
    }
  });

  return langMap;
};

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      category_id: product?.category_id ?? 0,
      image: null,
      specification_pdf: null, // ✅ NEW
      supported_bands: product?.supported_bands || [""],
      translations: getDefaultTranslations(),
    },
  });

  useEffect(() => {
  if (open) {
    const translations = getDefaultTranslations();
    reset({
      category_id: product?.category_id ?? 0,
      image: null,
      specification_pdf: null,
      supported_bands: product?.supported_bands || [],
      translations,
    });

    setSupportedBands(
      product?.supported_bands && product.supported_bands.length > 0
        ? product.supported_bands
        : [""]
    );
    setKeyFeaturesEn(
      translations.en.key_features.length > 0
        ? translations.en.key_features
        : [""]
    );
    setKeyFeaturesAr(
      translations.ar.key_features.length > 0
        ? translations.ar.key_features
        : [""]
    );
    setKeyFeaturesFr(  // ⚠️ Changed from Tw
      translations.fr.key_features.length > 0
        ? translations.fr.key_features
        : [""]
    );
    setKeyFeaturesDe(  // ⚠️ Changed from Ch
      translations.de.key_features.length > 0
        ? translations.de.key_features
        : [""]
    );
    setImagePreview(product?.image ? product.image : "");
    setImageFile(null);
    
    if (product?.specification_pdf) {
      const fileName = product.specification_pdf.split('/').pop() || "Existing PDF";
      setPdfFileName(fileName);
    } else {
      setPdfFileName("");
    }
    setPdfFile(null);
  }
}, [open, reset, product]);

const handleFormSubmit = (data: ProductFormData) => {
  const submissionData: any = {
    category_id: data.category_id,
    supported_bands: supportedBands.filter((b) => b.trim()),
    translations: {
      en: {
        ...data.translations.en,
        key_features: keyFeaturesEn.filter((f) => f.trim()),
      },
      ar: {
        ...data.translations.ar,
        key_features: keyFeaturesAr.filter((f) => f.trim()),
      },
      fr: {  // ⚠️ Changed from tw
        ...data.translations.fr,
        key_features: keyFeaturesFr.filter((f) => f.trim()),
      },
      de: {  // ⚠️ Changed from ch
        ...data.translations.de,
        key_features: keyFeaturesDe.filter((f) => f.trim()),
      },
    },
  };

  if (imageFile) {
    submissionData.image = imageFile;
  }

  if (pdfFile) {
    submissionData.specification_pdf = pdfFile;
  }

  onSubmit(submissionData);
};

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ NEW: Handle PDF file change
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
      setPdfFileName(file.name);
    }
  };

  // ✅ NEW: Remove PDF file
  const handleRemovePdf = () => {
    setPdfFile(null);
    setPdfFileName("");
  };

  // Supported Bands handlers
  const addBand = () => setSupportedBands([...supportedBands, ""]);
  const removeBand = (index: number) =>
    setSupportedBands(supportedBands.filter((_, i) => i !== index));
  const updateBand = (index: number, value: string) => {
    const newBands = [...supportedBands];
    newBands[index] = value;
    setSupportedBands(newBands);
  };

  // Key Features handlers
 const addKeyFeature = (lang: "en" | "ar" | "fr" | "de") => {  // ⚠️ Changed from "tw" | "ch"
  if (lang === "en") setKeyFeaturesEn([...keyFeaturesEn, ""]);
  if (lang === "ar") setKeyFeaturesAr([...keyFeaturesAr, ""]);
  if (lang === "fr") setKeyFeaturesFr([...keyFeaturesFr, ""]);  // ⚠️ Changed from tw
  if (lang === "de") setKeyFeaturesDe([...keyFeaturesDe, ""]);  // ⚠️ Changed from ch
};

  const removeKeyFeature = (lang: "en" | "ar" | "fr" | "de", index: number) => {  // ⚠️ Changed
  if (lang === "en")
    setKeyFeaturesEn(keyFeaturesEn.filter((_, i) => i !== index));
  if (lang === "ar")
    setKeyFeaturesAr(keyFeaturesAr.filter((_, i) => i !== index));
  if (lang === "fr")  // ⚠️ Changed from tw
    setKeyFeaturesFr(keyFeaturesFr.filter((_, i) => i !== index));
  if (lang === "de")  // ⚠️ Changed from ch
    setKeyFeaturesDe(keyFeaturesDe.filter((_, i) => i !== index));
};

  const updateKeyFeature = (
  lang: "en" | "ar" | "fr" | "de",  // ⚠️ Changed from "tw" | "ch"
  index: number,
  value: string
) => {
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
  if (lang === "fr") {  // ⚠️ Changed from tw
    const newFeatures = [...keyFeaturesFr];
    newFeatures[index] = value;
    setKeyFeaturesFr(newFeatures);
  }
  if (lang === "de") {  // ⚠️ Changed from ch
    const newFeatures = [...keyFeaturesDe];
    newFeatures[index] = value;
    setKeyFeaturesDe(newFeatures);
  }
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category_id">Category *</Label>
            <div className="relative">
              <select
                id="category_id"
                {...register("category_id", {
                  required: "Category is required",
                  valueAsNumber: true,
                  validate: (value) => value > 0 || "Please select a category",
                })}
                disabled={categoriesLoading || isSubmitting}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value={0}>
                  {categoriesLoading
                    ? "Loading categories..."
                    : "Select a category"}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.translations[0]?.title || `Category ${category.id}`}
                  </option>
                ))}
              </select>
              {categoriesLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-slate-400" />
              )}
            </div>
            {errors.category_id && (
              <p className="text-sm text-destructive">
                {errors.category_id.message}
              </p>
            )}
          </div>

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

          {/* ✅ NEW: PDF Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="specification_pdf">Specification PDF</Label>
            <div className="space-y-3">
              {pdfFileName && (
                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <FileText className="h-5 w-5 text-slate-500" />
                  <span className="flex-1 text-sm text-slate-700 truncate">
                    {pdfFileName}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemovePdf}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex-1">
                <Input
                  id="specification_pdf"
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Upload product specification (PDF only)
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
              <TabsList className="grid w-full grid-cols-4">
  <TabsTrigger value="en">English</TabsTrigger>
  <TabsTrigger value="ar">العربية</TabsTrigger>
  <TabsTrigger value="fr">Français</TabsTrigger>  {/* ⚠️ Changed from Taiwan */}
  <TabsTrigger value="de">Deutsch</TabsTrigger>   {/* ⚠️ Changed from Chinese */}
</TabsList>

              {/* English Tab */}
              <TabsContent value="en" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translations.en.title">Title (EN) *</Label>
                  <Input
                    id="translations.en.title"
                    {...register("translations.en.title", {
                      required: "Title is required",
                    })}
                    placeholder="Product title in English"
                  />
                  {errors.translations?.en?.title && (
                    <p className="text-sm text-destructive">
                      {errors.translations.en.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="translations.en.description">
                    Description (EN) *
                  </Label>
                  <Textarea
                    id="translations.en.description"
                    {...register("translations.en.description", {
                      required: "Description is required",
                    })}
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
                        onChange={(e) =>
                          updateKeyFeature("en", index, e.target.value)
                        }
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
                    {...register("translations.ar.title", {
                      required: "العنوان مطلوب",
                    })}
                    placeholder="عنوان المنتج بالعربية"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="translations.ar.description">
                    الوصف (AR) *
                  </Label>
                  <Textarea
                    id="translations.ar.description"
                    {...register("translations.ar.description", {
                      required: "الوصف مطلوب",
                    })}
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
                        onChange={(e) =>
                          updateKeyFeature("ar", index, e.target.value)
                        }
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

             {/* French Tab */}
<TabsContent value="fr" className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="translations.fr.title">Titre (FR) *</Label>
    <Input
      id="translations.fr.title"
      {...register("translations.fr.title", {
        required: "Le titre est requis",
      })}
      placeholder="Titre du produit en français"
    />
    {errors.translations?.fr?.title && (
      <p className="text-sm text-destructive">
        {errors.translations.fr.title.message}
      </p>
    )}
  </div>

  <div className="space-y-2">
    <Label htmlFor="translations.fr.description">
      Description (FR) *
    </Label>
    <Textarea
      id="translations.fr.description"
      {...register("translations.fr.description", {
        required: "La description est requise",
      })}
      placeholder="Description du produit en français"
      rows={4}
    />
    {errors.translations?.fr?.description && (
      <p className="text-sm text-destructive">
        {errors.translations.fr.description.message}
      </p>
    )}
  </div>

  <div className="space-y-2">
    <Label>Caractéristiques principales (FR)</Label>
    {keyFeaturesFr.map((feature, index) => (
      <div key={index} className="flex gap-2">
        <Input
          value={feature}
          onChange={(e) =>
            updateKeyFeature("fr", index, e.target.value)
          }
          placeholder="Caractéristique principale"
        />
        {keyFeaturesFr.length > 1 && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeKeyFeature("fr", index)}
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
      onClick={() => addKeyFeature("fr")}
      className="w-full"
    >
      <Plus className="h-4 w-4 mr-2" />
      Ajouter une caractéristique
    </Button>
  </div>
</TabsContent>

              {/* German Tab */}
<TabsContent value="de" className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="translations.de.title">Titel (DE) *</Label>
    <Input
      id="translations.de.title"
      {...register("translations.de.title", {
        required: "Titel ist erforderlich",
      })}
      placeholder="Produkttitel auf Deutsch"
    />
    {errors.translations?.de?.title && (
      <p className="text-sm text-destructive">
        {errors.translations.de.title.message}
      </p>
    )}
  </div>

  <div className="space-y-2">
    <Label htmlFor="translations.de.description">
      Beschreibung (DE) *
    </Label>
    <Textarea
      id="translations.de.description"
      {...register("translations.de.description", {
        required: "Beschreibung ist erforderlich",
      })}
      placeholder="Produktbeschreibung auf Deutsch"
      rows={4}
    />
    {errors.translations?.de?.description && (
      <p className="text-sm text-destructive">
        {errors.translations.de.description.message}
      </p>
    )}
  </div>

  <div className="space-y-2">
    <Label>Hauptmerkmale (DE)</Label>
    {keyFeaturesDe.map((feature, index) => (
      <div key={index} className="flex gap-2">
        <Input
          value={feature}
          onChange={(e) =>
            updateKeyFeature("de", index, e.target.value)
          }
          placeholder="Hauptmerkmal"
        />
        {keyFeaturesDe.length > 1 && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeKeyFeature("de", index)}
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
      onClick={() => addKeyFeature("de")}
      className="w-full"
    >
      <Plus className="h-4 w-4 mr-2" />
      Merkmal hinzufügen
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
              {isSubmitting
                ? "Saving..."
                : isEditMode
                ? "Update Product"
                : "Create Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}