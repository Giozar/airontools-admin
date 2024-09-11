import '@components/css/ImageUploader.css';
import TrashIcon from '@components/svg/TrashIcon';
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';

export default function ImageUploader({
	title,
	images,
	setImages,
}: {
	title: string;
	images: { [key: string]: File[] };
	setImages: (
		value: SetStateAction<{
			[key: string]: File[];
		}>,
	) => void;
}) {
	const [filePreviews, setFilePreviews] = useState<{ [key: string]: string[] }>(
		{},
	);
	const [fileNames, setFileNames] = useState<{ [key: string]: string[] }>({});
	const handleFileSelect = (
		event: ChangeEvent<HTMLInputElement>,
		fileType: string,
	) => {
		if (event.target.files && event.target.files.length > 0) {
			const selectedFiles: File[] = Array.from(event.target.files);
			const previews = selectedFiles.map(file => URL.createObjectURL(file));
			const names = selectedFiles.map(file => file.name);

			setImages(prev => ({
				...prev,
				[fileType]: [...(prev[fileType] || []), ...selectedFiles],
			}));
			setFilePreviews(prev => ({
				...prev,
				[fileType]: [...(prev[fileType] || []), ...previews],
			}));
			setFileNames(prev => ({
				...prev,
				[fileType]: [...(prev[fileType] || []), ...names],
			}));
		}
	};

	// Remove a file from the state
	const handleRemoveFile = (fileType: string, index: number) => {
		images[fileType] &&
			setImages(prev => ({
				...prev,
				[fileType]: prev[fileType].filter((_, i) => i !== index),
			}));

		filePreviews[fileType] &&
			setFilePreviews(prev => ({
				...prev,
				[fileType]: prev[fileType].filter((_, i) => i !== index),
			}));
		fileNames[fileType] &&
			setFileNames(prev => ({
				...prev,
				[fileType]: prev[fileType].filter((_, i) => i !== index),
			}));
	};

	useEffect(() => {}, []);

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
						onChange={event => handleFileSelect(event, 'images')}
					/>
				</div>
				{filePreviews.images?.map((preview, index) => (
					<div key={index} className='image-preview'>
						<img src={preview} alt={`preview-${index}`} />
						<button
							onClick={() => handleRemoveFile('images', index)}
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
