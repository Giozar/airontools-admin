import TrashIcon from '@components/svg/TrashIcon';
import useFilesInput from '@hooks/files/useFilesInput';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { transformFilesToUrls } from './helpers/transformFilesToUrls.helper';
import './styles/ImagesInput.css';

interface FilesInputProps {
	title: string;
	files: File[];
	setFiles: (value: File[]) => void;
	urls: string[];
	setUrls: (value: string[]) => void;
}

export default function ImagesInput({
	title,
	files,
	urls,
	setFiles,
	setUrls,
}: FilesInputProps) {
	const { selectFiles, removeFiles, removeUrls } = useFilesInput();
	const [filePreviews, setFilePreviews] = useState<string[]>([]);

	// Referencia al input file
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
		// console.log('Elimino el archivo');
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

	// Maneja la eliminación de las URLs de las imágenes
	const handleRemoveUrl = (index: number) => {
		// console.log('Elimino la url');
		removeUrls({
			index,
			urls,
			setUrls,
		});
	};

	useEffect(() => {
		setFilePreviews(transformFilesToUrls(files));
	}, [files, urls]);

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
						ref={fileInputRef} // Asignamos la referencia al input
					/>
				</div>

				{urls.length > 0 &&
					urls.map((url, index) => (
						<div key={index} className='image-preview'>
							<h4>Imágenes cargadas</h4>
							<img src={url} alt={`preview-${index}`} />
							<button
								onClick={() => handleRemoveUrl(index)}
								className='delete'
								type='button'
							>
								<TrashIcon />
							</button>
						</div>
					))}

				{filePreviews.length > 0 &&
					filePreviews.map((filePreview, index) => (
						<div key={index} className='image-preview'>
							<h4>Imágenes previas</h4>
							<img src={filePreview} alt={`preview-${index}`} />
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
