// src/pages/admin/AdminPartner/PartnerFormDialog.tsx - UPDATED

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus } from "lucide-react";

interface Partner {
  id: number;
  email: string;
  type: string;
  region: string | null; // ✅ MOVED: region is now top-level
  phone: string;
  website: string;
  translations: Array<{
    locale: string;
    name: string;
    country: string;
    contact: string;
    focus: string[];
  }>;
}

interface PartnerFormData {
  email: string;
  type: string;
  region: string; // ✅ MOVED: region is now top-level
  phone: string;
  website: string;
  translations: {
    en: { name: string; country: string; contact: string; focus: string[] };
    ar: { name: string; country: string; contact: string; focus: string[] };
    tw: { name: string; country: string; contact: string; focus: string[] };
    ch: { name: string; country: string; contact: string; focus: string[] };
  };
}

interface PartnerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PartnerFormData) => void;
  isSubmitting?: boolean;
  partner?: Partner | null;
}

export default function PartnerFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
  partner = null,
}: PartnerFormDialogProps) {
  const isEditMode = !!partner;

  // State for focus arrays
  const [focusEn, setFocusEn] = useState<string[]>([""]);
  const [focusAr, setFocusAr] = useState<string[]>([""]);
  const [focusTw, setFocusTw] = useState<string[]>([""]);
  const [focusCh, setFocusCh] = useState<string[]>([""]);

  const getDefaultTranslations = () => {
    if (!partner) {
      return {
        en: { name: "", country: "", contact: "", focus: [] },
        ar: { name: "", country: "", contact: "", focus: [] },
        tw: { name: "", country: "", contact: "", focus: [] },
        ch: { name: "", country: "", contact: "", focus: [] },
      };
    }

    const translations = {
      en: { name: "", country: "", contact: "", focus: [] as string[] },
      ar: { name: "", country: "", contact: "", focus: [] as string[] },
      tw: { name: "", country: "", contact: "", focus: [] as string[] },
      ch: { name: "", country: "", contact: "", focus: [] as string[] },
    };

    partner.translations.forEach((t) => {
      translations[t.locale as keyof typeof translations] = {
        name: t.name,
        country: t.country,
        contact: t.contact,
        focus: t.focus || [],
      };
    });

    return translations;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnerFormData>({
    defaultValues: {
      email: partner?.email || "",
      type: partner?.type || "",
      region: partner?.region || "", // ✅ region is now here
      phone: partner?.phone || "",
      website: partner?.website || "",
      translations: getDefaultTranslations(),
    },
  });

  useEffect(() => {
    if (open) {
      const translations = getDefaultTranslations();
      reset({
        email: partner?.email || "",
        type: partner?.type || "",
        region: partner?.region || "", // ✅ region is now here
        phone: partner?.phone || "",
        website: partner?.website || "",
        translations,
      });

      setFocusEn(
        translations.en.focus.length > 0 ? translations.en.focus : [""]
      );
      setFocusAr(
        translations.ar.focus.length > 0 ? translations.ar.focus : [""]
      );
      setFocusTw(
        translations.tw.focus.length > 0 ? translations.tw.focus : [""]
      );
      setFocusCh(
        translations.ch.focus.length > 0 ? translations.ch.focus : [""]
      );
    }
  }, [open, reset, partner]);

  const handleFormSubmit = (data: PartnerFormData) => {
    onSubmit({
      ...data,
      translations: {
        en: { ...data.translations.en, focus: focusEn.filter((f) => f.trim()) },
        ar: { ...data.translations.ar, focus: focusAr.filter((f) => f.trim()) },
        tw: { ...data.translations.tw, focus: focusTw.filter((f) => f.trim()) },
        ch: { ...data.translations.ch, focus: focusCh.filter((f) => f.trim()) },
      },
    });
  };

  const addFocusItem = (lang: "en" | "ar" | "tw" | "ch") => {
    if (lang === "en") setFocusEn([...focusEn, ""]);
    if (lang === "ar") setFocusAr([...focusAr, ""]);
    if (lang === "tw") setFocusTw([...focusTw, ""]);
    if (lang === "ch") setFocusCh([...focusCh, ""]);
  };

  const removeFocusItem = (lang: "en" | "ar" | "tw" | "ch", index: number) => {
    if (lang === "en") setFocusEn(focusEn.filter((_, i) => i !== index));
    if (lang === "ar") setFocusAr(focusAr.filter((_, i) => i !== index));
    if (lang === "tw") setFocusTw(focusTw.filter((_, i) => i !== index));
    if (lang === "ch") setFocusCh(focusCh.filter((_, i) => i !== index));
  };

  const updateFocusItem = (
    lang: "en" | "ar" | "tw" | "ch",
    index: number,
    value: string
  ) => {
    if (lang === "en") {
      const newFocus = [...focusEn];
      newFocus[index] = value;
      setFocusEn(newFocus);
    }
    if (lang === "ar") {
      const newFocus = [...focusAr];
      newFocus[index] = value;
      setFocusAr(newFocus);
    }
    if (lang === "tw") {
      const newFocus = [...focusTw];
      newFocus[index] = value;
      setFocusTw(newFocus);
    }
    if (lang === "ch") {
      const newFocus = [...focusCh];
      newFocus[index] = value;
      setFocusCh(newFocus);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Partner" : "Add Partner"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Basic Fields - INCLUDING REGION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="partner@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Input
                id="type"
                {...register("type", { required: "Type is required" })}
                placeholder="e.g., Distributor, Reseller"
              />
              {errors.type && (
                <p className="text-sm text-destructive">
                  {errors.type.message}
                </p>
              )}
            </div>

            {/* ✅ ADDED: Region field as top-level */}
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                {...register("region")}
                placeholder="e.g., Middle East, Europe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                {...register("phone", { required: "Phone is required" })}
                placeholder="+971 52 5555555"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="website">Website *</Label>
              <Input
                id="website"
                type="url"
                {...register("website", { required: "Website is required" })}
                placeholder="https://example.com"
              />
              {errors.website && (
                <p className="text-sm text-destructive">
                  {errors.website.message}
                </p>
              )}
            </div>
          </div>

          {/* Language Tabs - WITHOUT REGION */}
          <div className="space-y-2">
            <Label>Translations *</Label>
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="ar">العربية</TabsTrigger>
                <TabsTrigger value="tw">Taiwan</TabsTrigger>
                <TabsTrigger value="ch">Chinese </TabsTrigger>
              </TabsList>

              {/* English Tab */}
              <TabsContent value="en" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translations.en.name">Name (EN) *</Label>
                  <Input
                    id="translations.en.name"
                    {...register("translations.en.name", {
                      required: "Name is required",
                    })}
                    placeholder="Partner name in English"
                  />
                  {errors.translations?.en?.name && (
                    <p className="text-sm text-destructive">
                      {errors.translations.en.name.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="translations.en.country">
                      Country (EN) *
                    </Label>
                    <Input
                      id="translations.en.country"
                      {...register("translations.en.country", {
                        required: "Country is required",
                      })}
                      placeholder="UAE"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="translations.en.contact">
                      Contact (EN) *
                    </Label>
                    <Input
                      id="translations.en.contact"
                      {...register("translations.en.contact", {
                        required: "Contact is required",
                      })}
                      placeholder="Contact person name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Focus Areas (EN)</Label>
                  {focusEn.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) =>
                          updateFocusItem("en", index, e.target.value)
                        }
                        placeholder="Focus area"
                      />
                      {focusEn.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeFocusItem("en", index)}
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
                    onClick={() => addFocusItem("en")}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Focus Area
                  </Button>
                </div>
              </TabsContent>

              {/* Arabic Tab */}
              <TabsContent value="ar" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translations.ar.name">الاسم (AR) *</Label>
                  <Input
                    id="translations.ar.name"
                    {...register("translations.ar.name", {
                      required: "الاسم مطلوب",
                    })}
                    placeholder="اسم الشريك بالعربية"
                    dir="rtl"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="translations.ar.country">
                      الدولة (AR) *
                    </Label>
                    <Input
                      id="translations.ar.country"
                      {...register("translations.ar.country", {
                        required: "الدولة مطلوبة",
                      })}
                      placeholder="الإمارات"
                      dir="rtl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="translations.ar.contact">
                      جهة الاتصال (AR) *
                    </Label>
                    <Input
                      id="translations.ar.contact"
                      {...register("translations.ar.contact", {
                        required: "جهة الاتصال مطلوبة",
                      })}
                      placeholder="اسم جهة الاتصال"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>مجالات التركيز (AR)</Label>
                  {focusAr.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) =>
                          updateFocusItem("ar", index, e.target.value)
                        }
                        placeholder="مجال التركيز"
                        dir="rtl"
                      />
                      {focusAr.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeFocusItem("ar", index)}
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
                    onClick={() => addFocusItem("ar")}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة مجال تركيز
                  </Button>
                </div>
              </TabsContent>

              {/* Taiwan / Traditional Chinese Tab */}
              <TabsContent value="tw" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translations.tw.name">名稱 (TW) *</Label>
                  <Input
                    id="translations.tw.name"
                    {...register("translations.tw.name", {
                      required: "名稱為必填",
                    })}
                    placeholder="合作夥伴名稱"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="translations.tw.country">國家 (TW) *</Label>
                    <Input
                      id="translations.tw.country"
                      {...register("translations.tw.country", {
                        required: "國家為必填",
                      })}
                      placeholder="國家"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="translations.tw.contact">
                      聯絡人 (TW) *
                    </Label>
                    <Input
                      id="translations.tw.contact"
                      {...register("translations.tw.contact", {
                        required: "聯絡人為必填",
                      })}
                      placeholder="聯絡人姓名"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>專長領域 (TW)</Label>
                  {focusTw.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) =>
                          updateFocusItem("tw", index, e.target.value)
                        }
                        placeholder="專長領域"
                      />
                      {focusTw.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeFocusItem("tw", index)}
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
                    onClick={() => addFocusItem("tw")}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    新增專長
                  </Button>
                </div>
              </TabsContent>

              {/* Simplified / Chinese Content Tab */}
              <TabsContent value="ch" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="translations.ch.name">名称 (CH) *</Label>
                  <Input
                    id="translations.ch.name"
                    {...register("translations.ch.name", {
                      required: "名称为必填",
                    })}
                    placeholder="合作伙伴名称"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="translations.ch.country">国家 (CH) *</Label>
                    <Input
                      id="translations.ch.country"
                      {...register("translations.ch.country", {
                        required: "国家为必填",
                      })}
                      placeholder="国家"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="translations.ch.contact">
                      联系人 (CH) *
                    </Label>
                    <Input
                      id="translations.ch.contact"
                      {...register("translations.ch.contact", {
                        required: "联系人为必填",
                      })}
                      placeholder="联系人姓名"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>专长领域 (CH)</Label>
                  {focusCh.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) =>
                          updateFocusItem("ch", index, e.target.value)
                        }
                        placeholder="专长领域"
                      />
                      {focusCh.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeFocusItem("ch", index)}
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
                    onClick={() => addFocusItem("ch")}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    新增专长
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
                ? "Update Partner"
                : "Create Partner"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
