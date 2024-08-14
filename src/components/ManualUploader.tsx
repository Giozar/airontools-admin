import '@components/css/ManualUploader.css'; // Import the CSS file
import React from 'react';
import TrashIcon from './svg/TrashIcon';

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
	return (
		<div className='manual-uploader-container'>
			<label className='manual-uploader-label'>{title}</label>
			<div className='manual-upload'>
				<div className='embed-placeholder'>
					<label htmlFor='file-input'>Subir manual +</label>
					<input
						type='file'
						id='file-input'
						multiple
						accept='.pdf, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
						onChange={event => onFileSelect(event, 'manuals')}
						className='hidden'
					/>
				</div>
				{filePreviews.manuals?.map((preview, index) => (
					<div key={index} className='embed-preview'>
						<iframe src={preview} />
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
