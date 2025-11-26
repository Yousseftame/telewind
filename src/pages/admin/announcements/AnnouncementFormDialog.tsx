import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SubmitBtn from "@/components/shared/SubmitBtn";
import { Announcement } from "@/services/types";
import { getTranslation } from "@/utils/formDataHelpers";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  announcement?: Announcement | null;
  mode: "create" | "edit";
}

export function AnnouncementFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
  announcement,
  mode,
}: Props) {
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [translations, setTranslations] = useState({
    en: { title: "", description: "" },
    ar: { title: "", description: "" },
    tw: { title: "", description: "" },
    ch: { title: "", description: "" },
  });

  useEffect(() => {
    if (mode === "edit" && announcement) {
      setDate(announcement.date || "");
      setType(announcement.type || "");

      const enTrans = getTranslation(announcement, "en");
      const arTrans = getTranslation(announcement, "ar");
      const twTrans = getTranslation(announcement, "tw");
      const chTrans = getTranslation(announcement, "ch");

      setTranslations({
        en: {
          title: enTrans?.title || "",
          description: enTrans?.description || "",
        },
        ar: {
          title: arTrans?.title || "",
          description: arTrans?.description || "",
        },
        tw: {
          title: twTrans?.title || "",
          description: twTrans?.description || "",
        },
        ch: {
          title: chTrans?.title || "",
          description: chTrans?.description || "",
        },
      });
    } else {
      setDate("");
      setType("");
      setTranslations({
        en: { title: "", description: "" },
        ar: { title: "", description: "" },
        tw: { title: "", description: "" },
        ch: { title: "", description: "" },
      });
    }
  }, [announcement, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ date, type, translations });
  };

  const updateTranslation = (
    lang: "en" | "ar" | "tw" | "ch",
    field: "title" | "description",
    value: string
  ) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Announcement" : "Edit Announcement"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          <div>
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Type */}
          <div>
            <Label htmlFor="type">Type *</Label>
            <Input
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="e.g., conference, webinar, workshop"
              required
            />
          </div>

          {/* Translations */}
          <div>
            <Label>Translations *</Label>
            <Tabs defaultValue="en" className="w-full mt-2">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="ar">Arabic</TabsTrigger>
                <TabsTrigger value="tw">Taiwan</TabsTrigger>
                <TabsTrigger value="ch">Chinese </TabsTrigger>
              </TabsList>

              {/* English Tab */}
              <TabsContent value="en" className="space-y-4">
                <div>
                  <Label htmlFor="en-title">Title (EN) *</Label>
                  <Input
                    id="en-title"
                    value={translations.en.title}
                    onChange={(e) =>
                      updateTranslation("en", "title", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="en-description">Description (EN) *</Label>
                  <Textarea
                    id="en-description"
                    value={translations.en.description}
                    onChange={(e) =>
                      updateTranslation("en", "description", e.target.value)
                    }
                    rows={4}
                    required
                  />
                </div>
              </TabsContent>

              {/* Arabic Tab */}
              <TabsContent value="ar" className="space-y-4">
                <div>
                  <Label htmlFor="ar-title">Title (AR) *</Label>
                  <Input
                    id="ar-title"
                    value={translations.ar.title}
                    onChange={(e) =>
                      updateTranslation("ar", "title", e.target.value)
                    }
                    dir="rtl"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ar-description">Description (AR) *</Label>
                  <Textarea
                    id="ar-description"
                    value={translations.ar.description}
                    onChange={(e) =>
                      updateTranslation("ar", "description", e.target.value)
                    }
                    rows={4}
                    dir="rtl"
                    required
                  />
                </div>
              </TabsContent>

              {/* Taiwan / Traditional Chinese Tab */}
              <TabsContent value="tw" className="space-y-4">
                <div>
                  <Label htmlFor="tw-title">Title (TW) *</Label>
                  <Input
                    id="tw-title"
                    value={translations.tw.title}
                    onChange={(e) =>
                      updateTranslation("tw", "title", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tw-description">Description (TW) *</Label>
                  <Textarea
                    id="tw-description"
                    value={translations.tw.description}
                    onChange={(e) =>
                      updateTranslation("tw", "description", e.target.value)
                    }
                    rows={4}
                    required
                  />
                </div>
              </TabsContent>

              {/* Simplified / Chinese Content Tab */}
              <TabsContent value="ch" className="space-y-4">
                <div>
                  <Label htmlFor="ch-title">Title (CH) *</Label>
                  <Input
                    id="ch-title"
                    value={translations.ch.title}
                    onChange={(e) =>
                      updateTranslation("ch", "title", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ch-description">Description (CH) *</Label>
                  <Textarea
                    id="ch-description"
                    value={translations.ch.description}
                    onChange={(e) =>
                      updateTranslation("ch", "description", e.target.value)
                    }
                    rows={4}
                    required
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <SubmitBtn
            isSubmitting={isSubmitting}
            title={
              mode === "create" ? "Create Announcement" : "Update Announcement"
            }
            className="w-full bg-primary hover:bg-primary/90"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
