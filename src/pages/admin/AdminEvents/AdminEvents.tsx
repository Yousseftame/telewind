import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable, Column, editAction, deleteAction } from "@/components/shared/DataTable";
import EventFormDialog from "./EventFormDialog";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { useEventCRUD } from "./useEventCRUD";
import { Event } from "@/services/types";
import { getTranslation } from "@/utils/formDataHelpers";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

type Language = "en" | "ar" | "fr";



export default function AdminEvents() {

    const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

  const { items: events, isLoading, createMutation, updateMutation, deleteMutation } = useEventCRUD();

    const columns: Column<Event>[] = [
      {
        key: "id",
        label: "ID",
        sortable: true,
      },
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
        key: "id",
        label: "Title",
        render: (event) => {
          try {
            const translation = getTranslation(event, "en");
            return translation?.title || "-";
          } catch {
            return "-";
          }
        },
      },
      {
        key: "id",
        label: "Location",
        render: (event) => {
          try {
            const translation = getTranslation(event, "en");
            return translation?.location || "-";
          } catch {
            return "-";
          }
        },
      },
      // {
      //   key: "creationDate",
      //   label: "Created At",
      //   sortable: true,
      //   render: (event) => {
      //     if (!event.creationDate) return "-";
      //     return new Date(event.creationDate).toLocaleDateString();
      //   },
      // },
    ];

  const actions = [
    editAction<Event>((event) => {
      setSelectedEvent(event);
      setDialogOpen(true);
    }),
    deleteAction<Event>((event) => {
      setEventToDelete(event);
      setDeleteDialogOpen(true);
    }),
  ];

  const handleFormSubmit = (data: any) => {
    if (selectedEvent) {
      updateMutation.mutate(
        { id: selectedEvent.id, data },
        {
          onSuccess: () => {
            setDialogOpen(false);
            setSelectedEvent(null);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setDialogOpen(false);
        },
      });
    }
  };

  const handleDelete = () => {
    if (eventToDelete) {
      deleteMutation.mutate(eventToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setEventToDelete(null);
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

        <Button
          className="rounded-full w-full md:w-auto"
          size="lg"
          onClick={() => {
            setSelectedEvent(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Event
        </Button>
      </div>

      {/* LANGUAGE TABS */}
     <Tabs
  value={selectedLanguage}
  onValueChange={(value) => setSelectedLanguage(value as Language)}
>
  <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
    <TabsTrigger
      value="en"
      className="px-3 py-1.5 rounded-sm data-[state=active]:bg-background data-[state=active]:text-foreground"
    >
      English
    </TabsTrigger>

    <TabsTrigger
      value="ar"
      className="px-3 py-1.5 rounded-sm data-[state=active]:bg-background data-[state=active]:text-foreground"
    >
      العربية
    </TabsTrigger>

    <TabsTrigger
      value="fr"
      className="px-3 py-1.5 rounded-sm data-[state=active]:bg-background data-[state=active]:text-foreground"
    >
      Taiwan
    </TabsTrigger>
  </TabsList>
</Tabs>

      {/* TABLE */}
      <div className="w-full overflow-x-auto">
        <DataTable
          data={events}
          columns={columns}
          loading={isLoading}
          searchable
          searchPlaceholder="Search events..."
          showActionsColumn
          actions={actions}
          pagination={{
            pageNumber: 1,
            pageSize: 10,
            totalPages: 1,
            totalRecords: events.length,
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
    open={dialogOpen}
    onOpenChange={setDialogOpen}
    onSubmit={handleFormSubmit}
    isSubmitting={createMutation.isPending || updateMutation.isPending}
    event={selectedEvent}
  />

  {/* DELETE DIALOG */}
  <DeleteDialog
    open={deleteDialogOpen}
    onOpenChange={setDeleteDialogOpen}
    onConfirm={handleDelete}
    title="Delete Event"
    itemName={
      eventToDelete ? getTranslation(eventToDelete, "en")?.title || "Event" : ""
    }
    isDeleting={deleteMutation.isPending}
  />
</div>


  );
}
