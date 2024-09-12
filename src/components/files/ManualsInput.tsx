import TrashIcon from '@components/svg/TrashIcon';
import useFilesInput from '@hooks/files/useFilesInput';
import { ChangeEvent, useEffect, useState } from 'react';
import { transformFilesToUrls } from './helpers/transformFilesToUrls.helper';
import './styles/ManualsInput.css';

interface FilesInputProps {
	title: string;
	files: File[];
	setFiles: (value: File[]) => void;
	urls: string[];
	setUrls: (value: string[]) => void;
}

export default function ManualsInput({
	title,
	files,
	urls,
	setFiles,
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
		<div className='manual-uploader-container'>
			<label className='manual-uploader-label'>{title}</label>
			<div className='manual-upload'>
				<div className='embed-placeholder add-manual'>
					<label htmlFor='file-input-m'>{title}</label>
					<input
						type='file'
						id='file-input-m'
						multiple
						accept='.pdf, .html, .doc, .docx, .xml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
						onChange={handleFileSelect}
					/>
				</div>
				{urls.length > 0 &&
					urls.map((url, index) => (
						<div key={index} className='manual-preview'>
							<h4>Archivos cargados</h4>
							<iframe src={url} title={`preview-${index}`} />
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
						<div key={index} className='manual-preview'>
							<h4>Archivos previos</h4>
							<iframe src={url} title={`preview-${index}`} />
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
