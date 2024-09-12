import { airontoolsAPI } from '@configs/api.config';
import axios from 'axios';

const uploadFileService = async (
	file: File,
	...folders: (string | undefined)[]
): Promise<string> => {
	const formData = new FormData();
	formData.append('file', file);

	// Filtramos los valores `undefined` y construimos la URL dinámica
	const folderPath = folders.filter(Boolean).join('/');

	try {
		const url = `${airontoolsAPI}/files/upload/${folderPath}`;
		console.log('Uploading to:', url);

		const response = await axios.post(url, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data.secureUrl;
	} catch (error) {
		console.error('Error uploading file:', error);
		throw new Error('File upload failed');
	}
};

export default uploadFileService;
