import { FolderOpen, Plus, MoreVertical, Trash2, Edit2 } from "lucide-react";
import { mockFolders } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function FoldersView() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Folders</h2>
          <p className="text-sm text-muted-foreground">Organize your files into folders</p>
        </div>
        <Button variant="glow" onClick={() => toast.info("Create folder feature coming soon")}>
          <Plus className="w-4 h-4" />
          New Folder
        </Button>
      </div>

      {/* Folder Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockFolders.map((folder, index) => (
          <div
            key={folder.id}
            className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all duration-200 cursor-pointer group animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FolderOpen className="w-6 h-6 text-primary" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2">
                    <Edit2 className="w-4 h-4" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h3 className="font-medium text-foreground mb-1">{folder.name}</h3>
            <p className="text-sm text-muted-foreground">
              {folder.fileCount} files
            </p>
          </div>
        ))}

        {/* Add New Folder Card */}
        <button
          onClick={() => toast.info("Create folder feature coming soon")}
          className="bg-card/50 border-2 border-dashed border-border rounded-xl p-4 hover:border-primary/50 hover:bg-card transition-all duration-200 flex flex-col items-center justify-center min-h-[140px]"
        >
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
            <Plus className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-muted-foreground">Create Folder</p>
        </button>
      </div>
    </div>
  );
}
