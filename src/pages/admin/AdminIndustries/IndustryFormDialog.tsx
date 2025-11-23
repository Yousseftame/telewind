// src/pages/admin/AdminIndustries/IndustryFormDialog.tsx

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
import { X, Plus } from "lucide-react";

interface Industry {
  id: number;
  slug: string;
  icon: string;
  translations: Array<{
    locale: string;
    title: string;
    description: string;
    applications: string[];
  }>;
}

interface IndustryFormData {
  translations: {
    en: { title: string; description: string; applications: string[] };
    ar: { title: string; description: string; applications: string[] };
    tw: { title: string; description: string; applications: string[] };
  };
}

interface IndustryFormDialogData extends IndustryFormData {
  icon: File | null;
  removeIcon?: boolean;
}

interface IndustryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: IndustryFormDialogData) => void;
  isSubmitting?: boolean;
  industry?: Industry | null;
}

export default function IndustryFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
  industry = null,
}: IndustryFormDialogProps) {
  const isEditMode = !!industry;
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconRemoved, setIconRemoved] = useState(false);

  // State for applications arrays
  const [appsEn, setAppsEn] = useState<string[]>([""]);
  const [appsAr, setAppsAr] = useState<string[]>([""]);
  const [appsTw, setAppsTw] = useState<string[]>([""]);

  const getDefaultTranslations = () => {
    if (!industry) {
      return {
        en: { title: "", description: "", applications: [] },
        ar: { title: "", description: "", applications: [] },
        tw: { title: "", description: "", applications: [] },
      };
    }

    const translations = {
      en: { title: "", description: "", applications: [] as string[] },
      ar: { title: "", description: "", applications: [] as string[] },
      tw: { title: "", description: "", applications: [] as string[] },
    };

    industry.translations.forEach((t) => {
      translations[t.locale as keyof typeof translations] = {
        title: t.title,
        description: t.description,
        applications: t.applications || [],
      };
    });

    return translations;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IndustryFormData>({
    defaultValues: {
      translations: getDefaultTranslations(),
    },
  });

  useEffect(() => {
    if (open) {
      const translations = getDefaultTranslations();
      reset({
        translations,
      });

      setIconFile(null);
      setIconRemoved(false);
      setAppsEn(translations.en.applications.length > 0 ? translations.en.applications : [""]);
      setAppsAr(translations.ar.applications.length > 0 ? translations.ar.applications : [""]);
      setAppsTw(translations.tw.applications.length > 0 ? translations.tw.applications : [""]);
    }
  }, [open, reset, industry]);

  const handleFormSubmit = (data: IndustryFormData) => {
    onSubmit({
      ...data,
      icon: iconFile,
      removeIcon: iconRemoved,
      translations: {
        en: { ...data.translations.en, applications: appsEn.filter(a => a.trim()) },
        ar: { ...data.translations.ar, applications: appsAr.filter(a => a.trim()) },
        tw: { ...data.translations.tw, applications: appsTw.filter(a => a.trim()) },
      },
    });
  };

  const handleIconChange = (file: File | null) => {
    setIconFile(file);
    if (file === null && isEditMode) {
      setIconRemoved(true);
    } else {
      setIconRemoved(false);
    }
  };

  const addApp = (lang: "en" | "ar" | "tw") => {
    if (lang === "en") setAppsEn([...appsEn, ""]);
    if (lang === "ar") setAppsAr([...appsAr, ""]);
    if (lang === "tw") setAppsTw([...appsTw, ""]);
  };

  const removeApp = (lang: "en" | "ar" | "tw", index: number) => {
    if (lang === "en") setAppsEn(appsEn.filter((_, i) => i !== index));
    if (lang === "ar") setAppsAr(appsAr.filter((_, i) => i !== index));
    if (lang === "tw") setAppsTw(appsTw.filter((_, i) => i !== index));
  };

  const updateApp = (lang: "en" | "ar" | "tw", index: number, value: string) => {
    if (lang === "en") {
      const newApps = [...appsEn];
      newApps[index] = value;
      setAppsEn(newApps);
    }
    if (lang === "ar") {
      const newApps = [...appsAr];
      newApps[index] = value;
      setAppsAr(newApps);
    }
    if (lang === "tw") {
      const newApps = [...appsTw];
      newApps[index] = value;
      setAppsTw(newApps);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Industry" : "Add Industry"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Icon Upload */}
          <ImageUpload
            label="Industry Icon"
            id="icon"
            onFileChange={handleIconChange}
            error={!iconFile && !isEditMode && !industry?.icon ? "Icon is required" : undefined}
            required={!isEditMode}
            currentImage={isEditMode && !iconRemoved ? industry?.icon : undefined}
          />

          {/* Language Tabs */}
          <div className="space-y-2">
            <Label>Translations *</Label>
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="ar">العربية</TabsTrigger>
                <TabsTrigger value="tw">Taiwan</TabsTrigger>
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
                        value: 200,
                        message: "Title must be less than 200 characters",
                      },
                    })}
                    placeholder="Industry title in English"
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
                    {...register("translations.en.description", {
                      required: "English description is required",
                      maxLength: {
                        value: 1000,
                        message: "Description must be less than 1000 characters",
                      },
                    })}
                    placeholder="Industry description in English"
                    rows={4}
                  />
                  {errors.translations?.en?.description && (
                    <p className="text-sm text-destructive">
                      {errors.translations.en.description.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Applications (EN)</Label>
                  {appsEn.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateApp("en", index, e.target.value)}
                        placeholder="Application name"
                      />
                      {appsEn.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeApp("en", index)}
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
                    onClick={() => addApp("en")}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Application
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
                      required: "العنوان بالعربية مطلوب",
                      maxLength: {
                        value: 200,
                        message: "يجب أن يكون العنوان أقل من 200 حرف",
                      },
                    })}
                    placeholder="عنوان الصناعة بالعربية"
                    dir="rtl"
                  />
                  {errors.translations?.ar?.title && (
                    <p className="text-sm text-destructive">
                      {errors.translations.ar.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="translations.ar.description">الوصف (AR) *</Label>
                  <Textarea
                    id="translations.ar.description"
                    {...register("translations.ar.description", {
                      required: "الوصف بالعربية مطلوب",
                      maxLength: {
                        value: 1000,
                        message: "يجب أن يكون الوصف أقل من 1000 حرف",
                      },
                    })}
                    placeholder="وصف الصناعة بالعربية"
                    rows={4}
                    dir="rtl"
                  />
                  {errors.translations?.ar?.description && (
                    <p className="text-sm text-destructive">
                      {errors.translations.ar.description.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>التطبيقات (AR)</Label>
                  {appsAr.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateApp("ar", index, e.target.value)}
                        placeholder="اسم التطبيق"
                        dir="rtl"
                      />
                      {appsAr.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeApp("ar", index)}
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
                    onClick={() => addApp("ar")}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة تطبيق
                  </Button>
                </div>
              </TabsContent>

              {/* Taiwan Tab */}
              <TabsContent value="tw" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translations.tw.title">標題 (TW) *</Label>
                  <Input
                    id="translations.tw.title"
                    {...register("translations.tw.title", {
                      required: "台灣標題為必填項",
                      maxLength: {
                        value: 200,
                        message: "標題必須少於200個字符",
                      },
                    })}
                    placeholder="台灣產業標題"
                  />
                  {errors.translations?.tw?.title && (
                    <p className="text-sm text-destructive">
                      {errors.translations.tw.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="translations.tw.description">描述 (TW) *</Label>
                  <Textarea
                    id="translations.tw.description"
                    {...register("translations.tw.description", {
                      required: "台灣描述為必填項",
                      maxLength: {
                        value: 1000,
                        message: "描述必須少於1000個字符",
                      },
                    })}
                    placeholder="台灣產業描述"
                    rows={4}
                  />
                  {errors.translations?.tw?.description && (
                    <p className="text-sm text-destructive">
                      {errors.translations.tw.description.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>應用 (TW)</Label>
                  {appsTw.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateApp("tw", index, e.target.value)}
                        placeholder="應用名稱"
                      />
                      {appsTw.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeApp("tw", index)}
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
                    onClick={() => addApp("tw")}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    新增應用
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
              {isSubmitting ? "Saving..." : isEditMode ? "Update Industry" : "Create Industry"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}