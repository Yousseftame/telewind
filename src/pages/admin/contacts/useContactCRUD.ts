import { useCRUD } from "@/hooks/useCRUD";
import { CONTACT_URLS } from "@/services/apiEndpoints";
import { Contact } from "@/services/types";

export function useContactCRUD() {
  return useCRUD<Contact>({
    entityName: "contact",
    queryKey: "contacts",
    endpoints: {
      getAll: CONTACT_URLS.GET_ALL_CONTACT,
      getOne: CONTACT_URLS.GET_CONTACT,
      delete: CONTACT_URLS.DELETE_CONTACT,
      create: "",        // not used
      update: () => "",  // not used
    },
    messages: {
      deleteSuccess: "Contact deleted successfully",
    },
  });
}
