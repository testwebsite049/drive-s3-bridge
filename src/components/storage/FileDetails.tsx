import { X, Download, Trash2, Copy, Link, Calendar, HardDrive, FileType } from "lucide-react";
import { StorageFile } from "@/types/storage";
import { formatFileSize, getFileIcon } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileDetailsProps {
  file: StorageFile;
  onClose: () => void;
}

export function FileDetails({ file, onClose }: FileDetailsProps) {
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://drive.google.com/file/d/${file.id}`);
    toast.success("URL copied to clipboard");
  };

  return (
    <div className="w-80 h-full bg-card border-l border-border flex flex-col animate-fade-in">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">File Details</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* File Preview Area */}
        <div className="aspect-video rounded-lg bg-muted/50 border border-border flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <FileType className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              {getFileIcon(file.mimeType).toUpperCase()}
            </p>
          </div>
        </div>

        {/* File Name */}
        <div>
          <h4 className="text-lg font-medium text-foreground break-all">
            {file.name}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            {file.mimeType}
          </p>
        </div>

        {/* Metadata */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <HardDrive className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Size</span>
            <span className="ml-auto font-mono text-foreground">
              {formatFileSize(file.size)}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Created</span>
            <span className="ml-auto text-foreground">
              {file.createdAt.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Modified</span>
            <span className="ml-auto text-foreground">
              {file.modifiedAt.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* File ID */}
        <div className="p-3 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              File ID
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(file.id);
                toast.success("ID copied");
              }}
              className="text-xs text-primary hover:underline"
            >
              Copy
            </button>
          </div>
          <code className="text-xs font-mono text-foreground break-all">
            {file.id}
          </code>
        </div>

        {/* URL Section */}
        <div className="p-3 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Link className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Public URL
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleCopyUrl}
          >
            <Copy className="w-4 h-4" />
            Copy URL
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button variant="glow" className="w-full">
          <Download className="w-4 h-4" />
          Download File
        </Button>
        <Button variant="outline" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
          <Trash2 className="w-4 h-4" />
          Delete File
        </Button>
      </div>
    </div>
  );
}
