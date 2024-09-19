// src/hooks/useFetchSubcategoriesByFamily.ts

import { transformSubcategoryDataToFrontend } from '@adapters/subcategory.adapter';
import { useAlert } from '@contexts/Alert/AlertContext';
import { SubcategoryDataFrontend } from '@interfaces/subcategory.interface';
import { getSubcategoriesByFamilyService } from '@services/subcategories/getSubcategoriesByFamily.service';
import { useEffect, useState } from 'react';

const useFetchSubcategoriesByFamily = (id: string) => {
	const { showAlert } = useAlert();
	const [subcategories, setSubcategories] = useState<SubcategoryDataFrontend[]>(
		[],
	);
	const [filteredSubcategories, setFilteredSubcategories] = useState<
		SubcategoryDataFrontend[]
	>([]);
	const [, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

	const fetchSubcategories = async (categoryId: string) => {
		setLoading(true);
		try {
			const backendSubcategories =
				await getSubcategoriesByFamilyService(categoryId);
			const frontendSubcategories = backendSubcategories.map(
				transformSubcategoryDataToFrontend,
			);
			setSubcategories(frontendSubcategories);
			setFilteredSubcategories(frontendSubcategories);
		} catch (error) {
			console.error('Failed to fetch subcategories:', error);
			showAlert('Error al cargar las subcategorías', 'error');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		id && fetchSubcategories(id);
	}, [id]);

	const handleSearch = (searchTerm: string) => {
		const term = searchTerm.toLowerCase();
		setSearchTerm(term);
		const filtered = subcategories.filter(subcategory =>
			subcategory.name.toLowerCase().includes(term),
		);
		setFilteredSubcategories(filtered);
	};

	return {
		subcategories,
		loading,
		setSubcategories,
		filteredSubcategories,
		setFilteredSubcategories,
		handleSearch,
		fetchSubcategories,
	};
};

export default useFetchSubcategoriesByFamily;
