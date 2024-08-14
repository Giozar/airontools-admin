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
		return response.data; // Devuelve la respuesta de la API
	} catch (error) {
		console.error('Upload failed:', error);
		throw error; // Lanza el error para que el hook pueda manejarlo
	}
};
