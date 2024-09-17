import TrashIcon from '@components/svg/TrashIcon';
import useFilesInput from '@hooks/files/useFilesInput';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
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
	setUrls,
}: FilesInputProps) {
	const { selectFiles, removeFiles, removeUrls } = useFilesInput();
	const [filePreviews, setFilePreviews] = useState<string[]>([]);

	// Referencia para resetear el input
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	// Maneja la selección de archivos
	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		selectFiles({
			event,
			files,
			setFiles,
		});

		// Resetea el input después de seleccionar archivos
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	// Maneja la eliminación de archivos
	const handleRemoveFile = (index: number) => {
		removeFiles({
			index,
			files,
			setFiles,
		});

		// Resetea el input después de eliminar un archivo
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	// Maneja la eliminación de URLs
	const handleRemoveUrl = (index: number) => {
		removeUrls({
			index,
			urls,
			setUrls,
		});
	};

	// Actualiza las previsualizaciones cada vez que los archivos cambian
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
						accept='.pdf, .doc, .docx, .xml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
						onChange={handleFileSelect}
						ref={fileInputRef} // Referencia al input
					/>
				</div>

				{/* Previsualización de URLs cargadas */}
				{urls.length > 0 &&
					urls.map((url, index) => (
						<div key={index} className='manual-preview'>
							<h4>Archivos cargados</h4>
							<iframe src={url} title={`preview-url-${index}`} />
							<button
								onClick={() => handleRemoveUrl(index)}
								className='delete'
								type='button'
							>
								<TrashIcon />
							</button>
						</div>
					))}

				{/* Previsualización de archivos recién seleccionados */}
				{filePreviews.length > 0 &&
					filePreviews.map((preview, index) => (
						<div key={index} className='manual-preview'>
							<h4>Archivos previos</h4>
							<iframe src={preview} title={`preview-file-${index}`} />
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
