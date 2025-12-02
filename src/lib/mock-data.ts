import { StorageFile, StorageFolder, StorageStats } from "@/types/storage";

export const mockFiles: StorageFile[] = [
  {
    id: "1",
    name: "project-architecture.pdf",
    size: 2456000,
    mimeType: "application/pdf",
    createdAt: new Date("2024-11-28T10:30:00"),
    modifiedAt: new Date("2024-11-30T14:20:00"),
  },
  {
    id: "2",
    name: "hero-banner.png",
    size: 1234567,
    mimeType: "image/png",
    createdAt: new Date("2024-11-25T08:00:00"),
    modifiedAt: new Date("2024-11-25T08:00:00"),
  },
  {
    id: "3",
    name: "api-endpoints.json",
    size: 45678,
    mimeType: "application/json",
    createdAt: new Date("2024-11-20T16:45:00"),
    modifiedAt: new Date("2024-12-01T09:15:00"),
  },
  {
    id: "4",
    name: "database-backup.sql",
    size: 8765432,
    mimeType: "application/sql",
    createdAt: new Date("2024-11-15T22:00:00"),
    modifiedAt: new Date("2024-11-15T22:00:00"),
  },
  {
    id: "5",
    name: "user-guide.docx",
    size: 567890,
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    createdAt: new Date("2024-11-10T11:30:00"),
    modifiedAt: new Date("2024-11-29T17:45:00"),
  },
  {
    id: "6",
    name: "analytics-report.csv",
    size: 234567,
    mimeType: "text/csv",
    createdAt: new Date("2024-12-01T06:00:00"),
    modifiedAt: new Date("2024-12-01T06:00:00"),
  },
];

export const mockFolders: StorageFolder[] = [
  {
    id: "folder-1",
    name: "Documents",
    createdAt: new Date("2024-10-01T00:00:00"),
    fileCount: 12,
  },
  {
    id: "folder-2",
    name: "Images",
    createdAt: new Date("2024-10-15T00:00:00"),
    fileCount: 45,
  },
  {
    id: "folder-3",
    name: "Backups",
    createdAt: new Date("2024-11-01T00:00:00"),
    fileCount: 8,
  },
];

export const mockStats: StorageStats = {
  totalFiles: 156,
  totalSize: 1024 * 1024 * 1024 * 2.5, // 2.5 GB
  usedQuota: 1024 * 1024 * 1024 * 2.5,
  maxQuota: 1024 * 1024 * 1024 * 15, // 15 GB
};

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function getFileIcon(mimeType: string): string {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  if (mimeType.includes("pdf")) return "pdf";
  if (mimeType.includes("spreadsheet") || mimeType.includes("csv")) return "spreadsheet";
  if (mimeType.includes("document") || mimeType.includes("word")) return "document";
  if (mimeType.includes("json") || mimeType.includes("javascript") || mimeType.includes("sql")) return "code";
  if (mimeType.includes("zip") || mimeType.includes("tar") || mimeType.includes("rar")) return "archive";
  return "file";
}
