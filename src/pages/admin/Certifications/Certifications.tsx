import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { DataTable, Column, deleteAction, editAction } from "@/components/shared/DataTable";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { CertificationFormDialog } from "./CertificationFormDialog";
import { CertificationViewDialog } from "./CertificationViewDialog";
import { useCertificationCRUD } from "./useCertificationCRUD";
import { Certification } from "@/services/types";
import { getTranslation } from "@/utils/formDataHelpers";

export default function Certifications() {
  const { items: certifications, isLoading, createMutation, updateMutation, deleteMutation } = useCertificationCRUD();

  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [viewCertId, setViewCertId] = useState<number | null>(null);
  const [certToDelete, setCertToDelete] = useState<Certification | null>(null);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"en" | "ar" | "tw">("en");

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
      render: (cert) =>
        cert.image ? (
          <img src={cert.image} alt="Certification" className="w-16 h-16 object-cover rounded" />
        ) : (
          "-"
        ),
    },
    {
      key: "title" as keyof Certification,
      label: "Title",
      render: (cert) => {
        try {
          const translation = getTranslation(cert, selectedLang);
          return translation?.title || "-";
        } catch {
          return "-";
        }
      },
    },
  ];

  const viewCert = viewCertId ? certifications.find((c) => c.id === viewCertId) : null;

  return (
    <div className="flex min-h-screen bg-background">
  {/* MAIN CONTENT */}
  <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 overflow-x-hidden">
    <div className="w-full space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Certifications</h1>
          <p className="text-muted-foreground mt-1">
            Manage your certifications
          </p>
        </div>

        <Button
          className="rounded-full w-full md:w-auto"
          size="lg"
          onClick={handleAdd}
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Certification
        </Button>
      </div>

      {/* LANGUAGE TABS */}
      <Tabs
        value={selectedLang}
        onValueChange={(v) => setSelectedLang(v as "en" | "ar" | "tw")}
      >
        <TabsList>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ar">Arabic</TabsTrigger>
          <TabsTrigger value="tw">Taiwan</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* TABLE */}
      <div className="w-full overflow-x-auto">
        <DataTable
          columns={columns}
          data={certifications}
          loading={isLoading}
          actions={[
            {
              label: "View",
              onClick: handleView,
            },
            editAction(handleEdit),
            deleteAction(handleDeleteClick),
          ]}
          searchable
          searchPlaceholder="Search certifications..."
          showActionsColumn={true}
        />
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