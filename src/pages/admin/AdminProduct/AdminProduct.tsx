import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Eye,
  ChevronRight,
  ChevronLeft,
  Search,
  Package,
} from "lucide-react";

import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { Product } from "@/services/types";
import { getTranslation } from "@/utils/formDataHelpers";
import ProductFormDialog, { ProductFormData } from "./ProductFormDialog";
import ProductViewDialog from "./ProductViewDialog";
import { useProductCRUD } from "./useProductCRUD";
import {
  DataTable,
  Column,
  editAction,
  deleteAction,
} from "@/components/shared/DataTable";

type Language = "en" | "ar" | "fr" | "de";

export default function AdminProduct() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [searchTitle, setSearchTitle] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewProductId, setViewProductId] = useState<number | null>(null);

  const isManager = true; // Mock authentication

  // Use CRUD hook
  const {
    items: products,
    isLoading,
    useItem,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useProductCRUD();

  // Fetch single product for view
  const { data: viewProduct, isLoading: isLoadingView } = useItem(
    viewProductId,
    showViewDialog
  );

  // Handle form submit
  const handleFormSubmit = (data: ProductFormData) => {
    if (selectedProduct) {
      updateMutation.mutate(
        { id: selectedProduct.id, data },
        {
          onSuccess: () => {
            setShowFormDialog(false);
            setSelectedProduct(null);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setShowFormDialog(false);
          setSelectedProduct(null);
        },
      });
    }
  };

  // Get translation for selected language
  const getProductTranslation = (product: Product) => {
    return getTranslation(product, selectedLanguage);
  };

  // Sort products by ID descending (newest first)
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => b.id - a.id);
  }, [products]);

  // Table columns
  const columns: Column<Product>[] = [
    {
      key: "image",
      label: "Image",
      render: (_, product) =>
        product.image ? (
          <img
            src={product.image}
            alt="Product"
            className="w-12 h-12 object-cover rounded-lg border border-slate-200"
          />
        ) : (
          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
            <Package className="h-5 w-5 text-slate-400" />
          </div>
        ),
    },
    {
      key: "id" as keyof Product,
      label: "Title",
      sortable: true,
      render: (_, product) => (
        <span className="font-medium">
          {getProductTranslation(product).title}
        </span>
      ),
    },
    {
      key: "translations" as keyof Product,
      label: "Description",
      render: (_, product) => {
        const desc = getProductTranslation(product).description;
        return (
          <span className="text-sm text-slate-600 line-clamp-2">
            {desc.length > 50 ? `${desc.substring(0, 50)}...` : desc}
          </span>
        );
      },
    },
    {
      key: "supported_bands",
      label: "Supported Bands",
      render: (_, product) => {
        const bands = product.supported_bands || [];
        return bands.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {bands.slice(0, 2).map((band, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {band}
              </Badge>
            ))}
            {bands.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{bands.length - 2}
              </Badge>
            )}
          </div>
        ) : (
          "-"
        );
      },
    },
    {
      key: "KeyFeatures" as keyof Product,
      label: "Key Features",
      render: (_, product) => {
        const features = getProductTranslation(product).key_features || [];
        return (
          <span className="text-sm text-slate-600">
            {features.length} {features.length === 1 ? "feature" : "features"}
          </span>
        );
      },
    },
  ];

  const actions = [
    {
      label: "View",
      icon: <Eye className="h-4 w-4" />,
      onClick: (product: Product) => {
        setViewProductId(product.id);
        setShowViewDialog(true);
      },
    },
    editAction<Product>((product) => {
      setSelectedProduct(product);
      setShowFormDialog(true);
    }),
    deleteAction<Product>(
      (product) => {
        setSelectedProduct(product);
        setShowDeleteDialog(true);
      },
      () => isManager
    ),
  ];

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* MAIN CONTENT */}
      <main className="flex-1 px-4 py-8 md:px-8 lg:px-12 overflow-x-hidden">
        <div className="w-full mx-auto space-y-8">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-100 rounded-xl">
                  <Package className="h-6 w-6 text-indigo-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Products
                </h1>
              </div>
              <p className="text-slate-500 ml-14">
                Manage your products with multilingual support
              </p>
            </div>

            {isManager && (
              <Button
                className="rounded-xl w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 px-6"
                size="lg"
                onClick={() => {
                  setSelectedProduct(null);
                  setShowFormDialog(true);
                }}
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Product
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
                  value="fr"
                  className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
                >
                 🇫🇷 Français
                </TabsTrigger>
                <TabsTrigger
                  value="de"
                  className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
                >
                 🇩🇪 Deutsch
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* SEARCH INPUT */}
            {/* <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div> */}
          </div>

          {/* TABLE CARD */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Table Header Stats */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600">
                  Total Products
                </span>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
                  {sortedProducts.length}
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
                data={sortedProducts}
                loading={isLoading}
                actions={actions}
                searchable={false}
                showActionsColumn={isManager}
                emptyMessage="No products found."
              />
            </div>

            {/* Custom Pagination Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-700">1-10</span>{" "}
                of{" "}
                <span className="font-medium text-slate-700">
                  {sortedProducts.length}
                </span>{" "}
                results
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
      <ProductFormDialog
        open={showFormDialog}
        onOpenChange={setShowFormDialog}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        product={selectedProduct}
      />

      {/* DELETE DIALOG */}
      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => {
          if (selectedProduct) {
            deleteMutation.mutate(selectedProduct.id, {
              onSuccess: () => setShowDeleteDialog(false),
            });
          }
        }}
        title="Delete Product"
        itemName={
          selectedProduct ? getProductTranslation(selectedProduct).title : ""
        }
        isDeleting={deleteMutation.isPending}
      />

      {/* VIEW DIALOG */}
      <ProductViewDialog
        open={showViewDialog}
        onOpenChange={(open) => {
          setShowViewDialog(open);
          if (!open) {
            setViewProductId(null);
          }
        }}
        product={viewProduct || null}
        isLoading={isLoadingView}
      />
    </div>
  );
}
