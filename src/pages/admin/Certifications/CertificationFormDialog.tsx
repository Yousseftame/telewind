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

interface FormState {
  image: File | null;
  removeImage: boolean;
  translations: {
    en: { title: string };
    ar: { title: string };
    tw: { title: string };
    ch: { title: string };
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
      tw: { title: "" },
      ch: { title: "" },
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (certification) {
      const enTrans = getTranslation(certification, "en");
      const arTrans = getTranslation(certification, "ar");
      const twTrans = getTranslation(certification, "tw");
      const chTrans = getTranslation(certification, "ch");

      setFormState({
        image: null,
        removeImage: false,
        translations: {
          en: { title: enTrans?.title || "" },
          ar: { title: arTrans?.title || "" },
          tw: { title: twTrans?.title || "" },
          ch: { title: chTrans?.title || "" },
        },
      });
    } else {
      setFormState({
        image: null,
        removeImage: false,
        translations: {
          en: { title: "" },
          ar: { title: "" },
          tw: { title: "" },
          ch: { title: "" },
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
    if (!formState.translations.tw.title.trim()) {
      newErrors.tw_title = "Taiwan title is required";
    }
    if (!formState.translations.ch.title.trim()) {
      newErrors.ch_title = "Chinese title is required";
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

          <Tabs defaultValue="en" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="ar">Arabic</TabsTrigger>
              <TabsTrigger value="tw">Taiwan</TabsTrigger>
              <TabsTrigger value="ch">Chinese </TabsTrigger>
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

            {/* Taiwan / Traditional Chinese Tab */}
            <TabsContent value="tw" className="space-y-4">
              <div>
                <Label htmlFor="tw-title">Title (Taiwan) *</Label>
                <Input
                  id="tw-title"
                  value={formState.translations.tw.title}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      translations: {
                        ...prev.translations,
                        tw: { title: e.target.value },
                      },
                    }))
                  }
                  placeholder="輸入台灣標題"
                />
                {errors.tw_title && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.tw_title}
                  </p>
                )}
              </div>
            </TabsContent>

            {/* Simplified / Chinese Content */}
            <TabsContent value="ch" className="space-y-4">
              <div>
                <Label htmlFor="ch-title">Title (Chinese) *</Label>
                <Input
                  id="ch-title"
                  value={formState.translations.ch.title}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      translations: {
                        ...prev.translations,
                        ch: { title: e.target.value },
                      },
                    }))
                  }
                  placeholder="输入中文标题"
                />
                {errors.ch_title && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.ch_title}
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
