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
import ImageUpload from "@/components/shared/ImageUpload";

interface Category {
  id: number;
  image: string;
  icon: string;
  translations: Array<{
    locale: string;
    title: string;
    description: string;
  }>;
}

interface CategoryFormData {
  translations: {
    en: { title: string; description: string };
    ar: { title: string; description: string };
    fr: { title: string; description: string }; // ⚠️ Changed from tw
    de: { title: string; description: string }; // ⚠️ Changed from ch
  };
}

interface CategoryFormDialogData extends CategoryFormData {
  image: File | null;
  icon: File | null;
  removeImage?: boolean;
  removeIcon?: boolean;
}

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CategoryFormDialogData) => void;
  isSubmitting?: boolean;
  category?: Category | null;
}

export default function CategoryFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
  category = null,
}: CategoryFormDialogProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [iconRemoved, setIconRemoved] = useState(false);
  const isEditMode = !!category;

  const getDefaultTranslations = () => {
  if (!category) {
    return {
      en: { title: "", description: "" },
      ar: { title: "", description: "" },
      fr: { title: "", description: "" }, // ⚠️ Changed from tw
      de: { title: "", description: "" }, // ⚠️ Changed from ch
    };
  }

     const translations = {
    en: { title: "", description: "" },
    ar: { title: "", description: "" },
    fr: { title: "", description: "" }, // ⚠️ Changed from tw
    de: { title: "", description: "" }, // ⚠️ Changed from ch
  };

   category.translations.forEach((t) => {
    translations[t.locale as keyof typeof translations] = {
      title: t.title,
      description: t.description,
    };
  });

  return translations;
};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      translations: getDefaultTranslations(),
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        translations: getDefaultTranslations(),
      });

      setImageFile(null);
      setIconFile(null);
      setImageRemoved(false);
      setIconRemoved(false);
    }
  }, [open, reset, category]);

  const handleFormSubmit = (data: CategoryFormData) => {
    onSubmit({
      ...data,
      image: imageFile,
      icon: iconFile,
      removeImage: imageRemoved,
      removeIcon: iconRemoved,
    });
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file === null && isEditMode) {
      setImageRemoved(true);
    } else {
      setImageRemoved(false);
    }
  };

  const handleIconChange = (file: File | null) => {
    setIconFile(file);
    if (file === null && isEditMode) {
      setIconRemoved(true);
    } else {
      setIconRemoved(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Image Upload */}
          <ImageUpload
            label="Category Image"
            id="image"
            onFileChange={handleImageChange}
            error={
              !imageFile && !isEditMode && !category?.image
                ? "Image is required"
                : undefined
            }
            required={!isEditMode}
            currentImage={
              isEditMode && !imageRemoved ? category?.image : undefined
            }
          />

          {/* Icon Upload */}
          <ImageUpload
            label="Category Icon"
            id="icon"
            onFileChange={handleIconChange}
            error={
              !iconFile && !isEditMode && !category?.icon
                ? "Icon is required"
                : undefined
            }
            required={!isEditMode}
            currentImage={
              isEditMode && !iconRemoved ? category?.icon : undefined
            }
          />

          {/* Language Tabs */}
          <div className="space-y-2">
            <Label>Translations *</Label>
            <Tabs defaultValue="en" className="w-full">
             <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
  <TabsTrigger value="en">English</TabsTrigger>
  <TabsTrigger value="ar">العربية</TabsTrigger>
  <TabsTrigger value="fr">Français</TabsTrigger>
  <TabsTrigger value="de">Deutsch</TabsTrigger>
</TabsList>

              {/* English Tab */}
              <TabsContent value="en" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translations.en.title">Title (EN) *</Label>
                  <Input
                    id="translations.en.title"
                    {...register("translations.en.title", {
                      required: "English title is required",
                      maxLength: {
                        value: 100,
                        message: "Title must be less than 100 characters",
                      },
                    })}
                    placeholder="Category title in English"
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
                      required: "English description is required",
                      maxLength: {
                        value: 500,
                        message: "Description must be less than 500 characters",
                      },
                    })}
                    placeholder="Category description in English"
                    rows={4}
                  />
                  {errors.translations?.en?.description && (
                    <p className="text-sm text-destructive">
                      {errors.translations.en.description.message}
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* Arabic Tab */}
              <TabsContent value="ar" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translations.ar.title">Title (AR) *</Label>
                  <Input
                    id="translations.ar.title"
                    {...register("translations.ar.title", {
                      required: "Arabic title is required",
                      maxLength: {
                        value: 100,
                        message: "Title must be less than 100 characters",
                      },
                    })}
                    placeholder="عنوان الفئة بالعربية"
                    dir="rtl"
                  />
                  {errors.translations?.ar?.title && (
                    <p className="text-sm text-destructive">
                      {errors.translations.ar.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="translations.ar.description">
                    Description (AR) *
                  </Label>
                  <Textarea
                    id="translations.ar.description"
                    {...register("translations.ar.description", {
                      required: "Arabic description is required",
                      maxLength: {
                        value: 500,
                        message: "Description must be less than 500 characters",
                      },
                    })}
                    placeholder="وصف الفئة بالعربية"
                    rows={4}
                    dir="rtl"
                  />
                  {errors.translations?.ar?.description && (
                    <p className="text-sm text-destructive">
                      {errors.translations.ar.description.message}
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* french Tab */}
              <TabsContent value="fr" className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="translations.fr.title">Title (FR) *</Label>
    <Input
      id="translations.fr.title"
      {...register("translations.fr.title", {
        required: "French title is required",
        maxLength: {
          value: 100,
          message: "Title must be less than 100 characters",
        },
      })}
      placeholder="Titre de la catégorie en français"
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
        required: "French description is required",
        maxLength: {
          value: 500,
          message: "Description must be less than 500 characters",
        },
      })}
      placeholder="Description de la catégorie en français"
      rows={4}
    />
    {errors.translations?.fr?.description && (
      <p className="text-sm text-destructive">
        {errors.translations.fr.description.message}
      </p>
    )}
  </div>
</TabsContent>

              {/* Simplified / german Tab */}
              <TabsContent value="de" className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="translations.de.title">Title (DE) *</Label>
    <Input
      id="translations.de.title"
      {...register("translations.de.title", {
        required: "German title is required",
        maxLength: {
          value: 100,
          message: "Title must be less than 100 characters",
        },
      })}
      placeholder="Kategorietitel auf Deutsch"
    />
    {errors.translations?.de?.title && (
      <p className="text-sm text-destructive">
        {errors.translations.de.title.message}
      </p>
    )}
  </div>

  <div className="space-y-2">
    <Label htmlFor="translations.de.description">
      Description (DE) *
    </Label>
    <Textarea
      id="translations.de.description"
      {...register("translations.de.description", {
        required: "German description is required",
        maxLength: {
          value: 500,
          message: "Description must be less than 500 characters",
        },
      })}
      placeholder="Kategoriebeschreibung auf Deutsch"
      rows={4}
    />
    {errors.translations?.de?.description && (
      <p className="text-sm text-destructive">
        {errors.translations.de.description.message}
      </p>
    )}
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
                ? "Update Category"
                : "Create Category"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
