'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ImageUpload from './components/shared/ImageUpload';
import CategoryFormDialog from './pages/admin/AdminCate/CategoryFormDialog';

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
    setError('');
    
    if (newFile && newFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
    }
  };

  const handleSubmit = () => {
    if (!file) {
      setError('Please select an image');
      return;
    }
    console.log('File selected:', file.name, file.size);
    // Handle file upload here
  };

  const handleCategorySubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      console.log('Category data:', data);
      // Handle form submission here (e.g., API call)
      // await submitCategory(data);
      setDialogOpen(false);
    } catch (error) {
      console.error('Error submitting category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Category Management</h1>
          <p className="text-muted-foreground">Manage your categories with images and multi-language support</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <Button onClick={() => setDialogOpen(true)}>
            Add New Category
          </Button>

          <ImageUpload
            label="Profile Picture"
            id="profile-image"
            onFileChange={handleFileChange}
            error={error}
            required
          />

          <div className="mt-6 flex gap-3">
            <Button onClick={handleSubmit}>Upload</Button>
            <Button variant="outline" onClick={() => setFile(null)}>
              Clear
            </Button>
          </div>

          {file && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Selected:</span> {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            </div>
          )}
        </div>
      </div>

      <CategoryFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCategorySubmit}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}
