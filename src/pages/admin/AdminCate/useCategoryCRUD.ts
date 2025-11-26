import { useCRUD } from "@/hooks/useCRUD";
import { CATE_URLS } from "@/services/apiEndpoints";
import { Category } from "@/services/types";
import { buildMultiLangFormData } from "@/utils/formDataHelpers";

export function useCategoryCRUD() {
  return useCRUD<Category>({
    entityName: "category",
    queryKey: "categories",
    endpoints: {
      getAll: CATE_URLS.GET_ALL_CATE,
      getOne: CATE_URLS.GET_CATE,
      create: CATE_URLS.CREATE_CATE,
      update: CATE_URLS.UPDATE_CATE,
      delete: CATE_URLS.DELETE_CATE,
    },
    messages: {
      createSuccess: "Category created successfully",
      updateSuccess: "Category updated successfully",
      deleteSuccess: "Category deleted successfully",
    },
    transformForCreate: (data) => buildMultiLangFormData(data),
    transformForUpdate: (id, data) => buildMultiLangFormData(data),
  });
}
