import { transformFamilyDataToFrontend } from '@adapters/family.adapter';
import {
	FamilyDataBackend,
	FamilyDataFrontend,
} from '@interfaces/Family.interface';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useErrorHandling from './common/useErrorHandling';

function useFetchFamilies(updateListFlag?: boolean) {
	const { errorLog, showError } = useErrorHandling();
	const [families, setFamilies] = useState<FamilyDataFrontend[]>([]);
	const [filteredFamilies, setFilteredFamilies] = useState<
		FamilyDataFrontend[]
	>([]);
	const [, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchFamilies = async () => {
			try {
				const response = await axios.get<FamilyDataBackend[]>(
					import.meta.env.VITE_API_URL + '/families',
				);
				setFamilies(response.data.map(transformFamilyDataToFrontend));
				setFilteredFamilies(response.data.map(transformFamilyDataToFrontend));
				setLoading(false);
			} catch (error) {
				console.error('Failed to fetch families:', error);
				showError('Error al cargar las familias');
				setLoading(false);
			}
		};

		fetchFamilies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateListFlag]); // Empty dependency array ensures this effect runs only once

	const handleSearch = (searchTerm: string) => {
		const term = searchTerm.toLowerCase();
		setSearchTerm(term);
		const filtered = families.filter(family =>
			family.name.toLowerCase().includes(term),
		);
		setFilteredFamilies(filtered);
	};

	return {
		families,
		loading,
		errorLog,
		setFamilies,
		filteredFamilies,
		setFilteredFamilies,
		handleSearch,
	};
}

export default useFetchFamilies;
