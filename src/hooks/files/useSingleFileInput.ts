import { useEffect, useState } from 'react';

interface UseSingleFileInputParams {
	setFile: (value: File | null) => void;
}

interface UseSingleUrlInputParams {
	url: string | null;
	setUrl: (value: string) => void;
	urlRemoved: string | null;
	setUrlRemoved: (value: string) => void;
}

export default function useSingleFileInput() {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);

	// Añade el archivo seleccionado y actualiza su previsualización y nombre
	const selectFile = ({
		file,
		setFile,
	}: UseSingleFileInputParams & { file: File }) => {
		const preview = URL.createObjectURL(file);
		const name = file.name;

		setFile(file);
		setPreviewUrl(preview);
		setFileName(name);
	};

	// Elimina el archivo y su previsualización del estado
	const removeFile = ({ setFile }: UseSingleFileInputParams) => {
		setFile(null);
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl); // Limpieza de la URL creada
		}
		setPreviewUrl(null);
		setFileName(null);
	};

	// Elimina la URL de una imagen previamente subida
	const removeUrl = ({
		url,
		setUrl,
		setUrlRemoved,
	}: UseSingleUrlInputParams) => {
		if (url) {
			setUrl(''); // Limpiar la URL del estado
			setUrlRemoved(url); // Guardar la URL eliminada (si es necesario)
		}
		setPreviewUrl(null); // Limpiar la vista previa
	};

	// Cleanup cuando el componente que usa el hook se desmonta
	useEffect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl); // Limpieza de la URL cuando el componente se desmonta
			}
		};
	}, [previewUrl]);

	return {
		selectFile,
		removeFile,
		removeUrl,
		previewUrl,
		fileName,
		setPreviewUrl, // Agregado para permitir el manejo manual desde otros componentes
	};
}
