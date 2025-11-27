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

// ✅ UPDATED: Changed from tw/ch to fr/de
interface IndustryFormData {
  translations: {
    en: { title: string; description: string; applications: string[] };
    ar: { title: string; description: string; applications: string[] };
    fr: { title: string; description: string; applications: string[] };
    de: { title: string; description: string; applications: string[] };
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

  // ✅ UPDATED: State for applications arrays (fr/de instead of tw/ch)
  const [appsEn, setAppsEn] = useState<string[]>([""]);
  const [appsAr, setAppsAr] = useState<string[]>([""]);
  const [appsFr, setAppsFr] = useState<string[]>([""]);
  const [appsDe, setAppsDe] = useState<string[]>([""]);

  const getDefaultTranslations = () => {
    if (!industry) {
      return {
        en: { title: "", description: "", applications: [] },
        ar: { title: "", description: "", applications: [] },
        fr: { title: "", description: "", applications: [] },
        de: { title: "", description: "", applications: [] },
      };
    }

    const translations = {
      en: { title: "", description: "", applications: [] as string[] },
      ar: { title: "", description: "", applications: [] as string[] },
      fr: { title: "", description: "", applications: [] as string[] },
      de: { title: "", description: "", applications: [] as string[] },
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
      setAppsEn(
        translations.en.applications.length > 0
          ? translations.en.applications
          : [""]
      );
      setAppsAr(
        translations.ar.applications.length > 0
          ? translations.ar.applications
          : [""]
      );
      setAppsFr(
        translations.fr.applications.length > 0
          ? translations.fr.applications
          : [""]
      );
      setAppsDe(
        translations.de.applications.length > 0
          ? translations.de.applications
          : [""]
      );
    }
  }, [open, reset, industry]);

  const handleFormSubmit = (data: IndustryFormData) => {
    onSubmit({
      ...data,
      icon: iconFile,
      removeIcon: iconRemoved,
      translations: {
        en: {
          ...data.translations.en,
          applications: appsEn.filter((a) => a.trim()),
        },
        ar: {
          ...data.translations.ar,
          applications: appsAr.filter((a) => a.trim()),
        },
        fr: {
          ...data.translations.fr,
          applications: appsFr.filter((a) => a.trim()),
        },
        de: {
          ...data.translations.de,
          applications: appsDe.filter((a) => a.trim()),
        },
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

  // ✅ UPDATED: Changed type from tw/ch to fr/de
  const addApp = (lang: "en" | "ar" | "fr" | "de") => {
    if (lang === "en") setAppsEn([...appsEn, ""]);
    if (lang === "ar") setAppsAr([...appsAr, ""]);
    if (lang === "fr") setAppsFr([...appsFr, ""]);
    if (lang === "de") setAppsDe([...appsDe, ""]);
  };

  const removeApp = (lang: "en" | "ar" | "fr" | "de", index: number) => {
    if (lang === "en") setAppsEn(appsEn.filter((_, i) => i !== index));
    if (lang === "ar") setAppsAr(appsAr.filter((_, i) => i !== index));
    if (lang === "fr") setAppsFr(appsFr.filter((_, i) => i !== index));
    if (lang === "de") setAppsDe(appsDe.filter((_, i) => i !== index));
  };

  const updateApp = (
    lang: "en" | "ar" | "fr" | "de",
    index: number,
    value: string
  ) => {
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
    if (lang === "fr") {
      const newApps = [...appsFr];
      newApps[index] = value;
      setAppsFr(newApps);
    }
    if (lang === "de") {
      const newApps = [...appsDe];
      newApps[index] = value;
      setAppsDe(newApps);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Industry" : "Add Industry"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Icon Upload */}
          <ImageUpload
            label="Industry Icon"
            id="icon"
            onFileChange={handleIconChange}
            error={
              !iconFile && !isEditMode && !industry?.icon
                ? "Icon is required"
                : undefined
            }
            required={!isEditMode}
            currentImage={
              isEditMode && !iconRemoved ? industry?.icon : undefined
            }
          />

          {/* Language Tabs - ✅ UPDATED */}
          <div className="space-y-2">
            <Label>Translations *</Label>
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
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
                  <Label htmlFor="translations.en.description">
                    Description (EN) *
                  </Label>
                  <Textarea
                    id="translations.en.description"
                    {...register("translations.en.description", {
                      required: "English description is required",
                      maxLength: {
                        value: 1000,
                        message:
                          "Description must be less than 1000 characters",
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
                  <Label htmlFor="translations.ar.description">
                    الوصف (AR) *
                  </Label>
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

              {/* French Tab - ✅ NEW */}
              <TabsContent value="fr" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translations.fr.title">Titre (FR) *</Label>
                  <Input
                    id="translations.fr.title"
                    {...register("translations.fr.title", {
                      required: "Le titre en français est requis",
                      maxLength: {
                        value: 200,
                        message: "Le titre doit contenir moins de 200 caractères",
                      },
                    })}
                    placeholder="Titre de l'industrie en français"
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
                      required: "La description en français est requise",
                      maxLength: {
                        value: 1000,
                        message: "La description doit contenir moins de 1000 caractères",
                      },
                    })}
                    placeholder="Description de l'industrie en français"
                    rows={4}
                  />
                  {errors.translations?.fr?.description && (
                    <p className="text-sm text-destructive">
                      {errors.translations.fr.description.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Applications (FR)</Label>
                  {appsFr.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateApp("fr", index, e.target.value)}
                        placeholder="Nom de l'application"
                      />
                      {appsFr.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeApp("fr", index)}
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
                    onClick={() => addApp("fr")}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une application
                  </Button>
                </div>
              </TabsContent>

              {/* German Tab - ✅ NEW */}
              <TabsContent value="de" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translations.de.title">Titel (DE) *</Label>
                  <Input
                    id="translations.de.title"
                    {...register("translations.de.title", {
                      required: "Deutscher Titel ist erforderlich",
                      maxLength: {
                        value: 200,
                        message: "Der Titel muss weniger als 200 Zeichen enthalten",
                      },
                    })}
                    placeholder="Industrietitel auf Deutsch"
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
                      required: "Deutsche Beschreibung ist erforderlich",
                      maxLength: {
                        value: 1000,
                        message: "Die Beschreibung muss weniger als 1000 Zeichen enthalten",
                      },
                    })}
                    placeholder="Industriebeschreibung auf Deutsch"
                    rows={4}
                  />
                  {errors.translations?.de?.description && (
                    <p className="text-sm text-destructive">
                      {errors.translations.de.description.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Anwendungen (DE)</Label>
                  {appsDe.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateApp("de", index, e.target.value)}
                        placeholder="Anwendungsname"
                      />
                      {appsDe.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeApp("de", index)}
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
                    onClick={() => addApp("de")}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Anwendung hinzufügen
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
                ? "Update Industry"
                : "Create Industry"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}