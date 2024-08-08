import axios from 'axios';

const uploadFile = async (
	file: File,
	type?: string | undefined,
	feature?: string | undefined,
): Promise<string> => {
	const formData = new FormData();
	formData.append('file', file);

	try {
		console.log(
			import.meta.env.VITE_API_URL +
				`/files/upload/${type ? type + '/' : ''}${feature ? feature + '/' : ''}`,
		);
		const response = await axios.post(
			import.meta.env.VITE_API_URL +
				`/files/upload/${type ? type + '/' : ''}${feature ? feature + '/' : ''}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);

		return response.data.secureUrl;
	} catch (error) {
		console.error('Error uploading file:', error);
		throw new Error('File upload failed');
	}
};

export default uploadFile;
