import { useState, useMemo } from "react";
import { Sidebar } from "@/components/storage/Sidebar";
import { FileList } from "@/components/storage/FileList";
import { FileDetails } from "@/components/storage/FileDetails";
import { UploadModal } from "@/components/storage/UploadModal";
import { StatsCards } from "@/components/storage/StatsCards";
import { SearchBar } from "@/components/storage/SearchBar";
import { ApiAccessView } from "@/components/storage/ApiAccessView";
import { SettingsView } from "@/components/storage/SettingsView";
import { FoldersView } from "@/components/storage/FoldersView";
import { mockFiles } from "@/lib/mock-data";
import { StorageFile } from "@/types/storage";

const Index = () => {
  const [activeView, setActiveView] = useState("all-files");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<StorageFile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredFiles = useMemo(() => {
    if (!searchQuery) return mockFiles;
    return mockFiles.filter((file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelectFile = (fileId: string) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map((f) => f.id));
    }
  };

  const handleFileClick = (file: StorageFile) => {
    setSelectedFile(file);
  };

  const renderMainContent = () => {
    switch (activeView) {
      case "api":
        return <ApiAccessView />;
      case "settings":
        return <SettingsView />;
      case "folders":
        return <FoldersView />;
      default:
        return (
          <>
            <StatsCards />
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            <FileList
              files={filteredFiles}
              selectedFiles={selectedFiles}
              onSelectFile={handleSelectFile}
              onSelectAll={handleSelectAll}
              onFileClick={handleFileClick}
            />
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        onUploadClick={() => setIsUploadModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground">
              {activeView === "all-files" && "All Files"}
              {activeView === "folders" && "Folders"}
              {activeView === "api" && "API Access"}
              {activeView === "settings" && "Settings"}
            </h1>
            <p className="text-muted-foreground">
              {activeView === "all-files" && "Manage your files stored in Google Drive"}
              {activeView === "folders" && "Organize files into folders"}
              {activeView === "api" && "Integrate with your applications"}
              {activeView === "settings" && "Configure your storage settings"}
            </p>
          </div>

          {renderMainContent()}
        </div>

        {/* File Details Panel */}
        {selectedFile && activeView === "all-files" && (
          <FileDetails file={selectedFile} onClose={() => setSelectedFile(null)} />
        )}
      </main>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

export default Index;
