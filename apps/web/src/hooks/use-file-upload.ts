import { useState } from 'react';

export type UploadType = 'election' | 'candidate';

export const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File, type: UploadType) => {
    const formData = new FormData();
    formData.append('photo', file);

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/ajax/uploads/${type}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      setIsLoading(false);
      return response;
    } catch (err) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof err.message === 'string'
      ) {
        setError(err.message);
      }

      setIsLoading(false);
      throw err;
    }
  };

  return { uploadFile, isLoading, error };
};
