import uploadFile from '@services/files/fileUpload.service';
import { ChangeEvent, useState } from 'react';

const useFileUpload = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [fileType, setFileType] = useState<string | undefined>('');
	const [fileFeature, setfileFeature] = useState<string | undefined>('');
	const [fileUrl, setFileUrl] = useState<string>('');
	const [fileName, setFileName] = useState('No hay archivo seleccionado');
	// Para tener una imagen de preview
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			setSelectedFile(file);
			setFileName(file.name);
			// Imagen preview
			const objectUrl = URL.createObjectURL(file);
			setPreviewUrl(objectUrl);
		} else {
			setFileName('No hay archivo seleccionado');
			setPreviewUrl(null);
		}
	};

	const handleFileUpload = async () => {
		await getFileUrl();
	};

	const getFileUrl = async () => {
		if (selectedFile) {
			const url = await uploadFile(selectedFile, fileType, fileFeature);
			setFileUrl(url);
		}
	};

	return {
		selectedFile,
		fileUrl,
		getFileUrl,
		fileName,
		previewUrl,
		handleFileSelect,
		handleFileUpload,
		setFileType,
		setfileFeature,
	};
};

export default useFileUpload;
