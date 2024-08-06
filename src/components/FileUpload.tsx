import useFileUpload from '@hooks/useFileUpload';
import { Dispatch, SetStateAction, useEffect } from 'react';

export default function FileUpload({
	setImageUrl,
	fileType,
	fileFeature,
}: {
	setImageUrl?: Dispatch<SetStateAction<string>>;
	fileType?: string;
	fileFeature?: string;
}) {
	const {
		fileUrl,
		fileName,
		previewUrl,
		handleFileSelect,
		handleFileUpload,
		setFileType,
		setfileFeature,
	} = useFileUpload();

	useEffect(() => {
		if (setImageUrl) setImageUrl(fileUrl);
		setFileType(fileType);
		setfileFeature(fileFeature);
	}, [fileUrl, setImageUrl]);

	return (
		<div>
			<div
				className='profileimage'
				style={{ backgroundImage: `url(${previewUrl})` }}
			></div>
			<label htmlFor='file-upload' className='custom-file-upload'>
				Seleccionar archivo
			</label>
			<span>{fileName}</span>
			<input
				type='file'
				id='file-upload'
				style={{ display: 'none' }}
				onChange={handleFileSelect}
			/>
			<button type='button' onClick={handleFileUpload}>
				Subir imagen
			</button>

			{fileUrl && (
				<div>
					<p>¡Imagen subida con éxito!</p>
					<p>
						Ver foto:{' '}
						<a target='_blank' href={fileUrl} rel='noreferrer'>
							{fileUrl}
						</a>
					</p>
				</div>
			)}
		</div>
	);
}
