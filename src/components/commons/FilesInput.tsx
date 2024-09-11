import '@components/css/FilesInput.css';
import TrashIcon from '@components/svg/TrashIcon';
import useFilesInput from '@hooks/files/useFilesInput';
import { ChangeEvent, useEffect } from 'react';

interface FilesInputProps {
	title: string;
	files: File[];
	setFiles: (value: File[]) => void;
	filePreviews: string[];
	setFilePreviews: (value: string[]) => void;
	fileNames: string[];
	setFileNames: (value: string[]) => void;
}

export default function FilesInput({
	title,
	files,
	setFiles,
	filePreviews,
	setFilePreviews,
	fileNames,
	setFileNames,
}: FilesInputProps) {
	const { selectFiles, removeFiles } = useFilesInput();

	// Maneja la selección de archivos
	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		selectFiles({
			event,
			files,
			setFiles,
			filePreviews,
			setFilePreviews,
			fileNames,
			setFileNames,
		});
	};

	// Maneja la eliminación de archivos
	const handleRemoveFile = (index: number) => {
		removeFiles({
			index,
			files,
			setFiles,
			filePreviews,
			setFilePreviews,
			fileNames,
			setFileNames,
		});
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
						onChange={handleFileSelect}
					/>
				</div>
				{filePreviews.map((preview, index) => (
					<div key={index} className='image-preview'>
						<img src={preview} alt={`preview-${index}`} />
						<button
							onClick={() => handleRemoveFile(index)}
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
