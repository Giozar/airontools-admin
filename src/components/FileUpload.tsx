import { useEffect } from "react";
import useFileUpload from "../hooks/useFileUpload";

export default function FileUpload ({setImageUrl}: {setImageUrl?: React.Dispatch<React.SetStateAction<string>>}) {
  const { fileUrl, fileName, handleFileSelect, handleFileUpload } = useFileUpload();

  useEffect(() => {
    if (setImageUrl)
        setImageUrl(fileUrl);
  }, [fileUrl])

  return (
    <div>
        <label htmlFor="file-upload" className="custom-file-upload">
            Seleccionar archivo
        </label>
        <span>{fileName}</span>
        <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileSelect} />
        <button type="button" onClick={handleFileUpload}>Subir imagen</button>
        {fileUrl && <p>Ver foto: <a target="_blank" href={fileUrl}>{fileUrl}</a></p>}
    </div>
  );
}
