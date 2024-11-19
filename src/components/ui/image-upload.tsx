import React from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Image, Upload } from "lucide-react";
import type { UploadedFile, ImageUploadProps } from "@/types/types";

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onUpload, 
  maxFiles = 4, 
  accept = "image/*,video/*",
  maxSize = 5242880 // 5MB
}) => {
  const [files, setFiles] = React.useState<UploadedFile[]>([]);
  const [error, setError] = React.useState<string>("");

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newFiles = acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      }) as UploadedFile
    );

    setFiles(prev => [...prev, ...newFiles]);
    onUpload([...files, ...newFiles]);
    setError("");
  }, [files, maxFiles, onUpload]);

  const removeFile = (index: number) => {
    const newFiles = [...files];
    URL.revokeObjectURL(files[index].preview);
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onUpload(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'video/*': []
    },
    maxSize,
    multiple: true
  });

  React.useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
        } transition-colors cursor-pointer`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload className="w-8 h-8 text-gray-400" />
          <p className="text-sm text-gray-600">
            {isDragActive ? (
              "Drop files here"
            ) : (
              <>
                Drag & drop files here, or click to select
                <br />
                <span className="text-xs">
                  Supports: {accept.replace('/*', '')} (Max {maxFiles} files, {maxSize / 1048576}MB each)
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {files.map((file, index) => (
            <div key={file.preview} className="relative group">
              {file.type.startsWith('image/') ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow
                         opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="text-xs mt-1 truncate">{file.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;