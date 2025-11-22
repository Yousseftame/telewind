import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye } from "lucide-react";
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
type Language = "en" | "ar" | "tw";

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
    <div className="flex min-h-screen bg-background">
      {/* MAIN CONTENT */}
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 overflow-x-hidden">
        <div className="w-full space-y-6">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Events Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage your events with multi-language support
              </p>
            </div>

            {isManager && (
              <Button
                className="rounded-full w-full md:w-auto"
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

          {/* LANGUAGE TABS */}
          <Tabs
            value={selectedLanguage}
            onValueChange={(value) => setSelectedLanguage(value as Language)}
          >
            <TabsList>
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="ar">العربية</TabsTrigger>
              <TabsTrigger value="tw">Taiwan</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* TABLE */}
          <div className="w-full overflow-x-auto">
            <DataTable
              data={sortedEvents}
              columns={columns}
              loading={isLoading}
              searchable
              searchValue={searchTitle}
              onSearchChange={setSearchTitle}
              searchPlaceholder="Search events..."
              showActionsColumn={isManager}
              actions={actions}
              pagination={{
                pageNumber: 1,
                pageSize: 10,
                totalPages: 1,
                totalRecords: sortedEvents.length,
                onPageChange: () => {},
                onPageSizeChange: () => {},
              }}
              emptyMessage="No events found."
            />
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
          selectedEvent ? getEventTranslation(selectedEvent).title || "Event" : ""
        }
        isDeleting={deleteMutation.isPending}
      />

      {/* VIEW DIALOG */}
      <EventViewDialog
        open={showViewDialog}
        onOpenChange={(open) => {
          setShowViewDialog(open);
          if (!open) {
            setViewEventId(null);
          }
        }}
        event={viewEvent || null}
        isLoading={isLoadingView}
      />
    </div>
  );
}