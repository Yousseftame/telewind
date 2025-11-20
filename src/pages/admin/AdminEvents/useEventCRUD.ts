import { useCRUD } from "@/hooks/useCRUD";
import { EVENT_URLS } from "@/services/apiEndpoints";
import { Event } from "@/services/types";
import { buildEventFormData } from "@/utils/formDataHelpers";

export function useEventCRUD() {
  return useCRUD<Event>({
    entityName: "event",
    queryKey: "events",
    endpoints: {
      getAll: EVENT_URLS.GET_ALL_EVENT,
      getOne: EVENT_URLS.GET_EVENT,
      create: EVENT_URLS.CREATE_EVENT,
      update: EVENT_URLS.UPDATE_EVENT,
      delete: EVENT_URLS.DELETE_EVENT,
    },
    messages: {
      createSuccess: "Event created successfully",
      updateSuccess: "Event updated successfully",
      deleteSuccess: "Event deleted successfully",
    },
    transformForCreate: (data) => buildEventFormData(data),
    transformForUpdate: (id, data) => buildEventFormData(data),
  });
}