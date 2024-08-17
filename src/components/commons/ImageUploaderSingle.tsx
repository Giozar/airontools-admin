import '@components/css/ImageUploaderSingle.css'; // Asegúrate de que la ruta sea correcta
import EyeIcon from '@components/svg/EyeIcon';
import React, { useState } from 'react';

interface ImageUploaderProps {
	title: string;
	filePreviews: {
		[key: string]: string[];
	};
	onFileSelect: (
		event: React.ChangeEvent<HTMLInputElement>,
		type: string,
	) => void;
	onRemoveFile: (type: string, index: number) => void;
	type: string;
	index?: number;
}

const ImageUploaderSingle = ({
	title,
	filePreviews,
	onFileSelect,
	onRemoveFile,
	type,
	index,
}: ImageUploaderProps) => {
	const [isHovering, setIsHovering] = useState(false);
	const value = `images.${type}${index ? `.${index}` : ''}`;
	const previews = filePreviews[value];

	const changeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (previews && previews.length > 0) onRemoveFile(value, 0);
		onFileSelect(event, value);
	};
	console.log(previews[0]);
	return (
		<>
			<p>{title}</p>
			<div
				className='image-uploader-container-single'
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
			>
				{previews && previews[0] ? (
					<img
						src={previews[0]}
						alt='Uploaded Image'
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
							onChange={event => changeSelect(event)}
							className='hidden'
							id={`image-input-${type}`}
						/>
						<label htmlFor={`image-input-${type}`} className='upload-label'>
							Cambiar imagen
						</label>

						<button
							onClick={() => onRemoveFile(value, 0)}
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

export default ImageUploaderSingle;
