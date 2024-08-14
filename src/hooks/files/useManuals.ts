import { uploadManuals } from '@services/files/manualUpload.service';
import { useState } from 'react';

interface Manual {
	id: number;
	file: File | null;
	fileUrl: string;
}

function useManuals() {
	const [manuals, setManuals] = useState<Manual[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

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

	const handleUpload = async () => {
		try {
			const response = await uploadManuals(manuals);
			setSuccess('Upload successful');
			console.log('Upload successful:', response);
			// Actualiza el estado con las URLs de los archivos subidos si es necesario
		} catch (error) {
			setError('Upload failed');
		}
	};

	return {
		manuals,
		addManual,
		removeManual,
		updateManual,
		handleUpload,
		error,
		success,
	};
}

export default useManuals;
