// src/pages/admin/AdminPartner/AdminPartner.tsx

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye, ChevronRight, ChevronLeft, Search, Handshake } from "lucide-react";
import {
  DataTable,
  Column,
  editAction,
  deleteAction,
} from "@/components/shared/DataTable";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { Partner } from "@/services/types";
import { getTranslation } from "@/utils/formDataHelpers";
import PartnerFormDialog from "./PartnerFormDialog";
import PartnerViewDialog from "./PartnerViewDialog";
import { usePartnerCRUD } from "./usePartnerCRUD";
import { Badge } from "@/components/ui/badge";

type Language = "en" | "ar" | "fr";

export default function AdminPartner() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [searchTitle, setSearchTitle] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [viewPartnerId, setViewPartnerId] = useState<number | null>(null);

  const isManager = true; // Mock authentication

  // Use CRUD hook
  const {
    items: partners,
    isLoading,
    useItem,
    createMutation,
    updateMutation,
    deleteMutation,
  } = usePartnerCRUD();

  // Fetch single partner for view
  const { data: viewPartner, isLoading: isLoadingView } = useItem(
    viewPartnerId,
    showViewDialog
  );

  // Handle form submit
  const handleFormSubmit = (data: any) => {
    if (selectedPartner) {
      updateMutation.mutate(
        { id: selectedPartner.id, data },
        {
          onSuccess: () => {
            setShowFormDialog(false);
            setSelectedPartner(null);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setShowFormDialog(false);
          setSelectedPartner(null);
        },
      });
    }
  };

  // Get translation for selected language
 // Get translation for selected language
const getPartnerTranslation = (partner: Partner) => {
  const translation = getTranslation(partner, selectedLanguage);
  // console.log('Selected Language:', selectedLanguage, 'Translation:', translation); // 👈 ADD THIS
  return translation;
};

  // Sort partners by ID descending (newest first)
  const sortedPartners = useMemo(() => {
    return [...partners].sort((a, b) => b.id - a.id);
  }, [partners]);

  // Table columns - NOW WITH useMemo TO FIX LANGUAGE SWITCHING
  const columns: Column<Partner>[] = useMemo(() => [
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (_, partner) => (
        <span className="text-sm break-all">{partner.email}</span>
      ),
    },
    {
      key: "type",
      label: "Type",
      sortable: true,
      render: (_, partner) => (
        <Badge variant="secondary" className="capitalize">
          {partner.type}
        </Badge>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      sortable: true,
      render: (_, partner) => (
        <span className="text-sm">{partner.phone}</span>
      ),
    },
    {
      key: "website",
      label: "Website",
      render: (_, partner) => (
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          {partner.website.length > 30
            ? `${partner.website.substring(0, 30)}...`
            : partner.website}
        </a>
      ),
    },
    {
      key: "id" as keyof Partner,
      label: "Name",
      sortable: true,
      render: (_, partner) => (
        <span className="font-medium">{getPartnerTranslation(partner).name}</span>
      ),
    },
    {
      key: "translations" as keyof Partner,
      label: "Region",
      render: (_, partner) => getPartnerTranslation(partner).region,
    },
    {
      key: "translations" as keyof Partner,
      label: "Country",
      render: (_, partner) => getPartnerTranslation(partner).country,
    },
    {
      key: "translations" as keyof Partner,
      label: "Contact",
      render: (_, partner) => getPartnerTranslation(partner).contact,
    },
    {
      key: "translations" as keyof Partner,
      label: "Focus",
      render: (_, partner) => {
        const focus = getPartnerTranslation(partner).focus || [];
        return focus.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {focus.slice(0, 2).map((item, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {item}
              </Badge>
            ))}
            {focus.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{focus.length - 2}
              </Badge>
            )}
          </div>
        ) : (
          "-"
        );
      },
    },
  ], [selectedLanguage]); // 👈 FIX: Added dependency to recalculate when language changes

  const actions = [
    {
      label: "View",
      icon: <Eye className="h-4 w-4" />,
      onClick: (partner: Partner) => {
        setViewPartnerId(partner.id);
        setShowViewDialog(true);
      },
    },
    editAction<Partner>((partner) => {
      setSelectedPartner(partner);
      setShowFormDialog(true);
    }),
    deleteAction<Partner>(
      (partner) => {
        setSelectedPartner(partner);
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
                  <Handshake className="h-6 w-6 text-indigo-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Partners
                </h1>
              </div>
              <p className="text-slate-500 ml-14">
                Manage your partners with multilingual support
              </p>
            </div>

            {isManager && (
              <Button
                className="rounded-xl w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 px-6"
                size="lg"
                onClick={() => {
                  setSelectedPartner(null);
                  setShowFormDialog(true);
                }}
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Partner
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
              </TabsList>
            </Tabs>

            {/* SEARCH INPUT */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search partners..."
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
                  Total Partners
                </span>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
                  {sortedPartners.length}
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
                data={sortedPartners}
                loading={isLoading}
                actions={actions}
                searchable={false}
                showActionsColumn={isManager}
                emptyMessage="No partners found."
              />
            </div>

            {/* Custom Pagination Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-700">1-10</span> of{" "}
                <span className="font-medium text-slate-700">{sortedPartners.length}</span> results
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
      <PartnerFormDialog
        open={showFormDialog}
        onOpenChange={setShowFormDialog}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        partner={selectedPartner}
      />

      {/* DELETE DIALOG */}
      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => {
          if (selectedPartner) {
            deleteMutation.mutate(selectedPartner.id, {
              onSuccess: () => setShowDeleteDialog(false),
            });
          }
        }}
        title="Delete Partner"
        itemName={
          selectedPartner ? getPartnerTranslation(selectedPartner).name : ""
        }
        isDeleting={deleteMutation.isPending}
      />

      {/* VIEW DIALOG */}
      <PartnerViewDialog
        open={showViewDialog}
        onOpenChange={(open) => {
          setShowViewDialog(open);
          if (!open) {
            setViewPartnerId(null);
          }
        }}
        partner={viewPartner || null}
        isLoading={isLoadingView}
      />
    </div>
  );
}