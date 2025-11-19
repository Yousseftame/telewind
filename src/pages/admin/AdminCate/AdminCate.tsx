import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { DataTable, Column, editAction, deleteAction } from "@/components/shared/DataTable";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { axiosInstance } from "@/services/axiosInstance";
import { CATE_URLS } from "@/services/apiEndpoints";
import { Category } from "@/services/types";
import { toast } from "sonner";
import CategoryFormDialog from "./CategoryFormDialog";

type Language = "en" | "ar" | "fr";

export default function AdminCate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [searchTitle, setSearchTitle] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const isManager = true; // Mock authentication

  // Fetch categories
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get(CATE_URLS.GET_ALL_CATE);
      return response.data.data as Category[];
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("icon", data.icon);
      formData.append("translations[0][locale]", "en");
      formData.append("translations[0][title]", data.translations.en.title);
      formData.append("translations[0][description]", data.translations.en.description);
      formData.append("translations[1][locale]", "ar");
      formData.append("translations[1][title]", data.translations.ar.title);
      formData.append("translations[1][description]", data.translations.ar.description);
      formData.append("translations[2][locale]", "fr");
      formData.append("translations[2][title]", data.translations.fr.title);
      formData.append("translations[2][description]", data.translations.fr.description);
      
      await axiosInstance.post(CATE_URLS.CREATE_CATE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully");
      setShowFormDialog(false);
      setSelectedCategory(null);
    },
    onError: () => {
      toast.error("Failed to create category");
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const formData = new FormData();
      
      if (data.image) {
        formData.append("image", data.image);
      }
      if (data.icon) {
        formData.append("icon", data.icon);
      }
      
      formData.append("translations[0][locale]", "en");
      formData.append("translations[0][title]", data.translations.en.title);
      formData.append("translations[0][description]", data.translations.en.description);
      formData.append("translations[1][locale]", "ar");
      formData.append("translations[1][title]", data.translations.ar.title);
      formData.append("translations[1][description]", data.translations.ar.description);
      formData.append("translations[2][locale]", "fr");
      formData.append("translations[2][title]", data.translations.fr.title);
      formData.append("translations[2][description]", data.translations.fr.description);
      
      await axiosInstance.post(CATE_URLS.UPDATE_CATE(id), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully");
      setShowFormDialog(false);
      setSelectedCategory(null);
    },
    onError: () => {
      toast.error("Failed to update category");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(CATE_URLS.DELETE_CATE(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
      setShowDeleteDialog(false);
    },
    onError: () => {
      toast.error("Failed to delete category");
    },
  });

  // Handle form submit
  const handleFormSubmit = (data: any) => {
    if (selectedCategory) {
      updateMutation.mutate({ id: selectedCategory.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  // Get translation for selected language
  const getTranslation = (category: Category) => {
    return category.translations.find((t) => t.locale === selectedLanguage) || category.translations[0];
  };

  // Sort categories by ID descending (newest first)
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => b.id - a.id);
  }, [categories]);

  // Table columns
  const columns: Column<Category>[] = [
    {
      key: "image",
      label: "Image",
      render: (_, category) => (
        <img src={category.image} alt={getTranslation(category).title} className="h-12 w-12 rounded-md object-cover" />
      ),
    },
    {
      key: "icon",
      label: "Icon",
      render: (_, category) => (
        <img src={category.icon} alt="Icon" className="h-8 w-8 object-contain" />
      ),
    },
    {
      key: "id" as keyof Category,
      label: "Title",
      sortable: true,
      render: (_, category) => getTranslation(category).title,
    },
    {
      key: "translations" as keyof Category,
      label: "Description",
      sortable: true,
      render: (_, category) => getTranslation(category).description,
    },
  ];

  const actions = [
    editAction<Category>((category) => {
      setSelectedCategory(category);
      setShowFormDialog(true);
    }),
    deleteAction<Category>(
      (category) => {
        setSelectedCategory(category);
        setShowDeleteDialog(true);
      },
      () => isManager
    ),
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* MAIN CONTENT */}
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 overflow-x-hidden">
        <div className="w-full space-y-6">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Categories</h1>
              <p className="text-muted-foreground mt-1">Manage your categories with multilingual support</p>
            </div>

            {isManager && (
              <Button
                className="rounded-full w-full md:w-auto"
                size="lg"
                onClick={() => {
                  setSelectedCategory(null);
                  setShowFormDialog(true);
                }}
              >
                <Plus className="mr-2 h-5 w-5" />
                Add category
              </Button>
            )}
          </div>

          {/* LANGUAGE TABS */}
          <Tabs value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as Language)}>
            <TabsList>
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="ar">العربية</TabsTrigger>
              <TabsTrigger value="fr">Français</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* TABLE */}
          <div className="w-full overflow-x-auto">
            <DataTable
              columns={columns}
              data={sortedCategories}
              loading={isLoading}
              actions={actions}
              searchable
              searchValue={searchTitle}
              onSearchChange={setSearchTitle}
              searchPlaceholder="Search categories..."
              showActionsColumn={isManager}
              pagination={{
                pageNumber: 1,
                pageSize: 10,
                totalPages: 1,
                totalRecords: sortedCategories.length,
                onPageChange: () => {},
                onPageSizeChange: () => {},
              }}
              emptyMessage="No categories found."
            />
          </div>
        </div>
      </main>

      {/* FORM DIALOG */}
      <CategoryFormDialog
        open={showFormDialog}
        onOpenChange={setShowFormDialog}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      {/* DELETE DIALOG */}
      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => {
          if (selectedCategory) deleteMutation.mutate(selectedCategory.id);
        }}
        title="Delete Category"
        itemName={selectedCategory ? getTranslation(selectedCategory).title : ""}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
