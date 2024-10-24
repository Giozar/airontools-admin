import '@components/css/ImageUploaderSingle.css'; // Usamos los estilos existentes
import EyeIcon from '@components/svg/EyeIcon'; // Reemplazamos el ícono por el que ya tienes
import useSingleFileInput from '@hooks/files/useSingleFileInput';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface SingleFileInputProps {
	title: string;
	file: File | null;
	setFile: (value: File | null) => void;
	url: string | null;
	setUrl: (value: string) => void;
	urlRemoved: string;
	setUrlRemoved: (value: string) => void;
	size?: string;
	capture?: boolean;
}

export default function SingleImageInput({
	title,
	file,
	setFile,
	url,
	setUrl,
	urlRemoved,
	setUrlRemoved,
	size = 'default',
	capture,
}: SingleFileInputProps) {
	const { selectFile, removeFile, removeUrl, previewUrl, setPreviewUrl } =
		useSingleFileInput();
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [isHovering, setIsHovering] = useState(false); // Para manejar el hover

	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const selectedFile = event.target.files[0];
			selectFile({
				file: selectedFile,
				setFile,
			});
		}

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleRemoveFile = () => {
		removeFile({ setFile });
		setPreviewUrl(null); // Limpiar la vista previa de la imagen
	};

	const handleRemoveUrl = () => {
		removeUrl({
			url,
			setUrl,
			urlRemoved,
			setUrlRemoved,
		});
		setPreviewUrl(null); // Limpiar la vista previa de la imagen
	};

	// Efecto para manejar la vista previa del archivo seleccionado
	useEffect(() => {
		if (file) {
			const objectUrl = URL.createObjectURL(file);
			setPreviewUrl(objectUrl); // Establece la vista previa
			return () => URL.revokeObjectURL(objectUrl); // Cleanup object URL
		} else {
			setPreviewUrl(null); // Limpiar la vista previa si no hay archivo
		}
	}, [file, setPreviewUrl]);

	// Limpiar la URL de la vista previa si se elimina la URL o el archivo
	useEffect(() => {
		if (!file && !url) {
			setPreviewUrl(null); // Limpiar la vista previa si no hay archivo ni URL
		}
	}, [file, url, setPreviewUrl]);

	return (
		<div>
			<p>{title}</p>
			<div
				className={`image-uploader-container-single ${size}-image`}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
			>
				{/* Mostrar la imagen cargada o la vista previa */}
				{url || previewUrl ? (
					<img
						src={url || previewUrl!}
						alt='Imagen subida'
						className='image-uploader-image'
					/>
				) : (
					<EyeIcon />
				)}

				{/* Overlay para cambiar o eliminar la imagen */}
				{isHovering && (
					<div className='image-uploader-overlay'>
						<input
							type='file'
							id='file-input'
							accept='image/*'
							onChange={handleFileSelect}
							ref={fileInputRef}
							className='hidden'
							capture={capture}
						/>
						<label className='upload-label' htmlFor='file-input'>
							{url || previewUrl ? 'Cambiar imagen' : 'Cargar imagen'}
						</label>
						<button
							onClick={url ? handleRemoveUrl : handleRemoveFile}
							type='button'
							className='delete'
						>
							Quitar imagen
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
