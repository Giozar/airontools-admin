import { useEffect } from 'react';

export default function FileUpload({
	setImageUrl,
	fileType,
	fileFeature,
	setfileFeature,
	setFileType,
	fileUrl,
	previewUrl,
	fileName,
	handlerFileSelect,
}: {
	setImageUrl?: (value: string) => void;
	fileType?: string;
	fileFeature?: string;
	setfileFeature: any;
	setFileType: any;
	fileUrl: any;
	previewUrl: any;
	fileName: any;
	handlerFileSelect: any;
}) {
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
				accept='image/*'
				style={{ display: 'none' }}
				onChange={handlerFileSelect}
			/>
		</div>
	);
}
