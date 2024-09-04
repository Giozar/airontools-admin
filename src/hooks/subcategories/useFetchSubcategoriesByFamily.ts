// src/hooks/useFetchSubcategoriesByFamily.ts

import { transformSubcategoryDataToFrontend } from '@adapters/subcategory.adapter';
import { SubcategoryDataFrontend } from '@interfaces/subcategory.interface';
import { getSubcategoriesByFamilyService } from '@services/subcategories/getSubcategoriesByFamily.service';
import { useState } from 'react';
import useErrorHandling from '../common/useErrorHandling';

const useFetchSubcategoriesByFamily = () => {
	const { errorLog, showError } = useErrorHandling();
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
			showError('Error al cargar las subcategorías');
		} finally {
			setLoading(false);
		}
	};

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
		errorLog,
		setSubcategories,
		filteredSubcategories,
		setFilteredSubcategories,
		handleSearch,
		fetchSubcategories,
	};
};

export default useFetchSubcategoriesByFamily;
