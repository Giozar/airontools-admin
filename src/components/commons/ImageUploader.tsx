import '@components/css/ImageUploader.css';
import TrashIcon from '@components/svg/TrashIcon';
import React from 'react';

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
}
const ImageUploader: React.FC<ImageUploaderProps> = ({
	title,
	filePreviews,
	onFileSelect,
	onRemoveFile,
}) => {
	return (
		<div className='image-uploader-container'>
			<label className='image-uploader-label'>{title}</label>
			<div className='image-upload'>
				<div className='image-placeholder add-image'>
					<label htmlFor='file-input'>Subir imagen +</label>
					<input
						type='file'
						id='file-input'
						multiple
						accept='image/*'
						onChange={event => onFileSelect(event, 'images')}
					/>
				</div>
				{filePreviews.images?.map((preview, index) => (
					<div key={index} className='image-preview'>
						<img src={preview} alt={`preview-${index}`} />
						<button
							onClick={() => onRemoveFile('images', index)}
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
};

export default ImageUploader;
