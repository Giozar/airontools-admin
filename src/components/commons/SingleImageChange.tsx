import '@components/css/ImageUploaderSingle.css'; // Ensure the path is correct
import EyeIcon from '@components/svg/EyeIcon';
import { useState } from 'react';

interface ImageUploaderProps {
	title: string;
	filePreview: string;
	setFilePreview: (value: File | null) => void;
	placeholder?: string;
}

const SingleImageChange = ({
	title,
	filePreview,
	setFilePreview,
	placeholder,
}: ImageUploaderProps) => {
	const [isHovering, setIsHovering] = useState(false);
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFilePreview(file);
		}
	};

	const handleRemoveImage = () => {
		setFilePreview(null);
	};

	return (
		<>
			<p>{title}</p>
			<div
				className='image-uploader-container-single'
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
						/>
						<label className='upload-label' htmlFor='image-upload-input'>
							Cambiar imagen
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