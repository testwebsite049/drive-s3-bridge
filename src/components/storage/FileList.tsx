import { useState } from "react";
import { 
  FileText, 
  Image, 
  Video, 
  Music, 
  FileJson, 
  FileSpreadsheet, 
  FileArchive,
  File,
  MoreVertical,
  Download,
  Trash2,
  Eye,
  Copy,
  CheckCircle2
} from "lucide-react";
import { StorageFile } from "@/types/storage";
import { formatFileSize, getFileIcon } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

interface FileListProps {
  files: StorageFile[];
  selectedFiles: string[];
  onSelectFile: (fileId: string) => void;
  onSelectAll: () => void;
  onFileClick: (file: StorageFile) => void;
}

const iconMap: Record<string, React.ElementType> = {
  image: Image,
  video: Video,
  audio: Music,
  pdf: FileText,
  spreadsheet: FileSpreadsheet,
  document: FileText,
  code: FileJson,
  archive: FileArchive,
  file: File,
};

export function FileList({ 
  files, 
  selectedFiles, 
  onSelectFile, 
  onSelectAll,
  onFileClick 
}: FileListProps) {
  const allSelected = files.length > 0 && selectedFiles.length === files.length;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="grid grid-cols-[auto_1fr_120px_150px_auto] gap-4 px-4 py-3 bg-muted/30 border-b border-border text-sm font-medium text-muted-foreground">
        <div className="flex items-center">
          <Checkbox 
            checked={allSelected}
            onCheckedChange={onSelectAll}
            className="border-muted-foreground/50"
          />
        </div>
        <div>Name</div>
        <div>Size</div>
        <div>Modified</div>
        <div className="w-8"></div>
      </div>

      {/* File Rows */}
      <div className="divide-y divide-border">
        {files.map((file, index) => {
          const IconComponent = iconMap[getFileIcon(file.mimeType)];
          const isSelected = selectedFiles.includes(file.id);

          return (
            <div
              key={file.id}
              className={cn(
                "grid grid-cols-[auto_1fr_120px_150px_auto] gap-4 px-4 py-3 items-center transition-colors duration-150 cursor-pointer animate-slide-up",
                isSelected ? "bg-primary/5" : "hover:bg-muted/30"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => onFileClick(file)}
            >
              <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                <Checkbox 
                  checked={isSelected}
                  onCheckedChange={() => onSelectFile(file.id)}
                  className="border-muted-foreground/50"
                />
              </div>
              <div className="flex items-center gap-3 min-w-0">
                <div className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                  getFileIcon(file.mimeType) === "image" && "bg-pink-500/10 text-pink-400",
                  getFileIcon(file.mimeType) === "pdf" && "bg-red-500/10 text-red-400",
                  getFileIcon(file.mimeType) === "code" && "bg-green-500/10 text-green-400",
                  getFileIcon(file.mimeType) === "spreadsheet" && "bg-emerald-500/10 text-emerald-400",
                  getFileIcon(file.mimeType) === "document" && "bg-blue-500/10 text-blue-400",
                  getFileIcon(file.mimeType) === "archive" && "bg-amber-500/10 text-amber-400",
                  getFileIcon(file.mimeType) === "file" && "bg-muted text-muted-foreground",
                )}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-foreground truncate">
                  {file.name}
                </span>
              </div>
              <div className="text-sm text-muted-foreground font-mono">
                {formatFileSize(file.size)}
              </div>
              <div className="text-sm text-muted-foreground">
                {file.modifiedAt.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="gap-2">
                      <Eye className="w-4 h-4" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Copy className="w-4 h-4" />
                      Copy URL
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          );
        })}
      </div>

      {files.length === 0 && (
        <div className="py-16 text-center">
          <File className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No files found</p>
        </div>
      )}
    </div>
  );
}
