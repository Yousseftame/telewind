import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Megaphone,
  Plus,
  Search,
} from "lucide-react";
import {
  DataTable,
  Column,
  editAction,
  deleteAction,
} from "@/components/shared/DataTable";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { Announcement } from "@/services/types";
import { useAnnouncementCRUD } from "./useAnnouncementCRUD";
import { AnnouncementFormDialog } from "./AnnouncementFormDialog";
import { AnnouncementViewDialog } from "./AnnouncementViewDialog";
import { getTranslation } from "@/utils/formDataHelpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Announcements() {
  const { items, isLoading, createMutation, updateMutation, deleteMutation } =
    useAnnouncementCRUD();

  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [currentLang, setCurrentLang] = useState<"en" | "ar" | "fr" | "de">("en");
  const [searchTitle, setSearchTitle] = useState("");

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
      render: (_, announcement) => announcement.id, // استخدم التاني
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
      key: "title" as keyof Announcement, // غيّر الـ key لأنك بتكرر "type"
      label: "Title",
      sortable: false,
      render: (_, announcement) => {
        const translation = getTranslation(announcement, currentLang);
        return translation?.title || "-";
      },
    },
    {
      key: "description" as keyof Announcement, // غيّر الـ key لأنك بتكرر "type"
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
      return (
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
      );
    }
    return b.id - a.id;
  });

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
                  <Megaphone className="h-6 w-6 text-indigo-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Announcements
                </h1>
              </div>
              <p className="text-slate-500 ml-14">
                Manage announcements with multi-language support
              </p>
            </div>

            <Button
              onClick={handleCreate}
              className="rounded-xl w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 px-6 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Announcement
            </Button>
          </div>

          {/* CONTROLS BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            {/* LANGUAGE TABS WITH FLAGS */}
            <Tabs
              value={currentLang}
              onValueChange={(v) => setCurrentLang(v as "en" | "ar" | "fr" | "de")}
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
                placeholder="Search announcements..."
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
                  Total Announcements
                </span>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
                  {sortedItems.length}
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
              <DataTable<Announcement>
                columns={columns}
                data={sortedItems}
                actions={actions}
                loading={isLoading}
                searchable={false} // disable old search
                showActionsColumn={true}
                emptyMessage="No announcements found."
              />
            </div>

            {/* Custom Pagination Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-700">1-10</span>{" "}
                of{" "}
                <span className="font-medium text-slate-700">
                  {sortedItems.length}
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
      <AnnouncementFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        announcement={selectedAnnouncement}
        mode={formMode}
      />

      {/* VIEW DIALOG */}
      <AnnouncementViewDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        announcement={selectedAnnouncement}
      />

      {/* DELETE DIALOG */}
      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Announcement"
        itemName={
          selectedAnnouncement
            ? getTranslation(selectedAnnouncement, "en")?.title
            : ""
        }
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
