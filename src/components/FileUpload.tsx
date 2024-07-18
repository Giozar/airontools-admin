import useFileUpload from "../hooks/useFileUpload";

export default function FileUpload () {
  const { fileUrl, fileName, handleFileSelect, handleFileUpload } = useFileUpload();

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
