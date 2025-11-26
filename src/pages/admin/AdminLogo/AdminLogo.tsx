// src/pages/admin/AdminLogo/AdminLogo.tsx

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Image as ImageIcon, Plus, Search } from "lucide-react";
import { DataTable, Column, editAction, deleteAction } from "@/components/shared/DataTable";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { PartnerLogo, Partner } from "@/services/types";
import { useLogoCRUD } from "./useLogoCRUD";
import { LogoFormDialog } from "./LogoFormDialog";
import { LogoViewDialog } from "./LogoViewDialog";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axiosInstance";
import { PARTNER_URLS } from "@/services/apiEndpoints";

export default function AdminLogo() {
  const { items: logos, isLoading, createMutation, updateMutation, deleteMutation } = useLogoCRUD();

  // Fetch partners list for display
  const { data: partners = [] } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const response = await axiosInstance.get(PARTNER_URLS.GET_ALL_PARTNER);
      return response.data.data as Partner[];
    },
  });

  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<PartnerLogo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreate = () => {
    setSelectedLogo(null);
    setFormOpen(true);
  };

  const handleEdit = (logo: PartnerLogo) => {
    setSelectedLogo(logo);
    setFormOpen(true);
  };

  const handleView = (logo: PartnerLogo) => {
    setSelectedLogo(logo);
    setViewOpen(true);
  };

  const handleDeleteClick = (logo: PartnerLogo) => {
    setSelectedLogo(logo);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    if (selectedLogo) {
      await updateMutation.mutateAsync({ id: selectedLogo.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    setFormOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (selectedLogo) {
      await deleteMutation.mutateAsync(selectedLogo.id);
      setDeleteOpen(false);
      setSelectedLogo(null);
    }
  };

  // Helper to get partner name
  // const getPartnerName = (partnerId: number) => {
  //   const partner = partners.find((p) => p.id === partnerId);
  //   const enTranslation = partner?.translations.find((t) => t.locale === "en");
  //   return enTranslation?.name || `Partner #${partnerId}`;
  // };

  // Sort logos by display order
  const sortedLogos = useMemo(() => {
    return [...logos].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [logos]);

  // Filter logos based on search
  const filteredLogos = useMemo(() => {
    if (!searchQuery.trim()) return sortedLogos;
    
    return sortedLogos.filter((logo) => {
      // const partnerName = getPartnerName(logo.partnerId).toLowerCase();
      const search = searchQuery.toLowerCase();
      // return partnerName.includes(search) || 
             logo.id.toString().includes(search) ||
             logo.displayOrder.toString().includes(search);
    });
  }, [sortedLogos, searchQuery, partners]);

  const columns: Column<PartnerLogo>[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
    {
      key: "logoUrl",
      label: "Logo",
      render: (_, logo) =>
        logo.logoUrl && !logo.logoUrl.includes("/null") ? (
          <img src={logo.logoUrl} alt="Logo" className="w-16 h-16 object-contain rounded" />
        ) : (
          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          </div>
        ),
    },
    // {
    //   key: "partnerId",
    //   label: "Partner",
    //   sortable: true,
    //   render: (_, logo) => getPartnerName(logo.partnerId),
    // },
    {
      key: "displayOrder",
      label: "Display Order",
      sortable: true,
      render: (_, logo) => (
        <Badge variant="outline" className="font-mono">
          {logo.displayOrder}
        </Badge>
      ),
    },
    {
      key: "statusText",
      label: "Status",
      sortable: true,
      render: (_, logo) => (
        <Badge
          variant={logo.status === 1 ? "default" : "secondary"}
          className={logo.status === 1 ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"}
        >
          {logo.statusText}
        </Badge>
      ),
    },
  ];

  const actions = [
    {
      label: "View",
      onClick: handleView,
    },
    editAction(handleEdit),
    deleteAction(handleDeleteClick),
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
                  <ImageIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Partner Logos
                </h1>
              </div>
              <p className="text-slate-500 ml-14">
                Manage partner logos with display order and status
              </p>
            </div>

            <Button
              onClick={handleCreate}
              className="rounded-xl w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 px-6"
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Logo
            </Button>
          </div>

          {/* CONTROLS BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            {/* SEARCH INPUT */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by partner, ID, or order..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Sorted by</span>
              <Badge variant="outline">Display Order</Badge>
            </div>
          </div>

          {/* TABLE CARD */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            
            {/* Table Header Stats */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600">
                  Total Logos
                </span>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
                  {filteredLogos.length}
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
              <DataTable<PartnerLogo>
                columns={columns}
                data={filteredLogos}
                actions={actions}
                loading={isLoading}
                searchable={false}
                showActionsColumn={true}
                emptyMessage="No partner logos found."
              />
            </div>

            {/* Custom Pagination Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-700">1-{Math.min(10, filteredLogos.length)}</span> of{" "}
                <span className="font-medium text-slate-700">{filteredLogos.length}</span> results
              </p>

              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 disabled:opacity-50 transition-all">
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1">
                  <button className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow-sm">
                    1
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
      <LogoFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        logo={selectedLogo}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      {/* VIEW DIALOG */}
      <LogoViewDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        logo={selectedLogo}
      />

      {/* DELETE DIALOG */}
      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Partner Logo"
        itemName={selectedLogo ? `Logo #${selectedLogo.id}` : "Logo"}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}