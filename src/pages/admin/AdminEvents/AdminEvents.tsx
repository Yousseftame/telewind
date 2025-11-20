import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable, Column, editAction, deleteAction } from "@/components/shared/DataTable";
import EventFormDialog from "./EventFormDialog";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { useEventCRUD } from "./useEventCRUD";
import { Event } from "@/services/types";
import { getTranslation } from "@/utils/formDataHelpers";

export default function AdminEvents() {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Events Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your events with multi-language support
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedEvent(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        data={events}
        columns={columns}
        loading={isLoading}
        searchable
        searchPlaceholder="Search events..."
        showActionsColumn
        actions={actions}
      />

      {/* Form Dialog */}
      <EventFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        event={selectedEvent}
      />

      {/* Delete Dialog */}
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Event"
        itemName={eventToDelete ? (getTranslation(eventToDelete, "en")?.title || "Event") : ""}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
