import uploadFile from '@services/fileUpload/fileUpload.service';
import { ChangeEvent, useState } from 'react';

const useMultipleFileUpload = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [filePreviews, setFilePreviews] = useState<string[]>([]);
	const [fileNames, setFileNames] = useState<string[]>([]);
	const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]);

	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const selectedFiles = Array.from(event.target.files);
			const previews = selectedFiles.map(file => URL.createObjectURL(file));
			const names = selectedFiles.map(file => file.name);

			setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
			setFilePreviews(prevPreviews => [...prevPreviews, ...previews]);
			setFileNames(prevNames => [...prevNames, ...names]);
		}
	};
	const handleRemoveImage = (index: number) => {
		setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
		setFilePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
		setFileNames(prevNames => prevNames.filter((_, i) => i !== index));
	};

	const handleFileUpload = async () => {
		const urls: string[] = [];
		for (const file of files) {
			try {
				const url = await uploadFile(file);
				urls.push(url);
			} catch (error) {
				console.error('No se pudo subir archivos de imagen:', file.name, error);
			}
		}
		setUploadedFileUrls(urls);
		console.log(urls);
		return urls;
	};

	return {
		files,
		filePreviews,
		fileNames,
		uploadedFileUrls,
		handleFileSelect,
		handleRemoveImage,
		handleFileUpload,
	};
};
export default useMultipleFileUpload;
