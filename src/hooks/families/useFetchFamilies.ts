// hooks/useFetchFamilies.ts
import useErrorHandling from '@hooks/common/useErrorHandling';
import { FamilyDataFrontend } from '@interfaces/Family.interface';
import { getFamiliesService } from '@services/families/getFamilies.service';
import { useEffect, useState } from 'react';

function useFetchFamilies(updateListFlag?: boolean) {
	const { errorLog, showError } = useErrorHandling();
	const [families, setFamilies] = useState<FamilyDataFrontend[]>([]);
	const [filteredFamilies, setFilteredFamilies] = useState<
		FamilyDataFrontend[]
	>([]);
	const [, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const loadFamilies = async () => {
			try {
				const fetchedFamilies = await getFamiliesService();
				setFamilies(fetchedFamilies);
				setFilteredFamilies(fetchedFamilies);
			} catch (error) {
				console.error('Failed to fetch families:', error);
				showError('Error al cargar las familias');
			} finally {
				setLoading(false);
			}
		};

		loadFamilies();
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