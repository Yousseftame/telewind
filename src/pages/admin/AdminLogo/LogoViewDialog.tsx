// src/pages/admin/AdminLogo/LogoViewDialog.tsx

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PartnerLogo, Partner } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axiosInstance";
import { PARTNER_URLS } from "@/services/apiEndpoints";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  logo: PartnerLogo | null;
}

export function LogoViewDialog({ open, onOpenChange, logo }: Props) {
  // Fetch partner details
  // const { data: partner } = useQuery({
  //   queryKey: ["partner", logo?.partnerId],
  //   queryFn: async () => {
  //     if (!logo?.partnerId) return null;
  //     const response = await axiosInstance.get(PARTNER_URLS.GET_PARTNER(logo.partnerId));
  //     return response.data.data as Partner;
  //   },
  //   enabled: !!logo?.partnerId && open,
  // });

  if (!logo) return null;

  // const partnerName = partner?.translations.find((t) => t.locale === "en")?.name || `Partner #${logo.partnerId}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Partner Logo Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Logo Image */}
          <div>
            <h3 className="text-sm font-medium mb-2">Logo Image</h3>
            {logo.logoUrl && !logo.logoUrl.includes("/null") ? (
              <img
                src={logo.logoUrl}
                alt="Partner Logo"
                className="w-full max-w-md rounded-lg border"
              />
            ) : (
              <p className="text-muted-foreground">No image available</p>
            )}
          </div>

          {/* ID */}
          <div>
            <h3 className="text-sm font-medium">ID</h3>
            <p className="text-muted-foreground">{logo.id}</p>
          </div>

          {/* Partner */}
          {/* <div>
            <h3 className="text-sm font-medium">Partner</h3>
            <p className="text-muted-foreground">{partnerName}</p>
          </div> */}

          {/* Display Order */}
          <div>
            <h3 className="text-sm font-medium">Display Order</h3>
            <p className="text-muted-foreground">{logo.displayOrder}</p>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-sm font-medium mb-2">Status</h3>
            <Badge
              variant={logo.status === 1 ? "default" : "secondary"}
              className={logo.status === 1 ? "bg-green-500" : "bg-gray-500"}
            >
              {logo.statusText}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}