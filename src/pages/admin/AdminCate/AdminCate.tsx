import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye, ChevronRight, ChevronLeft, Search, Layers, ChartColumnStacked } from "lucide-react";
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

type Language = "en" | "ar" | "tw";

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

  // console.log(categories)
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
    <div className="flex min-h-screen bg-slate-50/50">
  {/* MAIN CONTENT */}
  <main className="flex-1 px-4 py-8 md:px-8 lg:px-12 overflow-x-hidden">
    <div className="w-full  mx-auto space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 rounded-xl">
              <ChartColumnStacked className="h-6 w-6 text-indigo-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Categories
            </h1>
          </div>
          <p className="text-slate-500 ml-14">
            Manage your categories with multilingual support
          </p>
        </div>

        {isManager && (
          <Button
            className="rounded-xl w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 px-6"
            size="lg"
            onClick={() => {
              setSelectedCategory(null);
              setShowFormDialog(true);
            }}
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Category
          </Button>
        )}
      </div>

      {/* CONTROLS BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        
        {/* LANGUAGE TABS */}
        <Tabs
          value={selectedLanguage}
          onValueChange={(value) => setSelectedLanguage(value as Language)}
        >
          <TabsList className="bg-slate-100 p-1 rounded-xl">
            <TabsTrigger 
              value="en" 
              className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
            >
              🇬🇧 English
            </TabsTrigger>
            <TabsTrigger 
              value="ar"
              className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
            >
              🇸🇦 العربية
            </TabsTrigger>
            <TabsTrigger 
              value="tw"
              className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
            >
              🇹🇼 Taiwan
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* SEARCH INPUT */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Table Header Stats */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">
              Total Categories
            </span>
            <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
              {sortedCategories.length}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Showing</span>
            <select className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        {/* Table Content */}
        <div className="w-full overflow-x-auto">
          <DataTable
            columns={columns}
            data={sortedCategories}
            loading={isLoading}
            actions={actions}
            searchable={false} // We moved search outside
            showActionsColumn={isManager}
           
            emptyMessage="No categories found."
          />
        </div>

        {/* Custom Pagination Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-700">1-10</span> of{" "}
            <span className="font-medium text-slate-700">{sortedCategories.length}</span> results
          </p>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 disabled:opacity-50 transition-all">
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <div className="flex items-center gap-1">
              <button className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow-sm">
                1
              </button>
              <button className="px-3.5 py-2 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-100 transition-all">
                2
              </button>
              <button className="px-3.5 py-2 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-100 transition-all">
                3
              </button>
              <span className="px-2 text-slate-400">...</span>
              <button className="px-3.5 py-2 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-100 transition-all">
                10
              </button>
            </div>
            
            <button className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
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
