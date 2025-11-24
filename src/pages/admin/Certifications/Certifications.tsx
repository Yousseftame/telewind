import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import {
  DataTable,
  Column,
  deleteAction,
  editAction,
} from "@/components/shared/DataTable";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { CertificationFormDialog } from "./CertificationFormDialog";
import { CertificationViewDialog } from "./CertificationViewDialog";
import { useCertificationCRUD } from "./useCertificationCRUD";
import { Certification } from "@/services/types";
import { getTranslation } from "@/utils/formDataHelpers";

export default function Certifications() {
  const {
    items: certifications,
    isLoading,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useCertificationCRUD();

  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [viewCertId, setViewCertId] = useState<number | null>(null);
  const [certToDelete, setCertToDelete] = useState<Certification | null>(null);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"en" | "ar" | "tw" | "ch">("en");
  const [searchTitle, setSearchTitle] = useState("");

  // Handlers
  const handleAdd = () => {
    setSelectedCert(null);
    setShowFormDialog(true);
  };

  const handleEdit = (cert: Certification) => {
    setSelectedCert(cert);
    setShowFormDialog(true);
  };

  const handleView = (cert: Certification) => {
    setViewCertId(cert.id);
    setShowViewDialog(true);
  };

  const handleDeleteClick = (cert: Certification) => {
    setCertToDelete(cert);
    setShowDeleteDialog(true);
  };

  const handleFormSubmit = async (data: any) => {
    if (selectedCert) {
      await updateMutation.mutateAsync({ id: selectedCert.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    setShowFormDialog(false);
  };

  const handleConfirmDelete = async () => {
    if (certToDelete) {
      await deleteMutation.mutateAsync(certToDelete.id);
      setShowDeleteDialog(false);
      setCertToDelete(null);
    }
  };

  // Sort certifications (newest first)
  const sortedCertifications = useMemo(() => {
    return [...certifications].sort((a, b) => b.id - a.id);
  }, [certifications]);

  // Table columns
  const columns: Column<Certification>[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
    {
      key: "image",
      label: "Image",
      render: (
        _,
        cert // Use second param (cert), ignore first (_)
      ) =>
        cert.image ? (
          <img
            src={cert.image}
            alt="Certification"
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          "-"
        ),
    },
    {
      key: "title" as keyof Certification, // Use any valid key, we ignore the value anyway
      label: "Title",
      render: (_, cert) => {
        // Use second param (cert)
        try {
          const translation = getTranslation(cert, selectedLang);
          return translation?.title || "-";
        } catch {
          return "-";
        }
      },
    },
  ];
  const viewCert = viewCertId
    ? sortedCertifications.find((c) => c.id === viewCertId)
    : null;

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
                  <Award className="h-6 w-6 text-indigo-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Certifications
                </h1>
              </div>
              <p className="text-slate-500 ml-14">Manage your certifications</p>
            </div>

            <Button
              className="rounded-xl w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 px-6"
              size="lg"
              onClick={handleAdd}
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Certification
            </Button>
          </div>

          {/* CONTROLS BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            {/* LANGUAGE TABS WITH FLAGS */}
            <Tabs
              value={selectedLang}
              onValueChange={(v) => setSelectedLang(v as "en" | "ar" | "tw" | "ch")}
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
                <TabsTrigger
                  value="ch"
                  className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
                >
                  ch Chinese
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* SEARCH INPUT */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search certifications..."
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
                  Total Certifications
                </span>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
                  {sortedCertifications.length}
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
                data={sortedCertifications}
                loading={isLoading}
                actions={[
                  { label: "View", onClick: handleView },
                  editAction(handleEdit),
                  deleteAction(handleDeleteClick),
                ]}
                searchable={false} // disabled old search
                showActionsColumn={true}
                emptyMessage="No certifications found."
              />
            </div>

            {/* Custom Pagination Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-700">1-10</span>{" "}
                of{" "}
                <span className="font-medium text-slate-700">
                  {sortedCertifications.length}
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
      <CertificationFormDialog
        open={showFormDialog}
        onOpenChange={setShowFormDialog}
        onSubmit={handleFormSubmit}
        certification={selectedCert}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      {/* VIEW DIALOG */}
      <CertificationViewDialog
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
        certification={viewCert || null}
      />

      {/* DELETE DIALOG */}
      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Delete Certification"
        itemName={
          certToDelete
            ? getTranslation(certToDelete, "en")?.title || "Certification"
            : "Certification"
        }
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
