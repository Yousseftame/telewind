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
    tw: { title: string; description: string };
    ch: { title: string; description: string };
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
        tw: { title: "", description: "" },
        ch: { title: "", description: "" },
      };
    }

    const translations = {
      en: { title: "", description: "" },
      ar: { title: "", description: "" },
      tw: { title: "", description: "" },
      ch: { title: "", description: "" },
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
                <TabsTrigger value="tw">Taiwan</TabsTrigger>
                <TabsTrigger value="ch">Chinese</TabsTrigger>
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

              {/* Taiwan Tab */}
              <TabsContent value="tw" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translations.tw.title">Title (TW) *</Label>
                  <Input
                    id="translations.tw.title"
                    {...register("translations.tw.title", {
                      required: "Taiwan title is required",
                      maxLength: {
                        value: 100,
                        message: "Title must be less than 100 characters",
                      },
                    })}
                    placeholder="台灣類別標題"
                  />
                  {errors.translations?.tw?.title && (
                    <p className="text-sm text-destructive">
                      {errors.translations.tw.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="translations.tw.description">
                    Description (TW) *
                  </Label>
                  <Textarea
                    id="translations.tw.description"
                    {...register("translations.tw.description", {
                      required: "Taiwan description is required",
                      maxLength: {
                        value: 500,
                        message: "Description must be less than 500 characters",
                      },
                    })}
                    placeholder="台灣類別描述"
                    rows={4}
                  />
                  {errors.translations?.tw?.description && (
                    <p className="text-sm text-destructive">
                      {errors.translations.tw.description.message}
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* Simplified / Chinese Tab */}
              <TabsContent value="ch" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translations.ch.title">Title (CH) *</Label>
                  <Input
                    id="translations.ch.title"
                    {...register("translations.ch.title", {
                      required: "Chinese title is required",
                      maxLength: {
                        value: 100,
                        message: "Title must be less than 100 characters",
                      },
                    })}
                    placeholder="中国类别标题"
                  />
                  {errors.translations?.ch?.title && (
                    <p className="text-sm text-destructive">
                      {errors.translations.ch.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="translations.ch.description">
                    Description (CH) *
                  </Label>
                  <Textarea
                    id="translations.ch.description"
                    {...register("translations.ch.description", {
                      required: "Chinese description is required",
                      maxLength: {
                        value: 500,
                        message: "Description must be less than 500 characters",
                      },
                    })}
                    placeholder="中国类别描述"
                    rows={4}
                  />
                  {errors.translations?.ch?.description && (
                    <p className="text-sm text-destructive">
                      {errors.translations.ch.description.message}
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
