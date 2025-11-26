// src/pages/admin/AdminIndustries/useIndustryCRUD.ts

import { useCRUD } from "@/hooks/useCRUD";
import { INDUSTRY_URLS } from "@/services/apiEndpoints";
import { Industry } from "@/services/types";
import { buildIndustryFormData } from "@/utils/formDataHelpers";

export function useIndustryCRUD() {
  return useCRUD<Industry>({
    entityName: "industry",
    queryKey: "industries",
    endpoints: {
      getAll: INDUSTRY_URLS.GET_ALL_INDUSTRY,
      getOne: INDUSTRY_URLS.GET_INDUSTRY,
      create: INDUSTRY_URLS.CREATE_INDUSTRY,
      update: INDUSTRY_URLS.UPDATE_INDUSTRY,
      delete: INDUSTRY_URLS.DELETE_INDUSTRY,
    },
    messages: {
      createSuccess: "Industry created successfully",
      updateSuccess: "Industry updated successfully",
      deleteSuccess: "Industry deleted successfully",
    },
    transformForCreate: (data) => buildIndustryFormData(data),
    transformForUpdate: (id, data) => buildIndustryFormData(data),
  });
}