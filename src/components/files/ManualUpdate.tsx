import DeletionModal from '@components/commons/DeletionModal';
import ManualUploader from '@components/commons/ManualUploader';
import TrashIcon from '@components/svg/TrashIcon';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface ManualUpdateProps {
	manuals: string[];
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
	handleCloseModalDeletionManuals: any;
}

function ManualUpdate({
	manuals,
	filePreviews,
	handleRemoveFile,
	handleFileSelect,
	setShowDeletionModalForFile,
	showDeletionModalForFile,
	deletionMessageFile,
	handleCloseModalFile,
	handleDeleteFileFor,
	handleCloseModalDeletionManuals,
}: ManualUpdateProps) {
	return (
		<div className='column'>
			<p>Manuales:</p>
			<div className='image-upload'>
				{manuals &&
					manuals.map((preview, index) => (
						<div key={index} className='image-preview'>
							{showDeletionModalForFile === preview && (
								<DeletionModal
									id={preview}
									name={preview}
									image={preview}
									onClose={() => handleCloseModalFile()}
									onCloseDelete={() => handleCloseModalDeletionManuals(preview)}
									onDelete={() => handleDeleteFileFor(preview)}
									message={deletionMessageFile}
								/>
							)}
							<embed
								src={preview}
								width='150'
								height='100'
								className='image-placeholder'
							/>
							<div className='buttons'>
								<a href={preview} target='_blank' rel='noopener noreferrer'>
									Ver documento completo
								</a>
							</div>
							<button
								onClick={() => setShowDeletionModalForFile(preview)}
								className='delete'
							>
								<TrashIcon />
							</button>
						</div>
					))}
			</div>
			<ManualUploader
				title={'Manuales nuevos'}
				filePreviews={filePreviews}
				onFileSelect={handleFileSelect}
				onRemoveFile={handleRemoveFile}
			/>
		</div>
	);
}

export default ManualUpdate;
