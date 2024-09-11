import { deleteFileService } from '@services/files/deleteFile.service';
import uploadFile from '@services/files/fileUpload.service';
import { ChangeEvent, useState } from 'react';

export default function useFilesInput() {
	const [files, setFiles] = useState<{ [key: string]: File[] }>({});
	const [filePreviews, setFilePreviews] = useState<{ [key: string]: string[] }>(
		{},
	);
	const [fileNames, setFileNames] = useState<{ [key: string]: string[] }>({});
	const [uploadedFileUrls, setUploadedFileUrls] = useState<{
		[key: string]: string[];
	}>({});

	// Función que se encarga de seleccionar ya añadir archivos al estado
	const selectFiles = (
		event: ChangeEvent<HTMLInputElement>,
		fileType: string,
	) => {
		if (event.target.files && event.target.files.length > 0) {
			const selectedFiles = Array.from(event.target.files);
			const previews = selectedFiles.map(file => URL.createObjectURL(file));
			const names = selectedFiles.map(file => file.name);

			setFiles(prev => ({
				...prev,
				[fileType]: [...(prev[fileType] || []), ...selectedFiles],
			}));
			setFilePreviews(prev => ({
				...prev,
				[fileType]: [...(prev[fileType] || []), ...previews],
			}));
			setFileNames(prev => ({
				...prev,
				[fileType]: [...(prev[fileType] || []), ...names],
			}));
		}
	};

	// Función que se encarga de eliminar las archivos del estado
	const removeFiles = (fileType: string, index: number) => {
		files[fileType] &&
			setFiles(prev => ({
				...prev,
				[fileType]: prev[fileType].filter((_, i) => i !== index),
			}));

		filePreviews[fileType] &&
			setFilePreviews(prev => ({
				...prev,
				[fileType]: prev[fileType].filter((_, i) => i !== index),
			}));
		fileNames[fileType] &&
			setFileNames(prev => ({
				...prev,
				[fileType]: prev[fileType].filter((_, i) => i !== index),
			}));
	};

	// Función que se encarga de subir los archivos al servidor y regresa las urls donde se aloja
	const fileUpload = async (
		type: string,
		feature: string,
		fileType: string,
	) => {
		const urls: string[] = [];
		for (const file of files[fileType] || []) {
			try {
				const url = await uploadFile(file, type, feature);
				urls.push(url);
			} catch (error) {
				console.error('No se pudo subir archivos:', file.name, error);
			}
		}
		setUploadedFileUrls(prev => ({
			...prev,
			[fileType]: urls,
		}));
		console.log(urls);
		setFilePreviews({});
		setFiles({});
		setFileNames({});
		return urls;
	};

	// Funcón que se encarga de eliminar los archivos del servidor
	const deleteFile = async (fileId: string) => {
		try {
			await deleteFileService(fileId);
		} catch (error) {
			console.error(`Error al eliminar archivo ${fileId}:`, error);
		}
	};

	return {
		files,
		filePreviews,
		fileNames,
		uploadedFileUrls,
		selectFiles,
		removeFiles,
		deleteFile,
		fileUpload,
	};
}
