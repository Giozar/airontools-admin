import { useState } from 'react';
import uploadFile from '../services/fileUpload/fileUpload.service';

const useFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileName, setFileName] = useState('No hay archivo seleccionado');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    } else setFileName('No hay archivo seleccionado');
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const url = await uploadFile(selectedFile);
      setFileUrl(url);
    }
  };

  return {
    selectedFile,
    fileUrl,
    fileName,
    handleFileSelect,
    handleFileUpload,
  };
};

export default useFileUpload;
