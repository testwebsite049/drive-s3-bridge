import { useState } from "react";
import { 
  Shield, 
  Bell, 
  Globe, 
  Trash2, 
  RefreshCw,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export function SettingsView() {
  const [notifications, setNotifications] = useState(true);
  const [publicAccess, setPublicAccess] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  return (
    <div className="space-y-6 max-w-2xl animate-fade-in">
      {/* Google Account Connection */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Google Account</h3>
            <p className="text-sm text-muted-foreground">Connect your Google account for Drive access</p>
          </div>
        </div>
        
        <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg flex items-start gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Not connected</p>
            <p className="text-sm text-muted-foreground">
              Connect your Google account to enable file storage and sync.
            </p>
          </div>
        </div>

        <Button variant="glow">
          Connect Google Account
        </Button>
      </div>

      {/* Preferences */}
      <div className="bg-card border border-border rounded-xl divide-y divide-border">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Get notified about uploads and deletions</p>
            </div>
          </div>
          <Switch 
            checked={notifications} 
            onCheckedChange={setNotifications}
          />
        </div>
        
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">Public File Access</p>
              <p className="text-sm text-muted-foreground">Allow files to be accessed via public URLs</p>
            </div>
          </div>
          <Switch 
            checked={publicAccess} 
            onCheckedChange={setPublicAccess}
          />
        </div>
        
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">Auto Sync</p>
              <p className="text-sm text-muted-foreground">Automatically sync changes with Google Drive</p>
            </div>
          </div>
          <Switch 
            checked={autoSync} 
            onCheckedChange={setAutoSync}
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card border border-destructive/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">Irreversible actions</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => toast.error("This action requires confirmation")}
          >
            <Trash2 className="w-4 h-4" />
            Delete All Files
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => toast.error("This action requires confirmation")}
          >
            <Shield className="w-4 h-4" />
            Disconnect Google Account
          </Button>
        </div>
      </div>
    </div>
  );
}
