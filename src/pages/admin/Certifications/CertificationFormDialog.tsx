import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/shared/ImageUpload";
import SubmitBtn from "@/components/shared/SubmitBtn";
import { Certification } from "@/services/types";
import { getTranslation } from "@/utils/formDataHelpers";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
  certification: Certification | null;
  isSubmitting: boolean;
}

// ✅ UPDATED: Changed from tw/ch to fr/de
interface FormState {
  image: File | null;
  removeImage: boolean;
  translations: {
    en: { title: string };
    ar: { title: string };
    fr: { title: string };
    de: { title: string };
  };
}

export function CertificationFormDialog({
  open,
  onOpenChange,
  onSubmit,
  certification,
  isSubmitting,
}: Props) {
  const [formState, setFormState] = useState<FormState>({
    image: null,
    removeImage: false,
    translations: {
      en: { title: "" },
      ar: { title: "" },
      fr: { title: "" },
      de: { title: "" },
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (certification) {
      const enTrans = getTranslation(certification, "en");
      const arTrans = getTranslation(certification, "ar");
      const frTrans = getTranslation(certification, "fr");
      const deTrans = getTranslation(certification, "de");

      setFormState({
        image: null,
        removeImage: false,
        translations: {
          en: { title: enTrans?.title || "" },
          ar: { title: arTrans?.title || "" },
          fr: { title: frTrans?.title || "" },
          de: { title: deTrans?.title || "" },
        },
      });
    } else {
      setFormState({
        image: null,
        removeImage: false,
        translations: {
          en: { title: "" },
          ar: { title: "" },
          fr: { title: "" },
          de: { title: "" },
        },
      });
    }
    setErrors({});
  }, [certification, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!certification && !formState.image) {
      newErrors.image = "Image is required";
    }
    if (!formState.translations.en.title.trim()) {
      newErrors.en_title = "English title is required";
    }
    if (!formState.translations.ar.title.trim()) {
      newErrors.ar_title = "Arabic title is required";
    }
    if (!formState.translations.fr.title.trim()) {
      newErrors.fr_title = "French title is required";
    }
    if (!formState.translations.de.title.trim()) {
      newErrors.de_title = "German title is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await onSubmit(formState);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {certification ? "Edit Certification" : "Add Certification"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUpload
            label="Certification Image"
            id="cert-image"
            currentImage={certification?.image}
            onFileChange={(file) =>
              setFormState((prev) => ({
                ...prev,
                image: file,
                removeImage: !file,
              }))
            }
            error={errors.image}
            required={!certification}
          />

          {/* ✅ UPDATED: Tabs */}
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="ar">العربية</TabsTrigger>
              <TabsTrigger value="fr">Français</TabsTrigger>
              <TabsTrigger value="de">Deutsch</TabsTrigger>
            </TabsList>

            {/* English Tab */}
            <TabsContent value="en" className="space-y-4">
              <div>
                <Label htmlFor="en-title">Title (English) *</Label>
                <Input
                  id="en-title"
                  value={formState.translations.en.title}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      translations: {
                        ...prev.translations,
                        en: { title: e.target.value },
                      },
                    }))
                  }
                  placeholder="Enter title in English"
                />
                {errors.en_title && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.en_title}
                  </p>
                )}
              </div>
            </TabsContent>

            {/* Arabic Tab */}
            <TabsContent value="ar" className="space-y-4">
              <div>
                <Label htmlFor="ar-title">Title (Arabic) *</Label>
                <Input
                  id="ar-title"
                  value={formState.translations.ar.title}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      translations: {
                        ...prev.translations,
                        ar: { title: e.target.value },
                      },
                    }))
                  }
                  placeholder="أدخل العنوان بالعربية"
                  dir="rtl"
                />
                {errors.ar_title && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.ar_title}
                  </p>
                )}
              </div>
            </TabsContent>

            {/* French Tab - ✅ NEW */}
            <TabsContent value="fr" className="space-y-4">
              <div>
                <Label htmlFor="fr-title">Titre (French) *</Label>
                <Input
                  id="fr-title"
                  value={formState.translations.fr.title}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      translations: {
                        ...prev.translations,
                        fr: { title: e.target.value },
                      },
                    }))
                  }
                  placeholder="Entrez le titre en français"
                />
                {errors.fr_title && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.fr_title}
                  </p>
                )}
              </div>
            </TabsContent>

            {/* German Tab - ✅ NEW */}
            <TabsContent value="de" className="space-y-4">
              <div>
                <Label htmlFor="de-title">Titel (German) *</Label>
                <Input
                  id="de-title"
                  value={formState.translations.de.title}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      translations: {
                        ...prev.translations,
                        de: { title: e.target.value },
                      },
                    }))
                  }
                  placeholder="Geben Sie den Titel auf Deutsch ein"
                />
                {errors.de_title && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.de_title}
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <SubmitBtn
            isSubmitting={isSubmitting}
            title={
              certification ? "Update Certification" : "Create Certification"
            }
            className="w-full bg-primary hover:bg-primary/90"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}