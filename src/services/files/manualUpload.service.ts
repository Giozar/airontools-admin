import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

interface Manual {
	id: number;
	file: File | null;
	fileUrl: string;
}

export const uploadManuals = async (manuals: Manual[]) => {
	const formData = new FormData();

	manuals.forEach((manual, index) => {
		if (manual.file) {
			formData.append(`manual_${index}`, manual.file);
		}
	});

	try {
		const response = await axios.post('/api/upload-manuals', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
};
