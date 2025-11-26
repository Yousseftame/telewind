// src/pages/admin/AdminPartner/usePartnerCRUD.ts

import { useCRUD } from "@/hooks/useCRUD";
import { PARTNER_URLS } from "@/services/apiEndpoints";
import { Partner } from "@/services/types";
import { buildPartnerFormData } from "@/utils/formDataHelpers";

export function usePartnerCRUD() {
  return useCRUD<Partner>({
    entityName: "partner",
    queryKey: "partners",
    endpoints: {
      getAll: PARTNER_URLS.GET_ALL_PARTNER,
      getOne: PARTNER_URLS.GET_PARTNER,
      create: PARTNER_URLS.CREATE_PARTNER,
      update: PARTNER_URLS.UPDATE_PARTNER,
      delete: PARTNER_URLS.DELETE_PARTNER,
    },
    messages: {
      createSuccess: "Partner created successfully",
      updateSuccess: "Partner updated successfully",
      deleteSuccess: "Partner deleted successfully",
    },
    transformForCreate: (data) => buildPartnerFormData(data),
    transformForUpdate: (id, data) => buildPartnerFormData(data),
  });
}