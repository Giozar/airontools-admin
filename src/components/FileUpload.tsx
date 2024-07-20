import { Dispatch, SetStateAction, useEffect } from 'react';
import useFileUpload from '../hooks/useFileUpload';

export default function FileUpload({
	setImageUrl,
}: {
	setImageUrl?: Dispatch<SetStateAction<string | undefined>>;
}) {
	const { fileUrl, fileName, previewUrl, handleFileSelect, handleFileUpload } =
		useFileUpload();

	useEffect(() => {
		if (setImageUrl) setImageUrl(fileUrl);
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
				<p>
					<p>¡Imagen subida con éxito!</p>Ver foto:{' '}
					<a target='_blank' href={fileUrl} rel='noreferrer'>
						{fileUrl}
					</a>
				</p>
			)}
		</div>
	);
}
