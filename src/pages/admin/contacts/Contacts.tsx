import { useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquare, Search } from "lucide-react";

import { Column, DataTable, deleteAction } from "@/components/shared/DataTable";
import { Contact } from "@/services/types";
import { useContactCRUD } from "./useContactCRUD";
import { ContactViewDialog } from "./ContactViewDialog";
import { DeleteDialog } from "@/components/shared/DeleteDialog";

export default function Contacts() {
  const { items, isLoading, deleteMutation } = useContactCRUD();
  console.log(items);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  // Handle View
  const handleView = (contact: Contact) => {
    setSelectedContact(contact);
    setViewOpen(true);
  };

  // Handle Delete Click
  const handleDeleteClick = (contact: Contact) => {
    setSelectedContact(contact);
    setDeleteOpen(true);
  };

  // Handle Delete Confirm
  const handleDeleteConfirm = () => {
    if (selectedContact) {
      deleteMutation.mutate(selectedContact.id, {
        onSuccess: () => {
          setDeleteOpen(false);
          setSelectedContact(null);
        },
      });
    }
  };

  // Table Columns
  const columns: Column<Contact>[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      render: (_, contact) => contact.id,
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (_, contact) => contact.name || "-",
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (_, contact) => contact.email || "-",
    },
    {
      key: "company",
      label: "Company",
      sortable: true,
      render: (_, contact) => contact.company || "-",
    },
    {
      key: "country",
      label: "Country",
      sortable: true,
      render: (_, contact) => contact.country || "-",
    },
    {
      key: "inquiry_type",
      label: "Inquiry Type",
      sortable: true,
      render: (_, contact) => {
        const inquiryType = contact.inquiry_type || "-";
        const colors: Record<string, string> = {
          product: "bg-blue-100 text-blue-700",
          technical: "bg-purple-100 text-purple-700",
          sales: "bg-green-100 text-green-700",
          partnership: "bg-orange-100 text-orange-700",
          other: "bg-gray-100 text-gray-700",
        };
        const colorClass = colors[inquiryType.toLowerCase()] || "bg-gray-100 text-gray-700";
        
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
            {inquiryType.charAt(0).toUpperCase() + inquiryType.slice(1)}
          </span>
        );
      },
    },
    {
      key: "message",
      label: "Message",
      sortable: false,
      render: (_, contact) => {
        const message = contact.message || "-";
        return (
          <div className="max-w-xs truncate" title={message}>
            {message.length > 50 ? `${message.substring(0, 50)}...` : message}
          </div>
        );
      },
    },
  ];

  // Table Actions
  const actions = [
    {
      label: "View",
      onClick: handleView,
    },
    deleteAction(handleDeleteClick),
  ];

  // Sort by newest first
  const sortedItems = [...items].sort((a, b) => b.id - a.id);

  // Filter by search query
  const filteredItems = sortedItems.filter((contact) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      contact.name?.toLowerCase().includes(searchLower) ||
      contact.email?.toLowerCase().includes(searchLower) ||
      contact.company?.toLowerCase().includes(searchLower) ||
      contact.country?.toLowerCase().includes(searchLower) ||
      contact.inquiry_type?.toLowerCase().includes(searchLower)
    );
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
                  <MessageSquare className="h-6 w-6 text-indigo-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Contact Messages
                </h1>
              </div>
              <p className="text-slate-500 ml-14">
                Manage contact messages and customer inquiries
              </p>
            </div>
          </div>

          {/* CONTROLS BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            {/* SEARCH INPUT */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Clear search
              </button>
            )}
          </div>

          {/* TABLE CARD */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Table Header Stats */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600">
                  Total Contacts
                </span>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
                  {filteredItems.length}
                </span>
              </div>

              {searchQuery && (
                <div className="text-sm text-slate-500">
                  Showing {filteredItems.length} of {sortedItems.length} results
                </div>
              )}
            </div>

            {/* Table Content */}
            <div className="w-full overflow-x-auto">
              <DataTable<Contact>
                columns={columns}
                data={filteredItems}
                actions={actions}
                loading={isLoading}
                searchable={false}
                showActionsColumn={true}
                emptyMessage="No contacts found."
              />
            </div>

            {/* Custom Pagination Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-700">1-{Math.min(10, filteredItems.length)}</span>{" "}
                of{" "}
                <span className="font-medium text-slate-700">
                  {filteredItems.length}
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
                </div>

                <button className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* VIEW DIALOG */}
      <ContactViewDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        contact={selectedContact}
      />

      {/* DELETE DIALOG */}
      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Contact"
        itemName={selectedContact ? selectedContact.name : ""}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}