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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Event {
  id: number;
  date: string;
  type: string;
  translations: Array<{
    locale: string;
    title: string;
    description: string;
    location: string;
    details: string;
  }>;
}

// ✅ UPDATED: Changed from tw/ch to fr/de
interface EventFormData {
  date: string;
  type: string;
  translations: {
    en: {
      title: string;
      description: string;
      location: string;
      details: string;
    };
    ar: {
      title: string;
      description: string;
      location: string;
      details: string;
    };
    fr: {
      title: string;
      description: string;
      location: string;
      details: string;
    };
    de: {
      title: string;
      description: string;
      location: string;
      details: string;
    };
  };
}

interface EventFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: EventFormData) => void;
  isSubmitting?: boolean;
  event?: Event | null;
}

export default function EventFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
  event = null,
}: EventFormDialogProps) {
  const isEditMode = !!event;

  // ✅ UPDATED: State variables (fr/de instead of tw/ch)
  const [detailsEn, setDetailsEn] = useState("");
  const [detailsAr, setDetailsAr] = useState("");
  const [detailsFr, setDetailsFr] = useState("");
  const [detailsDe, setDetailsDe] = useState("");

  const getDefaultTranslations = () => {
    if (!event) {
      return {
        en: { title: "", description: "", location: "", details: "" },
        ar: { title: "", description: "", location: "", details: "" },
        fr: { title: "", description: "", location: "", details: "" },
        de: { title: "", description: "", location: "", details: "" },
      };
    }

    const translations = {
      en: { title: "", description: "", location: "", details: "" },
      ar: { title: "", description: "", location: "", details: "" },
      fr: { title: "", description: "", location: "", details: "" },
      de: { title: "", description: "", location: "", details: "" },
    };

    event.translations.forEach((t) => {
      translations[t.locale as keyof typeof translations] = {
        title: t.title,
        description: t.description,
        location: t.location,
        details: t.details,
      };
    });

    return translations;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormData>({
    defaultValues: {
      date: event?.date || "",
      type: event?.type || "",
      translations: getDefaultTranslations(),
    },
  });

  useEffect(() => {
    if (open) {
      const translations = getDefaultTranslations();
      reset({
        date: event?.date || "",
        type: event?.type || "",
        translations,
      });

      setDetailsEn(translations.en.details);
      setDetailsAr(translations.ar.details);
      setDetailsFr(translations.fr.details);
      setDetailsDe(translations.de.details);
    }
  }, [open, reset, event]);

  const handleFormSubmit = (data: EventFormData) => {
    onSubmit({
      ...data,
      translations: {
        en: { ...data.translations.en, details: detailsEn },
        ar: { ...data.translations.ar, details: detailsAr },
        fr: { ...data.translations.fr, details: detailsFr },
        de: { ...data.translations.de, details: detailsDe },
      },
    });
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Event" : "Add Event"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Basic Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                {...register("date", { required: "Date is required" })}
                className="mt-1"
              />
              {errors.date && (
                <p className="text-sm text-destructive mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                placeholder="e.g., conference, workshop"
                {...register("type", { required: "Type is required" })}
                className="mt-1"
              />
              {errors.type && (
                <p className="text-sm text-destructive mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>
          </div>

          {/* Multi-language Tabs - ✅ UPDATED */}
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="ar">العربية</TabsTrigger>
              <TabsTrigger value="fr">Français</TabsTrigger>
              <TabsTrigger value="de">Deutsch</TabsTrigger>
            </TabsList>

            {/* English */}
            <TabsContent value="en" className="space-y-4">
              <div>
                <Label htmlFor="title-en">Title (English)</Label>
                <Input
                  id="title-en"
                  {...register("translations.en.title", {
                    required: "Title is required",
                  })}
                  className="mt-1"
                />
                {errors.translations?.en?.title && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.translations.en.title.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="location-en">Location (English)</Label>
                <Input
                  id="location-en"
                  {...register("translations.en.location")}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description-en">Description (English)</Label>
                <Textarea
                  id="description-en"
                  {...register("translations.en.description")}
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="details-en">Details (English)</Label>
                <div className="mt-1">
                  <ReactQuill
                    theme="snow"
                    value={detailsEn}
                    onChange={setDetailsEn}
                    modules={quillModules}
                    className="bg-background"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Arabic */}
            <TabsContent value="ar" className="space-y-4">
              <div>
                <Label htmlFor="title-ar">العنوان (Arabic)</Label>
                <Input
                  id="title-ar"
                  {...register("translations.ar.title")}
                  className="mt-1"
                  dir="rtl"
                />
              </div>

              <div>
                <Label htmlFor="location-ar">الموقع (Arabic)</Label>
                <Input
                  id="location-ar"
                  {...register("translations.ar.location")}
                  className="mt-1"
                  dir="rtl"
                />
              </div>

              <div>
                <Label htmlFor="description-ar">الوصف (Arabic)</Label>
                <Textarea
                  id="description-ar"
                  {...register("translations.ar.description")}
                  rows={3}
                  className="mt-1"
                  dir="rtl"
                />
              </div>

              <div>
                <Label htmlFor="details-ar">التفاصيل (Arabic)</Label>
                <div className="mt-1" dir="rtl">
                  <ReactQuill
                    theme="snow"
                    value={detailsAr}
                    onChange={setDetailsAr}
                    modules={quillModules}
                    className="bg-background"
                  />
                </div>
              </div>
            </TabsContent>

            {/* French - ✅ NEW */}
            <TabsContent value="fr" className="space-y-4">
              <div>
                <Label htmlFor="title-fr">Titre (French)</Label>
                <Input
                  id="title-fr"
                  {...register("translations.fr.title")}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location-fr">Lieu (French)</Label>
                <Input
                  id="location-fr"
                  {...register("translations.fr.location")}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description-fr">Description (French)</Label>
                <Textarea
                  id="description-fr"
                  {...register("translations.fr.description")}
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="details-fr">Détails (French)</Label>
                <div className="mt-1">
                  <ReactQuill
                    theme="snow"
                    value={detailsFr}
                    onChange={setDetailsFr}
                    modules={quillModules}
                    className="bg-background"
                  />
                </div>
              </div>
            </TabsContent>

            {/* German - ✅ NEW */}
            <TabsContent value="de" className="space-y-4">
              <div>
                <Label htmlFor="title-de">Titel (German)</Label>
                <Input
                  id="title-de"
                  {...register("translations.de.title")}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location-de">Ort (German)</Label>
                <Input
                  id="location-de"
                  {...register("translations.de.location")}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description-de">Beschreibung (German)</Label>
                <Textarea
                  id="description-de"
                  {...register("translations.de.description")}
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="details-de">Details (German)</Label>
                <div className="mt-1">
                  <ReactQuill
                    theme="snow"
                    value={detailsDe}
                    onChange={setDetailsDe}
                    modules={quillModules}
                    className="bg-background"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : isEditMode
                ? "Update Event"
                : "Create Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}