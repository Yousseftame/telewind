import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Eye,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DataTable,
  Column,
  editAction,
  deleteAction,
} from "@/components/shared/DataTable";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { Event } from "@/services/types";
import { getTranslation } from "@/utils/formDataHelpers";
import EventFormDialog from "./EventFormDialog";
import EventViewDialog from "./EventViewDialog";
import { useEventCRUD } from "./useEventCRUD";

// Supported languages for events
type Language = "en" | "ar" | "tw" | "ch";

export default function AdminEvents() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [searchTitle, setSearchTitle] = useState("");

  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [viewEventId, setViewEventId] = useState<number | null>(null);

  const isManager = true; // Same pattern as AdminCate

  const {
    items: events,
    isLoading,
    useItem,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useEventCRUD();

  // Fetch single event for view dialog
  const { data: viewEvent, isLoading: isLoadingView } = useItem(
    viewEventId,
    showViewDialog
  );

  // Helper to get translation for current language
  const getEventTranslation = (event: Event) => {
    return getTranslation(event, selectedLanguage);
  };

  // Sort events (newest ID first, like categories)
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => b.id - a.id);
  }, [events]);

  // Simple helper to strip HTML tags for table display of details
  const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "");

  const columns: Column<Event>[] = [
    {
      key: "date",
      label: "Date",
      sortable: true,
    },
    {
      key: "type",
      label: "Type",
      sortable: true,
    },
    {
      key: "title" as keyof Event,
      label: "Title",
      sortable: true,
      render: (_, event) => getEventTranslation(event).title || "-",
    },
    {
      key: "location" as keyof Event,
      label: "Location",
      render: (_, event) => getEventTranslation(event).location || "-",
    },
    {
      key: "description" as keyof Event,
      label: "Description",
      render: (_, event) => getEventTranslation(event).description || "-",
    },
    {
      key: "details" as keyof Event,
      label: "Details",
      render: (_, event) => {
        const details = getEventTranslation(event).details || "";
        const text = stripHtml(details);
        return text.length > 80 ? `${text.slice(0, 80)}...` : text || "-";
      },
    },
  ];

  const actions = [
    {
      label: "View",
      icon: <Eye className="h-4 w-4" />,
      onClick: (event: Event) => {
        setViewEventId(event.id);
        setShowViewDialog(true);
      },
    },
    editAction<Event>((event) => {
      setSelectedEvent(event);
      setShowFormDialog(true);
    }),
    deleteAction<Event>(
      (event) => {
        setSelectedEvent(event);
        setShowDeleteDialog(true);
      },
      () => isManager
    ),
  ];

  const handleFormSubmit = (data: any) => {
    if (selectedEvent) {
      updateMutation.mutate(
        { id: selectedEvent.id, data },
        {
          onSuccess: () => {
            setShowFormDialog(false);
            setSelectedEvent(null);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setShowFormDialog(false);
          setSelectedEvent(null);
        },
      });
    }
  };

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
                  <Calendar className="h-6 w-6 text-indigo-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Events Management
                </h1>
              </div>
              <p className="text-slate-500 ml-14">
                Manage your events with multi-language support
              </p>
            </div>

            {isManager && (
              <Button
                className="rounded-xl w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 px-6"
                size="lg"
                onClick={() => {
                  setSelectedEvent(null);
                  setShowFormDialog(true);
                }}
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Event
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
                <TabsTrigger
                  value="ch"
                  className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
                >
                  CH Chinese
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* SEARCH INPUT */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search events..."
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
                  Total Events
                </span>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
                  {sortedEvents.length}
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
                data={sortedEvents}
                columns={columns}
                loading={isLoading}
                actions={actions}
                searchable={false} // disabled your old search
                showActionsColumn={isManager}
                emptyMessage="No events found."
              />
            </div>

            {/* Custom Pagination Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-700">1-10</span>{" "}
                of{" "}
                <span className="font-medium text-slate-700">
                  {sortedEvents.length}
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
      <EventFormDialog
        open={showFormDialog}
        onOpenChange={setShowFormDialog}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        event={selectedEvent}
      />

      {/* DELETE DIALOG */}
      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => {
          if (selectedEvent) {
            deleteMutation.mutate(selectedEvent.id, {
              onSuccess: () => setShowDeleteDialog(false),
            });
          }
        }}
        title="Delete Event"
        itemName={
          selectedEvent
            ? getEventTranslation(selectedEvent).title || "Event"
            : ""
        }
        isDeleting={deleteMutation.isPending}
      />

      {/* VIEW DIALOG */}
      <EventViewDialog
        open={showViewDialog}
        onOpenChange={(open) => {
          setShowViewDialog(open);
          if (!open) setViewEventId(null);
        }}
        event={viewEvent || null}
        isLoading={isLoadingView}
      />
    </div>
  );
}
