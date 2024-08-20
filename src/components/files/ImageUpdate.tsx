import TrashIcon from '@components/svg/TrashIcon';
import { ChangeEvent } from 'react';
import DeletionModal from './commons/DeletionModal';

const ImageUpdate = ({
	images,
	filePreviews,
	handleRemoveFile,
	handleFileSelect,
	setShowDeletionModalForFile,
	showDeletionModalForFile,
	deletionMessageFile,
	handleCloseModalFile,
	handleDeleteFileFor,
	handleCloseModalDeletionImages,
}: {
	images: string[];
	filePreviews: any;
	handleRemoveFile: (type: string, index: number) => void;
	handleFileSelect: (
		event: ChangeEvent<HTMLInputElement>,
		type: string,
	) => void;
	setShowDeletionModalForFile: React.Dispatch<
		React.SetStateAction<string | null>
	>;
	showDeletionModalForFile: any;
	deletionMessageFile: any;
	handleCloseModalFile: any;
	handleDeleteFileFor: any;
	handleCloseModalDeletionImages: any;
}) => {
	return (
		<div className='column'>
			<p>Imágenes:</p>
			<div className='image-upload'>
				{images &&
					images.map((preview, index) => (
						<div key={index} className='image-preview'>
							{showDeletionModalForFile === preview && (
								<DeletionModal
									id={preview}
									name={preview}
									image={preview}
									onClose={() => handleCloseModalFile()}
									onCloseDelete={() => handleCloseModalDeletionImages(preview)}
									onDelete={() => handleDeleteFileFor(preview)}
									message={deletionMessageFile}
								/>
							)}
							<img
								src={preview}
								alt={`preview-${index}`}
								className='image-placeholder'
							/>
							<button
								onClick={() => setShowDeletionModalForFile(preview)}
								className='delete'
							>
								<TrashIcon />
							</button>
						</div>
					))}
			</div>
			<p>Imagenes nuevas:</p>
			<div className='image-upload'>
				{filePreviews.images?.map((preview: string, index: number) => (
					<div key={index} className='image-preview'>
						<img
							src={preview}
							alt={`preview-${index}`}
							className='image-placeholder'
						/>
						<button
							onClick={() => handleRemoveFile('images', index)}
							className='delete'
							type='button'
						>
							<TrashIcon />
						</button>
					</div>
				))}
				<div className='image-placeholder add-image'>
					<label htmlFor='file-input'>Subir imagen +</label>
					<input
						type='file'
						id='file-input'
						multiple
						accept='image/*'
						onChange={event => handleFileSelect(event, 'images')}
						style={{ display: 'none' }}
					/>
				</div>
			</div>
		</div>
	);
};

export default ImageUpdate;
