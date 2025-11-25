// src/pages/admin/AdminLogo/LogoFormDialog.tsx

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/shared/ImageUpload";
import SubmitBtn from "@/components/shared/SubmitBtn";
import { PartnerLogo, Partner } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axiosInstance";
import { PARTNER_URLS } from "@/services/apiEndpoints";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
  logo: PartnerLogo | null;
  isSubmitting: boolean;
}

export function LogoFormDialog({
  open,
  onOpenChange,
  onSubmit,
  logo,
  isSubmitting,
}: Props) {
  // const [partnerId, setPartnerId] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");
  const [status, setStatus] = useState(1); // 1 = active, 0 = inactive
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch partners list for dropdown
  const { data: partners = [] } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const response = await axiosInstance.get(PARTNER_URLS.GET_ALL_PARTNER);
      return response.data.data as Partner[];
    },
  });

  useEffect(() => {
    if (logo) {
      // setPartnerId(logo.partnerId.toString());
      setDisplayOrder(logo.displayOrder.toString());
      setStatus(logo.status);
      setLogoFile(null);
    } else {
      // setPartnerId("");
      setDisplayOrder("");
      setStatus(1);
      setLogoFile(null);
    }
    setErrors({});
  }, [logo, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    // if (!partnerId) {
    //   newErrors.partner_id = "Partner is required";
    // }
    if (!displayOrder) {
      newErrors.display_order = "Display order is required";
    }
    if (!logo && !logoFile) {
      newErrors.logo = "Logo image is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await onSubmit({
      // partner_id: parseInt(partnerId),
      display_order: parseInt(displayOrder),
      status: status,
      logo: logoFile,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{logo ? "Edit Partner Logo" : "Add Partner Logo"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Partner Selection */}
          {/* <div>
            <Label htmlFor="partner">Partner *</Label>
            <select
              id="partner"
              value={partnerId}
              onChange={(e) => setPartnerId(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select a partner</option>
              {partners.map((partner) => {
                const enTranslation = partner.translations.find((t) => t.locale === "en");
                return (
                  <option key={partner.id} value={partner.id}>
                    {enTranslation?.name || `Partner #${partner.id}`}
                  </option>
                );
              })}
            </select>
            {errors.partner_id && (
              <p className="text-sm text-destructive mt-1">{errors.partner_id}</p>
            )}
          </div> */}

          {/* Display Order */}
          <div>
            <Label htmlFor="display-order">Display Order *</Label>
            <Input
              id="display-order"
              type="number"
              min="1"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(e.target.value)}
              placeholder="Enter display order (e.g., 1, 2, 3)"
            />
            {errors.display_order && (
              <p className="text-sm text-destructive mt-1">{errors.display_order}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Status *</Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(parseInt(e.target.value))}
              className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          {/* Logo Image */}
          <ImageUpload
            label="Logo Image"
            id="logo-image"
            currentImage={logo?.logoUrl}
            onFileChange={(file) => setLogoFile(file)}
            error={errors.logo}
            required={!logo}
          />

          <SubmitBtn
            isSubmitting={isSubmitting}
            title={logo ? "Update Logo" : "Create Logo"}
            className="w-full bg-primary hover:bg-primary/90"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}