import {
	FamilyBackend,
	FamilyFrontend,
	transformFamilyData,
} from '@adapters/family.adapter';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useErrorHandling from './useErrorHandling';

function useFetchFamilies(updateListFlag: boolean) {
	const { errorLog, showError } = useErrorHandling();
	const [families, setFamilies] = useState<FamilyFrontend[]>([]);
	const [filteredFamilies, setFilteredFamilies] = useState<FamilyFrontend[]>(
		[],
	);
	const [, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchFamilies = async () => {
			try {
				const response = await axios.get<FamilyBackend[]>(
					'http://localhost:4000/families',
				);
				setFamilies(response.data.map(transformFamilyData));
				setFilteredFamilies(response.data.map(transformFamilyData));
				setLoading(false);
			} catch (error) {
				console.error('Failed to fetch families:', error);
				showError('Error al cargar las familias');
				setLoading(false);
			}
		};

		fetchFamilies();
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
