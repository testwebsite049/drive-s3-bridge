import { Cloud, FolderOpen, HardDrive, Settings, Upload, Database, Key } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { formatFileSize, mockStats } from "@/lib/mock-data";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onUploadClick: () => void;
}

export function Sidebar({ activeView, onViewChange, onUploadClick }: SidebarProps) {
  const usagePercent = (mockStats.usedQuota / mockStats.maxQuota) * 100;

  const navItems = [
    { id: "all-files", label: "All Files", icon: HardDrive },
    { id: "folders", label: "Folders", icon: FolderOpen },
    { id: "api", label: "API Access", icon: Database },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center glow-effect">
            <Cloud className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">CloudDrive</h1>
            <p className="text-xs text-muted-foreground">S3-Like Storage</p>
          </div>
        </div>
      </div>

      {/* Upload Button */}
      <div className="p-4">
        <Button 
          variant="glow" 
          className="w-full" 
          onClick={onUploadClick}
        >
          <Upload className="w-4 h-4" />
          Upload Files
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  activeView === item.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Storage Usage */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Storage</span>
            <span className="text-foreground font-medium">
              {formatFileSize(mockStats.usedQuota)} / {formatFileSize(mockStats.maxQuota)}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {usagePercent.toFixed(1)}% of storage used
          </p>
        </div>
      </div>

      {/* API Key Hint */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 text-primary text-sm font-medium mb-1">
            <Key className="w-4 h-4" />
            Google Drive API
          </div>
          <p className="text-xs text-muted-foreground">
            Connect your Google account to enable file sync.
          </p>
        </div>
      </div>
    </aside>
  );
}
