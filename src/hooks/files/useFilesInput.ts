import { ChangeEvent, useState } from 'react';

interface UseFilesInputParams {
	files: File[];
	setFiles: (value: File[]) => void;
}

interface UseUrlsInputParams {
	urls: string[];
	setUrls: (value: string[]) => void;
	urlsRemoved: string[];
	setUrlsRemoved: (value: string[]) => void;
}

export default function useFilesInput() {
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);
	const [fileNames, setFileNames] = useState<string[]>([]);

	// Añade archivos seleccionados y actualiza sus previsualizaciones y nombres
	const selectFiles = ({
		event,
		files,
		setFiles,
	}: UseFilesInputParams & { event: ChangeEvent<HTMLInputElement> }) => {
		if (event.target.files && event.target.files.length > 0) {
			const selectedFiles = Array.from(event.target.files);
			const previews = selectedFiles.map(file => URL.createObjectURL(file));
			const names = selectedFiles.map(file => file.name);

			setFiles([...files, ...selectedFiles]);
			setPreviewUrls([...previewUrls, ...previews]);
			setFileNames([...fileNames, ...names]);
		}
	};

	// Elimina archivos, previsualizaciones y nombres del estado
	const removeFiles = ({
		index,
		files,
		setFiles,
	}: UseFilesInputParams & { index: number }) => {
		setFiles(files.filter((_, i) => i !== index));
		setPreviewUrls(previewUrls.filter((_, i) => i !== index));
		setFileNames(fileNames.filter((_, i) => i !== index));
	};

	const removeUrls = ({
		index,
		urls,
		setUrls,
		urlsRemoved,
		setUrlsRemoved,
	}: UseUrlsInputParams & { index: number }) => {
		// Obtener la URL a eliminar
		const urlToRemove = urls[index];
		// Actualizar el estado de URLs, eliminando la URL correspondiente
		setUrls(urls.filter((_, i) => i !== index));

		// Actualizar el estado de URLs removidas, agregando la URL eliminada
		setUrlsRemoved([...urlsRemoved, urlToRemove]);
	};

	return {
		selectFiles,
		removeFiles,
		removeUrls,
	};
}
