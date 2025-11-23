import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable, Column, editAction, deleteAction } from "@/components/shared/DataTable";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { Announcement } from "@/services/types";
import { useAnnouncementCRUD } from "./useAnnouncementCRUD";
import { AnnouncementFormDialog } from "./AnnouncementFormDialog";
import { AnnouncementViewDialog } from "./AnnouncementViewDialog";
import { getTranslation } from "@/utils/formDataHelpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Announcements() {
  const { items, isLoading, createMutation, updateMutation, deleteMutation } = useAnnouncementCRUD();

  console.log("Announcements data:", items);
  console.log("Is loading:", isLoading);
  console.log("Items length:", items?.length); // أضف هذا



  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [currentLang, setCurrentLang] = useState<"en" | "ar" | "tw">("en");

  const handleCreate = () => {
    setFormMode("create");
    setSelectedAnnouncement(null);
    setFormOpen(true);
  };

  const handleEdit = (announcement: Announcement) => {
    setFormMode("edit");
    setSelectedAnnouncement(announcement);
    setFormOpen(true);
  };

  const handleView = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setViewOpen(true);
  };

  const handleDeleteClick = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setDeleteOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    if (formMode === "create") {
      createMutation.mutate(data, {
        onSuccess: () => setFormOpen(false),
      });
    } else if (selectedAnnouncement) {
      updateMutation.mutate(
        { id: selectedAnnouncement.id, data },
        { onSuccess: () => setFormOpen(false) }
      );
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedAnnouncement) {
      deleteMutation.mutate(selectedAnnouncement.id, {
        onSuccess: () => setDeleteOpen(false),
      });
    }
  };

  const columns: Column<Announcement>[] = [
  {
    key: "id",
    label: "ID",
    sortable: true,
    render: (_, announcement) => announcement.id,  // استخدم التاني
  },
  {
    key: "date",
    label: "Date",
    sortable: true,
    render: (_, announcement) => announcement.date || "-",
  },
  {
    key: "type",
    label: "Type",
    sortable: true,
    render: (_, announcement) => announcement.type || "-",
  },
  {
    key: "id" as keyof Announcement,  // غيّر الـ key لأنك بتكرر "type"
    label: "Title",
    sortable: false,
    render: (_, announcement) => {
      const translation = getTranslation(announcement, currentLang);
      return translation?.title || "-";
    },
  },
  {
    key: "id" as keyof Announcement,  // غيّر الـ key لأنك بتكرر "type"
    label: "Description",
    sortable: false,
    render: (_, announcement) => {
      const translation = getTranslation(announcement, currentLang);
      return translation?.description || "-";
    },
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

  // Sort by newest first
  const sortedItems = [...items].sort((a, b) => {
    if (a.creationDate && b.creationDate) {
      return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
    }
    return b.id - a.id;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground">Manage announcements with multi-language support</p>
        </div>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Announcement
        </Button>
      </div>

      <Tabs value={currentLang} onValueChange={(v) => setCurrentLang(v as "en" | "ar" | "tw")}>
        <TabsList>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ar">Arabic</TabsTrigger>
          <TabsTrigger value="tw">Taiwan</TabsTrigger>
        </TabsList>

        <TabsContent value={currentLang} className="mt-4">
          <DataTable<Announcement>
            columns={columns}
            data={sortedItems}
            actions={actions}
            loading={isLoading}
            searchable
            searchPlaceholder="Search announcements..."
          />
        </TabsContent>
      </Tabs>

      <AnnouncementFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        announcement={selectedAnnouncement}
        mode={formMode}
      />

      <AnnouncementViewDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        announcement={selectedAnnouncement}
      />

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Announcement"
        itemName={selectedAnnouncement ? getTranslation(selectedAnnouncement, "en")?.title : ""}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
