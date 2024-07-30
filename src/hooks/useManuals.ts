import axios from 'axios';
import { useState } from 'react';

interface Manual {
	id: number;
	file: File | null;
	fileUrl: string;
}

function useManuals() {
	const [manuals, setManuals] = useState<Manual[]>([]);

	const addManual = () => {
		setManuals([...manuals, { id: Date.now(), file: null, fileUrl: '' }]);
	};

	const removeManual = (id: number) => {
		setManuals(manuals.filter(item => item.id !== id));
	};

	const updateManual = (id: number, file: File | null) => {
		setManuals(
			manuals.map(item => (item.id === id ? { ...item, file } : item)),
		);
	};

	const uploadManuals = async () => {
		const formData = new FormData();

		manuals.forEach((manual, index) => {
			if (manual.file) {
				formData.append(`manuals[${index}]`, manual.file);
			}
		});

		try {
			const response = await axios.post('/api/upload-manuals', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log('Upload successful:', response.data);
			// Handle success (e.g., update state with file URLs)
		} catch (error) {
			console.error('Upload failed:', error);
		}
	};

	return { manuals, addManual, removeManual, updateManual, uploadManuals };
}

export default useManuals;
