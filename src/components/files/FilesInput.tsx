import TrashIcon from '@components/svg/TrashIcon';
import useFilesInput from '@hooks/files/useFilesInput';
import { ChangeEvent, useEffect, useState } from 'react';
import { transformFilesToUrls } from './helpers/transformFilesToUrls.helper';
import './styles/FilesInput.css';

interface FilesInputProps {
	title: string;
	files: File[];
	setFiles: (value: File[]) => void;
	urls: string[];
	setUrls: (value: string[]) => void;
	fileType: string;
}

export default function FilesInput({
	title,
	files,
	urls,
	setFiles,
	fileType,
}: FilesInputProps) {
	const { selectFiles, removeFiles } = useFilesInput();
	const [filePreviews, setFilePreviews] = useState<string[]>([]);

	// Maneja la selección de archivos
	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		selectFiles({
			event,
			files,
			setFiles,
		});
	};

	// Maneja la eliminación de archivos
	const handleRemoveFile = (index: number) => {
		removeFiles({
			index,
			files,
			setFiles,
		});
	};

	useEffect(() => {
		setFilePreviews(transformFilesToUrls(files));
	}, [files]);

	return (
		<div className='file-uploader-container'>
			<label className='file-uploader-label'>{title}</label>
			<div className='file-upload'>
				<div className='file-placeholder add-file'>
					<label htmlFor='file-input'>{title}</label>
					<input
						type='file'
						id='file-input'
						multiple
						accept={`${fileType}/*`}
						onChange={handleFileSelect}
					/>
				</div>
				{urls.length > 0 &&
					urls.map((url, index) => (
						<div key={index} className='file-preview'>
							<h4>Archivos cargados</h4>
							<img src={url} alt={`preview-${index}`} />
							<button
								onClick={() => handleRemoveFile(index)}
								className='delete'
								type='button'
							>
								<TrashIcon />
							</button>
						</div>
					))}
				{filePreviews.length > 0 &&
					filePreviews.map((url, index) => (
						<div key={index} className='file-preview'>
							<h4>Archivos previos</h4>
							<img src={url} alt={`preview-${index}`} />
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
