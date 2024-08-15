import '@components/css/ManualUploader.css'; // Import the CSS file
import TrashIcon from '@components/svg/TrashIcon';
import React, { useState } from 'react';

interface ManualUploaderProps {
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

const ManualUploader: React.FC<ManualUploaderProps> = ({
	title,
	filePreviews,
	onFileSelect,
	onRemoveFile,
}) => {
	const [indexes, setIndexes] = useState<number[]>([]);

	// Handle file selection
	const fileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Get the selected files
		const files = Array.from(event.target.files || []);

		// Prepare indexes for non-PDF files
		const newIndexes: number[] = [];

		files.forEach(file => {
			const fileExtension = file.name.split('.').pop()?.toLowerCase();

			if (
				fileExtension &&
				fileExtension !== 'pdf' &&
				fileExtension !== 'html'
			) {
				newIndexes.push(filePreviews.manuals.length); // Use length for new index
			}
		});

		// Update indexes state
		setIndexes(prevIndexes => [...prevIndexes, ...newIndexes]);

		// Call the parent handler
		onFileSelect(event, 'manuals');
	};

	return (
		<div className='manual-uploader-container'>
			<label className='manual-uploader-label'>{title}</label>
			<div className='manual-upload'>
				<div className='embed-placeholder add-image'>
					<label htmlFor='file-input-m'>Subir manual +</label>
					<input
						type='file'
						id='file-input-m'
						multiple
						accept='.pdf, .html, .doc, .docx, .xml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
						onChange={event => fileSelect(event)}
						className='hidden'
					/>
				</div>
				{filePreviews.manuals?.map((preview, index) => (
					<div key={index} className='embed-preview'>
						{indexes.includes(index) && (
							<div className='overlay'>
								Documento de Word: <br></br>
								{preview}
							</div>
						)}
						<iframe src={preview} title={`Preview ${index}`} />
						<button
							onClick={() => onRemoveFile('manuals', index)}
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

export default ManualUploader;
