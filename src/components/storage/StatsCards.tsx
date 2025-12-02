import { HardDrive, Files, Upload, Activity } from "lucide-react";
import { formatFileSize, mockStats } from "@/lib/mock-data";

export function StatsCards() {
  const stats = [
    {
      label: "Total Files",
      value: mockStats.totalFiles.toString(),
      icon: Files,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Storage Used",
      value: formatFileSize(mockStats.usedQuota),
      icon: HardDrive,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Uploads Today",
      value: "24",
      icon: Upload,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      label: "API Requests",
      value: "1.2k",
      icon: Activity,
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-xl p-4 animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
