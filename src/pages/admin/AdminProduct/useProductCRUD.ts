import { useCRUD } from "@/hooks/useCRUD";
import {  PRODUCT_URLS } from "@/services/apiEndpoints";
import { Product } from "@/services/types";
import { buildPartnerFormData } from "@/utils/formDataHelpers";

export function useProductCRUD() {
  return useCRUD<Product>({
    entityName: "product",
    queryKey: "products",
    endpoints: {
      getAll: PRODUCT_URLS.GET_ALL_PRODUCT,
      getOne: PRODUCT_URLS.GET_PRODUCT,
      create: PRODUCT_URLS.CREATE_PRODUCT,
      update: PRODUCT_URLS.UPDATE_PRODUCT,
      delete: PRODUCT_URLS.DELETE_PRODUCT,
    },
    messages: {
      createSuccess: "Product created successfully",
      updateSuccess: "Product updated successfully",
      deleteSuccess: "Product deleted successfully",
    },
    // transformForCreate: (data) => buildPartnerFormData(data),
    // transformForUpdate: (id, data) => buildPartnerFormData(data),
  });
}