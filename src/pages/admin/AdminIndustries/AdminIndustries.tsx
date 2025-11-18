import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable, Column, editAction, deleteAction } from "@/components/shared/DataTable";
import { DeleteDialog } from "@/components/shared/DeleteDialog";

// Sample project type
interface Project {
  id: number;
  title: string;
  description: string;
  task: any[];
  creationDate: string;
}

export default function AdminIndustries() {
  const navigate = useNavigate();

  // Static mock data
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, title: "Alpha Project", description: "UI mock project", task: [1, 2], creationDate: "2024-01-10" },
    { id: 2, title: "Beta Project", description: "Static example", task: [1], creationDate: "2024-02-05" },
    { id: 3, title: "Gamma Project", description: "Demo project", task: [], creationDate: "2024-02-20" },
  ]);

  const [searchTitle, setSearchTitle] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isManager = true; // Mock authentication

  // Table columns
  const columns: Column<Project>[] = [
    { key: "title", label: "Title", sortable: true },
    { key: "description", label: "Description", sortable: true },
    { key: "task", label: "Num Tasks", sortable: true, render: (tasks) => tasks?.length || 0 },
    { key: "creationDate", label: "Date Created", sortable: true, render: (date) => new Date(date).toLocaleDateString() },
  ];

  const actions = [
    editAction<Project>((project) => console.log("Edit:", project.id)),
    deleteAction<Project>(
      (project) => {
        setSelectedProject(project);
        setShowDeleteDialog(true);
      },
      () => isManager
    ),
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* MAIN CONTENT */}
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 overflow-x-hidden">
        <div className="w-full space-y-6">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Industries</h1>
              <p className="text-muted-foreground mt-1">Manage your Industries with this clean UI</p>
            </div>

            {isManager && (
              <Button className="rounded-full w-full md:w-auto" size="lg" onClick={() => console.log("Add new project")}>
                <Plus className="mr-2 h-5 w-5" />
                Add Industries
              </Button>
            )}
          </div>

          {/* TABLE */}
          <div className="w-full overflow-x-auto">
            <DataTable
              columns={columns}
              data={projects}
              loading={false}
              actions={actions}
              searchable
              searchValue={searchTitle}
              onSearchChange={setSearchTitle}
              searchPlaceholder="Search projects..."
              showActionsColumn={isManager}
              pagination={{
                pageNumber: 1,
                pageSize: 10,
                totalPages: 1,
                totalRecords: projects.length,
                onPageChange: () => {},
                onPageSizeChange: () => {},
              }}
              emptyMessage="No projects found."
            />
          </div>
        </div>
      </main>

      {/* DELETE DIALOG */}
      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => {
          if (selectedProject) setProjects((prev) => prev.filter((p) => p.id !== selectedProject.id));
          setShowDeleteDialog(false);
        }}
        title="Delete Project"
        itemName={selectedProject?.title}
        isDeleting={false}
      />
    </div>
  );
}
