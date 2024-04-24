import { UploadType, useFileUpload } from '@/hooks/use-file-upload';
import { ChangeEventHandler, ReactNode, useCallback, useRef } from 'react';

type FileUploaderProps = {
  type: UploadType;
  onUploadComplete?: (fileName: string) => void;
  children?: ReactNode;
};

export const FileUploader = ({
  type,
  onUploadComplete,
  children,
}: FileUploaderProps) => {
  const { uploadFile, isLoading, error } = useFileUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) => {
      if (!event.target.files) return;

      const file = event.target.files[0];
      if (!file) return;

      const result = await uploadFile(file, type);
      const resultData = (await result.json()) as { fileName: string };

      onUploadComplete?.(resultData.fileName);
    },
    [],
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div>
      <input
        type="file"
        onChange={handleUpload}
        ref={inputRef}
        accept="image/*"
        className="hidden"
      />

      {/* TODO: uploading state */}
      <div onClick={handleClick}>{children}</div>
    </div>
  );
};

export default FileUploader;
