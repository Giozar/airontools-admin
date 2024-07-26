import axios from 'axios';

const uploadFile = async (file: File): Promise<string> => {
	const formData = new FormData();
	formData.append('file', file);

	try {
		const response = await axios.post(
			import.meta.env.VITE_API_URL + '/files/upload',
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
