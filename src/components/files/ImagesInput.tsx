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
	urlsRemoved: string[];
	setUrlsRemoved: (value: string[]) => void;
}

/**
 * Ejecuta una acción al enviar el formulario de producto.
 *
 * @param {string} title - Enunciado del componente ej. Agregar imagen.
 * @param {File[]} files - Valores de las imágenes en crudo.
 * @param {string[]} urls - URLS de las imágenes.
 * @param {(values: File[]) => void} setFiles - Setter de las imágenes en crudo.
 * @param {(values: string[]) => void} setUrls - Setter de URLS de las imágenes.
 * @param {string[]} urlsRemoved - valores de URLS de las imágenes a remover.
 * @param {(values: string[]) => void} setUrlsRemoved - Setter que actualiza las URLS a remover.
 * @returns {void} No devuelve ningún valor.
 */
export default function ImagesInput({
	title,
	files,
	urls,
	setFiles,
	setUrls,
	urlsRemoved,
	setUrlsRemoved,
}: FilesInputProps) {
	const { selectFiles, removeFiles, removeUrls } = useFilesInput();
	const [filePreviews, setFilePreviews] = useState<string[]>([]);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		selectFiles({
			event,
			files,
			setFiles,
		});
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleRemoveFile = (index: number) => {
		removeFiles({
			index,
			files,
			setFiles,
		});
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleRemoveUrl = (index: number) => {
		removeUrls({
			index,
			urls,
			setUrls,
			urlsRemoved,
			setUrlsRemoved,
		});
	};

	useEffect(() => {
		setFilePreviews(transformFilesToUrls(files));
	}, [files, urls]);

	return (
		<div className='images-input'>
			<label className='images-input__label'>{title}</label>
			<div className='images-input__upload'>
				<div className='images-input__placeholder'>
					<label
						htmlFor='file-input'
						className='images-input__placeholder-label'
					>
						{title} +
					</label>
					<input
						type='file'
						id='file-input'
						multiple
						accept='image/*'
						onChange={handleFileSelect}
						ref={fileInputRef}
						className='images-input__file-input'
					/>
				</div>

				<div className='images-input__upload'>
					{urls.length > 0 && (
						<>
							<h4 className='images-input__loaded-title'>Imágenes subidas</h4>
							<div className='images-input__loaded'>
								{urls.map((url, index) => (
									<div key={index} className='images-input__preview'>
										<img
											src={url}
											alt={`preview-${index}`}
											className='images-input__image'
										/>
										<button
											onClick={() => handleRemoveUrl(index)}
											className='images-input__delete-button'
											type='button'
										>
											<TrashIcon />
										</button>
									</div>
								))}
							</div>
						</>
					)}

					{filePreviews.length > 0 && (
						<>
							<h4 className='images-input__preview-title'>Imágenes a subir</h4>
							<div className='images-input__loaded'>
								{filePreviews.map((filePreview, index) => (
									<div key={index} className='images-input__preview'>
										<img
											src={filePreview}
											alt={`preview-${index}`}
											className='images-input__image'
										/>
										<button
											onClick={() => handleRemoveFile(index)}
											className='images-input__delete-button'
											type='button'
										>
											<TrashIcon />
										</button>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
