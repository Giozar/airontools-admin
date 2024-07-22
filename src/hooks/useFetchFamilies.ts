import axios from 'axios';
import { useEffect, useState } from 'react';
import useErrorHandling from './useErrorHandling';

interface Family {
	_id: string;
	name: string;
	description: string;
	createdBy: string;
	updatedBy?: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
function useFetchFamilies() {
	const { errorLog, showError } = useErrorHandling();
	const [families, setFamilies] = useState<Family[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchFamilies = async () => {
			try {
				const response = await axios.get<Family[]>(
					'http://localhost:4000/families',
				);
				setFamilies(response.data);
				setLoading(false);
			} catch (error) {
				console.error('Failed to fetch families:', error);
				showError('Error al cargar las familias');
				setLoading(false);
			}
		};

		fetchFamilies();
	}, []); // Empty dependency array ensures this effect runs only once

	return { families, loading, errorLog };
}

export default useFetchFamilies;
