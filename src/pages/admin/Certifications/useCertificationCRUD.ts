import { useCRUD } from "@/hooks/useCRUD";
import { CERT_URLS } from "@/services/apiEndpoints";
import { Certification } from "@/services/types";
import { buildCertFormData } from "@/utils/formDataHelpers";

export function useCertificationCRUD() {
  return useCRUD<Certification>({
    entityName: "certification",
    queryKey: "certifications",
    endpoints: {
      getAll: CERT_URLS.GET_ALL_CERT,
      getOne: CERT_URLS.GET_CERT,
      create: CERT_URLS.CREATE_CERT,
      update: CERT_URLS.UPDATE_CERT,
      delete: CERT_URLS.DELETE_CERT,
    },
    messages: {
      createSuccess: "Certification created successfully",
      updateSuccess: "Certification updated successfully",
      deleteSuccess: "Certification deleted successfully",
    },
    transformForCreate: (data) => buildCertFormData(data),
    transformForUpdate: (id, data) => buildCertFormData(data),
  });
}