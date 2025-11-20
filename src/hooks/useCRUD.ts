import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axiosInstance";
import { toast } from "sonner";

export interface CRUDConfig<T> {
  entityName: string; // e.g., "category", "product"
  queryKey: string; // e.g., "categories"
  endpoints: {
    getAll: string;
    getOne: (id: number) => string;
    create: string;
    update: (id: number) => string;
    delete: (id: number) => string;
  };
  messages?: {
    createSuccess?: string;
    updateSuccess?: string;
    deleteSuccess?: string;
    createError?: string;
    updateError?: string;
    deleteError?: string;
  };
  // Transform data before sending to API (optional)
  transformForCreate?: (data: any) => FormData | any;
  transformForUpdate?: (id: number, data: any) => FormData | any;
}

export function useCRUD<T>(config: CRUDConfig<T>) {
  const queryClient = useQueryClient();

  // Fetch all items
  const { data: items = [], isLoading } = useQuery({
    queryKey: [config.queryKey],
    queryFn: async () => {
      const response = await axiosInstance.get(config.endpoints.getAll);
      return response.data.data as T[];
    },
  });

  // Fetch single item
  const useItem = (id: number | null, enabled: boolean = true) => {
    return useQuery({
      queryKey: [config.queryKey, id],
      queryFn: async () => {
        if (!id) return null;
        const response = await axiosInstance.get(config.endpoints.getOne(id));
        return response.data.data as T;
      },
      enabled: !!id && enabled,
    });
  };

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = config.transformForCreate ? config.transformForCreate(data) : data;
      await axiosInstance.post(config.endpoints.create, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.queryKey] });
      toast.success(config.messages?.createSuccess || `${config.entityName} created successfully`);
    },
    onError: () => {
      toast.error(config.messages?.createError || `Failed to create ${config.entityName}`);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const payload = config.transformForUpdate ? config.transformForUpdate(id, data) : data;
      await axiosInstance.post(config.endpoints.update(id), payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.queryKey] });
      toast.success(config.messages?.updateSuccess || `${config.entityName} updated successfully`);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || config.messages?.updateError || `Failed to update ${config.entityName}`;
      toast.error(errorMessage);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(config.endpoints.delete(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.queryKey] });
      toast.success(config.messages?.deleteSuccess || `${config.entityName} deleted successfully`);
    },
    onError: () => {
      toast.error(config.messages?.deleteError || `Failed to delete ${config.entityName}`);
    },
  });

  return {
    items,
    isLoading,
    useItem,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
