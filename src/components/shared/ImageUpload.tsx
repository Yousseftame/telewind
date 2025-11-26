'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  label: string;
  id: string;
  currentImage?: string;
  onFileChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
  accept?: string;
}

export default function ImageUpload({
  label,
  id,
  currentImage,
  onFileChange,
  error,
  required = false,
  accept = 'image/*',
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(
    currentImage || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setIsUploading(true);
        const file = acceptedFiles[0];

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          setIsUploading(false);
          onFileChange(file);
        };
        reader.readAsDataURL(file);
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept === 'image/*' ? { 'image/*': [] } : undefined,
    maxFiles: 1,
    multiple: false,
  });

  const handleRemove = () => {
    setPreview(null);
    onFileChange(null);
  };

  const handleChange = () => {
    inputElement?.click();
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>

      {preview ? (
        <div className="relative group">
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-border"
          />
          <div className="absolute inset-0 rounded-lg bg-background/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleChange}
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90 flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Change
            </button>
            {/* <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
            >
              <X className="h-4 w-4" />
            </button> */}
          </div>
          <input
            {...getInputProps()}
            id={id}
            ref={setInputElement}
          />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            'relative flex flex-col items-center justify-center min-h-40 rounded-lg border-2 border-dashed transition-all duration-200 cursor-pointer',
            isDragActive
              ? 'border-primary bg-primary/5 scale-105'
              : 'border-border/60 bg-background/40 hover:border-primary/50 hover:bg-muted/30',
            error && 'border-destructive/80'
          )}
        >
          <div className="flex flex-col items-center justify-center p-8">
            <div
              className={cn(
                'transition-transform duration-200',
                isDragActive && 'scale-110'
              )}
            >
              <Upload
                className={cn(
                  'h-12 w-12 mb-3',
                  isDragActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              <span className="font-semibold text-foreground">
                Click to upload
              </span>{' '}
              or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, WEBP up to 10MB
            </p>
          </div>
          <input {...getInputProps()} id={id} />
        </div>
      )}

      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-primary">
          <div className="animate-spin">
            <Check className="h-4 w-4" />
          </div>
          Processing...
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
