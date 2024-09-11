import { ChangeEvent } from 'react';

interface UseFilesInputParams {
	files: File[];
	setFiles: (value: File[]) => void;
	filePreviews: string[];
	setFilePreviews: (value: string[]) => void;
	fileNames: string[];
	setFileNames: (value: string[]) => void;
}

export default function useFilesInput() {
	// Añade archivos seleccionados y actualiza sus previsualizaciones y nombres
	const selectFiles = ({
		event,
		files,
		fileNames,
		filePreviews,
		setFiles,
		setFilePreviews,
		setFileNames,
	}: UseFilesInputParams & { event: ChangeEvent<HTMLInputElement> }) => {
		if (event.target.files && event.target.files.length > 0) {
			const selectedFiles = Array.from(event.target.files);
			const previews = selectedFiles.map(file => URL.createObjectURL(file));
			const names = selectedFiles.map(file => file.name);

			setFiles([...files, ...selectedFiles]);
			setFilePreviews([...filePreviews, ...previews]);
			setFileNames([...fileNames, ...names]);
		}
	};

	// Elimina archivos, previsualizaciones y nombres del estado
	const removeFiles = ({
		index,
		files,
		setFiles,
		filePreviews,
		setFilePreviews,
		fileNames,
		setFileNames,
	}: UseFilesInputParams & { index: number }) => {
		setFiles(files.filter((_, i) => i !== index));
		setFilePreviews(filePreviews.filter((_, i) => i !== index));
		setFileNames(fileNames.filter((_, i) => i !== index));
	};
	return {
		selectFiles,
		removeFiles,
	};
}
