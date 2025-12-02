import { Copy, Terminal, Key, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const endpoints = [
  {
    method: "POST",
    path: "/api/upload",
    description: "Upload a file to storage",
    example: `curl -X POST https://api.clouddrive.io/upload \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.pdf"`,
  },
  {
    method: "GET",
    path: "/api/files",
    description: "List all files",
    example: `curl https://api.clouddrive.io/files \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    method: "GET",
    path: "/api/files/:id",
    description: "Download a specific file",
    example: `curl https://api.clouddrive.io/files/abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -o downloaded_file.pdf`,
  },
  {
    method: "DELETE",
    path: "/api/files/:id",
    description: "Delete a file",
    example: `curl -X DELETE https://api.clouddrive.io/files/abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    method: "GET",
    path: "/api/files/:id/meta",
    description: "Get file metadata",
    example: `curl https://api.clouddrive.io/files/abc123/meta \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
];

const methodColors: Record<string, string> = {
  GET: "bg-emerald-500/10 text-emerald-400",
  POST: "bg-blue-500/10 text-blue-400",
  DELETE: "bg-red-500/10 text-red-400",
  PUT: "bg-amber-500/10 text-amber-400",
};

export function ApiAccessView() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* API Key Section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Key className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">API Key</h3>
            <p className="text-sm text-muted-foreground">Use this key to authenticate API requests</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 p-3 bg-muted/50 rounded-lg font-mono text-sm text-foreground">
            sk_live_••••••••••••••••••••••••••••••••
          </div>
          <Button variant="outline" onClick={() => toast.info("Connect Google Drive to generate API key")}>
            <Copy className="w-4 h-4" />
            Copy
          </Button>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">API Endpoints</h3>
          </div>
        </div>
        <div className="divide-y divide-border">
          {endpoints.map((endpoint) => (
            <div key={endpoint.path} className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${methodColors[endpoint.method]}`}>
                  {endpoint.method}
                </span>
                <code className="text-sm font-mono text-foreground">{endpoint.path}</code>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{endpoint.description}</p>
              <div className="relative group">
                <pre className="p-3 bg-muted/50 rounded-lg text-xs font-mono text-muted-foreground overflow-x-auto">
                  {endpoint.example}
                </pre>
                <button
                  onClick={() => copyToClipboard(endpoint.example)}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documentation Link */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-between">
        <div>
          <h4 className="font-medium text-foreground">Need more help?</h4>
          <p className="text-sm text-muted-foreground">Check out our API documentation for detailed guides.</p>
        </div>
        <Button variant="outline">
          <ExternalLink className="w-4 h-4" />
          View Docs
        </Button>
      </div>
    </div>
  );
}
