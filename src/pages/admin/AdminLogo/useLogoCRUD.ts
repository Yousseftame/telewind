// src/pages/admin/AdminLogo/useLogoCRUD.ts

import { useCRUD } from "@/hooks/useCRUD";
import { LOGO_URLS } from "@/services/apiEndpoints";
import { PartnerLogo } from "@/services/types";
import { buildLogoFormData } from "@/utils/formDataHelpers";

export function useLogoCRUD() {
  return useCRUD<PartnerLogo>({
    entityName: "partner logo",
    queryKey: "partner-logos",
    endpoints: {
      getAll: LOGO_URLS.GET_ALL_LOGO,
      getOne: LOGO_URLS.GET_LOGO,
      create: LOGO_URLS.CREATE_LOGO,
      update: LOGO_URLS.UPDATE_LOGO,
      delete: LOGO_URLS.DELETE_LOGO,
    },
    messages: {
      createSuccess: "Logo created successfully",
      updateSuccess: "Logo updated successfully",
      deleteSuccess: "Logo deleted successfully",
    },
    transformForCreate: (data) => buildLogoFormData(data),
    transformForUpdate: (id, data) => buildLogoFormData(data),
  });
}