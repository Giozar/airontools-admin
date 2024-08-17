import uploadFile from '@services/files/fileUpload.service';
import { ChangeEvent, useState } from 'react';

const useMultipleFileUpload = () => {
	const [files, setFiles] = useState<{ [key: string]: File[] }>({});
	const [filePreviews, setFilePreviews] = useState<{ [key: string]: string[] }>(
		{},
	);
	const [fileNames, setFileNames] = useState<{ [key: string]: string[] }>({});
	const [uploadedFileUrls, setUploadedFileUrls] = useState<{
		[key: string]: string[];
	}>({});
	const initFileSelect = (fileOrPath: string, fileType: string) => {
		if (fileOrPath) {
			// For a single string, we create arrays with one element
			const previews = [fileOrPath];
			const names = [fileOrPath]; // You might want to adjust this depending on how you handle names

			setFiles(prev => ({
				...prev,
				[fileType]: [
					...(prev[fileType] ||
						[]) /* Add corresponding file object if needed */,
				],
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

	const handleFileSelect = (
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

	// Remove a file from the state
	const handleRemoveFile = (fileType: string, index: number) => {
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

	// Handle file upload
	const handleFileUpload = async (
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

	return {
		files,
		filePreviews,
		fileNames,
		uploadedFileUrls,
		initFileSelect,
		handleFileSelect,
		handleRemoveFile,
		handleFileUpload,
	};
};

export default useMultipleFileUpload;
