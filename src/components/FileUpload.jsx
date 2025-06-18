import { useRef, useState } from "react";
import { GoPlus, GoUpload } from "react-icons/go";
import { cn } from "@/lib/utils";

export default function FileUpload({
  onFileSelect,
  acceptedTypes = ".txt,.doc,.docx,.pdf",
  className = "",
}) {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileInputChange}
        className="hidden"
      />

      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
          isDragOver
            ? "border-[var(--secondary-color)] bg-[var(--secondary-color)]/5"
            : "border-gray-300 hover:border-gray-400",
          selectedFile &&
            "border-[var(--secondary-color)] bg-[var(--secondary-color)]/5"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center gap-2">
          {selectedFile ? (
            <>
              <GoUpload className="w-6 h-6 text-[var(--secondary-color)]" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </>
          ) : (
            <>
              <GoPlus className="w-6 h-6 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  {acceptedTypes.split(",").join(", ")} files supported
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {selectedFile && (
        <button
          onClick={() => {
            setSelectedFile(null);
            onFileSelect(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
          className="text-xs text-red-600 hover:text-red-800 text-center"
        >
          Remove file
        </button>
      )}
    </div>
  );
}
