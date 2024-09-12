import uploadFileService from '@services/files/fileUpload.service';

import { ChangeEvent, useState } from 'react';

const useFileUpload = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [fileType, setFileType] = useState<string | undefined>('');
	const [fileFeature, setfileFeature] = useState<string | undefined>('');
	const [fileUrl, setFileUrl] = useState<string>('');
	const [fileName, setFileName] = useState('No hay archivo seleccionado');
	// Para tener una imagen de preview
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const handlerFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
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

	const uploadFile = async () => {
		if (selectedFile) {
			const url = await uploadFileService(selectedFile, fileType, fileFeature);
			setFileUrl(url);
			return url;
		}
	};

	return {
		selectedFile,
		fileUrl,
		uploadFile,
		fileName,
		previewUrl,
		handlerFileSelect,
		setFileType,
		setfileFeature,
	};
};

export default useFileUpload;
