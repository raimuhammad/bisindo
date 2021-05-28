import { useCallback, useRef, useState } from "react";
import * as React from "react";

type UseUploadFileProps = {
  onFileChange?(e: File): void;
  onUrlChange?(e: string): void;
};
const useFileEffect = ({
  file,
  onUrlChange,
  onFileChange,
}: UseUploadFileProps & {
  file: null | File;
}) => {
  React.useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      if (onUrlChange) onUrlChange(url);
      if (onFileChange) onFileChange(file);
    }
  }, [file]);
};

export function useUploadFile({
  onFileChange,
  onUrlChange,
}: UseUploadFileProps) {
  const [file, setFile] = useState<File | null>(null);
  useFileEffect({
    file,
    onFileChange,
    onUrlChange,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const onInputChange = useCallback((e: any) => {
    const files = e.target.files;
    if (files && files.length) {
      setFile(files[0]);
    }
  }, []);
  const onAnyNodeClick = (e: any) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return {
    onInputChange,
    onAnyNodeClick,
    setFile,
    file,
    inputRef,
  };
}
