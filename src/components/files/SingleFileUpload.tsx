interface ImageUploaderProps {
	filePreview: string;
	setFilePreview: (value: File | null) => void;
}

const SingleImageUpload = ({
	filePreview,
	setFilePreview,
}: ImageUploaderProps) => {
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFilePreview(file);
		}
	};

	return (
		<div>
			<div
				className='profileimage'
				style={{ backgroundImage: `url(${filePreview})` }}
			></div>
			<label htmlFor='file-upload' className='custom-file-upload'>
				Seleccionar archivo
			</label>
			<input
				type='file'
				id='file-upload'
				accept='image/*'
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>
		</div>
	);
};

export default SingleImageUpload;
