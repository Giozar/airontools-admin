import '@components/css/FilesInput.css';
import TrashIcon from '@components/svg/TrashIcon';
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';

interface FilesInputProps {
	title: string;
	files: { [key: string]: File[] };
	setFiles: (
		value: SetStateAction<{
			[key: string]: File[];
		}>,
	) => void;
}
export default function FilesInput({
	title,
	files,
	setFiles,
}: FilesInputProps) {
	const [filePreviews, setFilePreviews] = useState<{ [key: string]: string[] }>(
		{},
	);
	const [fileNames, setFileNames] = useState<{ [key: string]: string[] }>({});

	// Añade imágenes al estado
	const handleFileSelect = (
		event: ChangeEvent<HTMLInputElement>,
		fileType: string,
	) => {
		if (event.target.files && event.target.files.length > 0) {
			const selectedFiles: File[] = Array.from(event.target.files);
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

	// Se remueven las imágenes del estado
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

	useEffect(() => {
		console.log(fileNames);
	}, [fileNames]);

	return (
		<div className='image-uploader-container'>
			<label className='image-uploader-label'>{title}</label>
			<div className='image-upload'>
				<div className='image-placeholder add-image'>
					<label htmlFor='file-input'>{title}</label>
					<input
						type='file'
						id='file-input'
						multiple
						accept='image/*'
						onChange={event => handleFileSelect(event, 'files')}
					/>
				</div>
				{filePreviews.files?.map((preview, index) => (
					<div key={index} className='image-preview'>
						<img src={preview} alt={`preview-${index}`} />
						<button
							onClick={() => handleRemoveFile('files', index)}
							className='delete'
							type='button'
						>
							<TrashIcon />
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
