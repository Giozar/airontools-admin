import '@components/css/ImageUploaderSingle.css'; // Ensure the path is correct
import EyeIcon from '@components/svg/EyeIcon';
import { ChangeEvent, useEffect, useState } from 'react';

interface ImageUploaderProps {
	title: string;
	filePreview: string;
	setFilePreview: (value: File | null) => void;
	setFileToDelete?: (value: boolean) => void;
	setImageRemoved?: (value: string) => void;
	placeholder?: string;
	capture?: boolean;
	size?: string;
}

const SingleImageChange = ({
	title,
	filePreview,
	setFilePreview,
	setFileToDelete,
	setImageRemoved,
	placeholder,
	capture,
	size = 'default',
}: ImageUploaderProps) => {
	const [isHovering, setIsHovering] = useState(false);
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFilePreview(file);
		}
	};

	const handleRemoveImage = () => {
		if (setImageRemoved) setImageRemoved(filePreview);
		console.log(filePreview);
		setFilePreview(null);
		if (setFileToDelete) setFileToDelete(true);
	};

	useEffect(() => {
		console.log(filePreview, 'se tiene que quitar la imagen');
	}, [filePreview]);
	return (
		<>
			<p>{title}</p>
			<div
				className={`image-uploader-container-single ${size}-image`}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
			>
				{filePreview ? (
					<img
						src={filePreview}
						alt='Uploaded Image'
						className='image-uploader-image'
					/>
				) : placeholder ? (
					<img
						src={placeholder}
						alt='Placeholder Image'
						className='image-uploader-image'
					/>
				) : (
					<EyeIcon />
				)}

				{isHovering && (
					<div className='image-uploader-overlay'>
						<input
							type='file'
							accept='image/*'
							onChange={handleFileChange}
							className='hidden'
							id='image-upload-input'
							capture={capture}
						/>
						<label className='upload-label' htmlFor='image-upload-input'>
							{filePreview || placeholder ? 'Cambiar imagen' : 'Cargar imagen'}
						</label>

						<button
							onClick={handleRemoveImage}
							type='button'
							className='delete'
						>
							Quitar imagen
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default SingleImageChange;
