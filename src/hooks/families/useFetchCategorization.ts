// hooks/useFetchFamilies.ts
import { useAlert } from '@contexts/Alert/AlertContext';
import { FamilyDataFrontend } from '@interfaces/Family.interface';
import { getcategoryByFamilyId } from '@services/categories/getCategoriesByCategorization.service';
import { getFamiliesService } from '@services/families/getFamilies.service';
import { getSubcategoryByFamilyId } from '@services/subcategories/getSubcategoriesByCategorization.service';
import { useEffect, useState } from 'react';

function useFetchCategorization() {
	const { showAlert } = useAlert();
	const [families, setFamilies] = useState<FamilyDataFrontend[]>([]);
	const [filteredFamilies, setFilteredFamilies] = useState<
		FamilyDataFrontend[]
	>([]);

	const [, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const [updateListFlag, setupdateListFlag] = useState(false);

	useEffect(() => {
		const loadFamilies = async () => {
			try {
				// Fetch families
				const fetchedFamilies = await getFamiliesService();
				setFamilies(fetchedFamilies);
				setFilteredFamilies(fetchedFamilies);
				const familiesWithDetails = await Promise.all(
					fetchedFamilies.map(async family => {
						const categories = await getcategoryByFamilyId(family.id);
						const subcategories = await getSubcategoryByFamilyId(family.id);
						return {
							...family,
							categories,
							subcategories,
						};
					}),
				);
				setFamilies(familiesWithDetails);
				setFilteredFamilies(familiesWithDetails);
			} catch (error) {
				console.error('Failed to fetch families:', error);
				showAlert('Error al cargar las familias', 'error');
			} finally {
				setLoading(false);
			}
		};

		loadFamilies();
	}, [updateListFlag]);

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
		setFamilies,
		filteredFamilies,
		setFilteredFamilies,
		handleSearch,
		setupdateListFlag,
	};
}

export default useFetchCategorization;
