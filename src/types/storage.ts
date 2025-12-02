export interface StorageFile {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  createdAt: Date;
  modifiedAt: Date;
  downloadUrl?: string;
  thumbnailUrl?: string;
  folderId?: string;
}

export interface StorageFolder {
  id: string;
  name: string;
  parentId?: string;
  createdAt: Date;
  fileCount: number;
}

export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
}

export interface StorageStats {
  totalFiles: number;
  totalSize: number;
  usedQuota: number;
  maxQuota: number;
}
