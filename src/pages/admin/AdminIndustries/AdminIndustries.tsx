// src/pages/admin/AdminIndustries/AdminIndustries.tsx

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye, ChevronRight, ChevronLeft, Search, Factory } from "lucide-react";
import {
  DataTable,
  Column,
  editAction,
  deleteAction,
} from "@/components/shared/DataTable";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { Industry } from "@/services/types";
import { getTranslation } from "@/utils/formDataHelpers";
import IndustryFormDialog from "./IndustryFormDialog";
import IndustryViewDialog from "./IndustryViewDialog";
import { useIndustryCRUD } from "./useIndustryCRUD";
import { Badge } from "@/components/ui/badge";

type Language = "en" | "ar" | "tw";

export default function AdminIndustries() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [searchTitle, setSearchTitle] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [viewIndustryId, setViewIndustryId] = useState<number | null>(null);

  const isManager = true; // Mock authentication

  // Use CRUD hook
  const {
    items: industries,
    isLoading,
    useItem,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useIndustryCRUD();

  // Fetch single industry for view
  const { data: viewIndustry, isLoading: isLoadingView } = useItem(
    viewIndustryId,
    showViewDialog
  );

  // Handle form submit
  const handleFormSubmit = (data: any) => {
    if (selectedIndustry) {
      updateMutation.mutate(
        { id: selectedIndustry.id, data },
        {
          onSuccess: () => {
            setShowFormDialog(false);
            setSelectedIndustry(null);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setShowFormDialog(false);
          setSelectedIndustry(null);
        },
      });
    }
  };

  // Get translation for selected language
  const getIndustryTranslation = (industry: Industry) => {
    return getTranslation(industry, selectedLanguage);
  };

  // Sort industries by ID descending (newest first)
  const sortedIndustries = useMemo(() => {
    return [...industries].sort((a, b) => b.id - a.id);
  }, [industries]);

  // Table columns
  const columns: Column<Industry>[] = [
    {
      key: "icon",
      label: "Icon",
      render: (_, industry) => (
        <img
          src={industry.icon}
          alt="Icon"
          className="h-12 w-12 object-contain"
        />
      ),
    },
    {
      key: "id" as keyof Industry,
      label: "Title",
      sortable: true,
      render: (_, industry) => (
        <span className="font-medium">{getIndustryTranslation(industry).title}</span>
      ),
    },
    {
      key: "translations" as keyof Industry,
      label: "Description",
      render: (_, industry) => {
        const desc = getIndustryTranslation(industry).description || "";
        return desc.length > 100 ? `${desc.substring(0, 100)}...` : desc;
      },
    },
    {
      key: "translations" as keyof Industry,
      label: "Applications",
      render: (_, industry) => {
        const apps = getIndustryTranslation(industry).applications || [];
        return apps.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {apps.slice(0, 2).map((app, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {app}
              </Badge>
            ))}
            {apps.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{apps.length - 2}
              </Badge>
            )}
          </div>
        ) : (
          "-"
        );
      },
    },
  ];

  const actions = [
    {
      label: "View",
      icon: <Eye className="h-4 w-4" />,
      onClick: (industry: Industry) => {
        setViewIndustryId(industry.id);
        setShowViewDialog(true);
      },
    },
    editAction<Industry>((industry) => {
      setSelectedIndustry(industry);
      setShowFormDialog(true);
    }),
    deleteAction<Industry>(
      (industry) => {
        setSelectedIndustry(industry);
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
                  <Factory className="h-6 w-6 text-indigo-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Industries
                </h1>
              </div>
              <p className="text-slate-500 ml-14">
                Manage your industries with multilingual support
              </p>
            </div>

            {isManager && (
              <Button
                className="rounded-xl w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 px-6"
                size="lg"
                onClick={() => {
                  setSelectedIndustry(null);
                  setShowFormDialog(true);
                }}
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Industry
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
                placeholder="Search industries..."
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
                  Total Industries
                </span>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
                  {sortedIndustries.length}
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
                data={sortedIndustries}
                loading={isLoading}
                actions={actions}
                searchable={false}
                showActionsColumn={isManager}
                emptyMessage="No industries found."
              />
            </div>

            {/* Custom Pagination Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-700">1-10</span> of{" "}
                <span className="font-medium text-slate-700">{sortedIndustries.length}</span> results
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
      <IndustryFormDialog
        open={showFormDialog}
        onOpenChange={setShowFormDialog}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        industry={selectedIndustry}
      />

      {/* DELETE DIALOG */}
      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => {
          if (selectedIndustry) {
            deleteMutation.mutate(selectedIndustry.id, {
              onSuccess: () => setShowDeleteDialog(false),
            });
          }
        }}
        title="Delete Industry"
        itemName={
          selectedIndustry ? getIndustryTranslation(selectedIndustry).title : ""
        }
        isDeleting={deleteMutation.isPending}
      />

      {/* VIEW DIALOG */}
      <IndustryViewDialog
        open={showViewDialog}
        onOpenChange={(open) => {
          setShowViewDialog(open);
          if (!open) {
            setViewIndustryId(null);
          }
        }}
        industry={viewIndustry || null}
        isLoading={isLoadingView}
      />
    </div>
  );
}