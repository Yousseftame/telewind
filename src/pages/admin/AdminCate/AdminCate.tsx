import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye } from "lucide-react";
import {
  DataTable,
  Column,
  editAction,
  deleteAction,
} from "@/components/shared/DataTable";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { Category } from "@/services/types";
import { getTranslation } from "@/utils/formDataHelpers";
import CategoryFormDialog from "./CategoryFormDialog";
import CategoryViewDialog from "./CategoryViewDialog";
import { useCategoryCRUD } from "./useCategoryCRUD";

type Language = "en" | "ar" | "fr";

export default function AdminCate() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [searchTitle, setSearchTitle] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [viewCategoryId, setViewCategoryId] = useState<number | null>(null);

  const isManager = true; // Mock authentication

  // Use CRUD hook
  const {
    items: categories,
    isLoading,
    useItem,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useCategoryCRUD();

  // Fetch single category for view
  const { data: viewCategory, isLoading: isLoadingView } = useItem(
    viewCategoryId,
    showViewDialog
  );

  // Handle form submit
  const handleFormSubmit = (data: any) => {
    if (selectedCategory) {
      updateMutation.mutate(
        { id: selectedCategory.id, data },
        {
          onSuccess: () => {
            setShowFormDialog(false);
            setSelectedCategory(null);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setShowFormDialog(false);
          setSelectedCategory(null);
        },
      });
    }
  };

  // Get translation for selected language
  const getCategoryTranslation = (category: Category) => {
    return getTranslation(category, selectedLanguage);
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
        <img
          src={category.image}
          alt={getCategoryTranslation(category).title}
          className="h-12 w-12 rounded-md object-cover"
        />
      ),
    },
    {
      key: "icon",
      label: "Icon",
      render: (_, category) => (
        <img
          src={category.icon}
          alt="Icon"
          className="h-8 w-8 object-contain"
        />
      ),
    },
    {
      key: "id" as keyof Category,
      label: "Title",
      sortable: true,
      render: (_, category) => getCategoryTranslation(category).title,
    },
    {
      key: "translations" as keyof Category,
      label: "Description",
      sortable: true,
      render: (_, category) => getCategoryTranslation(category).description,
    },
  ];

  const actions = [
    {
      label: "View",
      icon: <Eye className="h-4 w-4" />,
      onClick: (category: Category) => {
        setViewCategoryId(category.id);
        setShowViewDialog(true);
      },
    },
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
              <p className="text-muted-foreground mt-1">
                Manage your categories with multilingual support
              </p>
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
          <Tabs
            value={selectedLanguage}
            onValueChange={(value) => setSelectedLanguage(value as Language)}
          >
            <TabsList>
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="ar">العربية</TabsTrigger>
              <TabsTrigger value="fr">Taiwan</TabsTrigger>
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
        category={selectedCategory}
      />

      {/* DELETE DIALOG */}
      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => {
          if (selectedCategory) {
            deleteMutation.mutate(selectedCategory.id, {
              onSuccess: () => setShowDeleteDialog(false),
            });
          }
        }}
        title="Delete Category"
        itemName={
          selectedCategory ? getCategoryTranslation(selectedCategory).title : ""
        }
        isDeleting={deleteMutation.isPending}
      />

      {/* VIEW DIALOG */}
      <CategoryViewDialog
        open={showViewDialog}
        onOpenChange={(open) => {
          setShowViewDialog(open);
          if (!open) {
            setViewCategoryId(null);
          }
        }}
        category={viewCategory || null}
        isLoading={isLoadingView}
      />
    </div>
  );
}
