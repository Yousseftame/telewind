import { useCRUD } from "@/hooks/useCRUD";
import { ANNOUNCEMENT_URLS } from "@/services/apiEndpoints";
import { Announcement } from "@/services/types";
import { buildAnnouncementFormData } from "@/utils/formDataHelpers";

export function useAnnouncementCRUD() {
  return useCRUD<Announcement>({
    entityName: "announcement",
    queryKey: "announcements",
    endpoints: {
      getAll: ANNOUNCEMENT_URLS.GET_ALL_ANNOUNCEMENT,
      getOne: ANNOUNCEMENT_URLS.GET_ANNOUNCEMENT,
      create: ANNOUNCEMENT_URLS.CREATE_ANNOUNCEMENT,
      update: ANNOUNCEMENT_URLS.UPDATE_ANNOUNCEMENT,
      delete: ANNOUNCEMENT_URLS.DELETE_ANNOUNCEMENT,
    },
    messages: {
      createSuccess: "Announcement created successfully",
      updateSuccess: "Announcement updated successfully",
      deleteSuccess: "Announcement deleted successfully",
    },
    transformForCreate: (data) => buildAnnouncementFormData(data),
    transformForUpdate: (id, data) => buildAnnouncementFormData(data),
  });
}
