import { useState, useCallback } from "react";
import { X, Upload, File, CheckCircle2, AlertCircle, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/lib/mock-data";
import { toast } from "sonner";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QueuedFile {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [queuedFiles, setQueuedFiles] = useState<QueuedFile[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      addFiles(files);
    }
  }, []);

  const addFiles = (files: File[]) => {
    const newFiles: QueuedFile[] = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      status: 'pending',
    }));
    setQueuedFiles((prev) => [...prev, ...newFiles]);
  };

  const simulateUpload = () => {
    if (queuedFiles.length === 0) return;

    queuedFiles.forEach((qf, index) => {
      if (qf.status === 'pending') {
        setTimeout(() => {
          setQueuedFiles((prev) =>
            prev.map((f) =>
              f.id === qf.id ? { ...f, status: 'uploading' } : f
            )
          );

          // Simulate progress
          let progress = 0;
          const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
              progress = 100;
              clearInterval(interval);
              setQueuedFiles((prev) =>
                prev.map((f) =>
                  f.id === qf.id ? { ...f, progress: 100, status: 'complete' } : f
                )
              );
              toast.success(`${qf.file.name} uploaded successfully`);
            } else {
              setQueuedFiles((prev) =>
                prev.map((f) =>
                  f.id === qf.id ? { ...f, progress } : f
                )
              );
            }
          }, 200);
        }, index * 500);
      }
    });
  };

  const removeFile = (id: string) => {
    setQueuedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-card border border-border rounded-xl shadow-elevated animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Cloud className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Upload Files</h2>
              <p className="text-sm text-muted-foreground">Drag & drop or browse</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200",
              isDragging
                ? "border-primary bg-primary/5 border-glow"
                : "border-border hover:border-muted-foreground/50"
            )}
          >
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className={cn(
              "w-12 h-12 mx-auto mb-4 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground"
            )} />
            <p className="text-foreground font-medium mb-1">
              {isDragging ? "Drop files here" : "Drag files here"}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse your files
            </p>
          </div>

          {/* File Queue */}
          {queuedFiles.length > 0 && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {queuedFiles.map((qf) => (
                <div
                  key={qf.id}
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                >
                  <File className="w-5 h-5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {qf.file.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(qf.file.size)}
                      </span>
                      {qf.status === 'uploading' && (
                        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-200"
                            style={{ width: `${qf.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {qf.status === 'complete' && (
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  )}
                  {qf.status === 'error' && (
                    <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                  )}
                  {(qf.status === 'pending' || qf.status === 'uploading') && (
                    <button
                      onClick={() => removeFile(qf.id)}
                      className="w-6 h-6 flex items-center justify-center rounded hover:bg-muted transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="glow" 
            className="flex-1"
            onClick={simulateUpload}
            disabled={queuedFiles.length === 0 || queuedFiles.every(f => f.status === 'complete')}
          >
            Upload {queuedFiles.filter(f => f.status === 'pending').length > 0 && 
              `(${queuedFiles.filter(f => f.status === 'pending').length})`}
          </Button>
        </div>
      </div>
    </div>
  );
}
