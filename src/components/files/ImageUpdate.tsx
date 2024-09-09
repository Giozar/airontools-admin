import DeletionModal from '@components/commons/DeletionModal';
import ImageUploader from '@components/commons/ImageUploader';
import TrashIcon from '@components/svg/TrashIcon';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface ImageUpdateProps {
	images: string[];
	filePreviews: any;
	handleRemoveFile: (type: string, index: number) => void;
	handleFileSelect: (
		event: ChangeEvent<HTMLInputElement>,
		type: string,
	) => void;
	setShowDeletionModalForFile: Dispatch<SetStateAction<string | null>>;
	showDeletionModalForFile: any;
	deletionMessageFile: any;
	handleCloseModalFile: any;
	handleDeleteFileFor: any;
	handleCloseModalDeletionImages: any;
}

function ImageUpdate({
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
}: ImageUpdateProps) {
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
			<ImageUploader
				title={'Imágenes nuevas'}
				filePreviews={filePreviews}
				onFileSelect={handleFileSelect}
				onRemoveFile={handleRemoveFile}
			/>
		</div>
	);
}

export default ImageUpdate;
