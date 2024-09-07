// src/hooks/useFetchCategoriesFromFamily.ts

import { transformCategoryDataToFrontend } from '@adapters/category.adapter';
import useErrorHandling from '@hooks/common/useErrorHandling';
import { CategoryDataFrontend } from '@interfaces/Category.interface';
import { getCategoriesFromFamilyService } from '@services/categories/getCategoriesByFamily.service';
import { useEffect, useState } from 'react';

const useFetchCategoriesFromFamily = (id: string) => {
	const { errorLog, showError } = useErrorHandling();
	const [categories, setCategories] = useState<CategoryDataFrontend[]>([]);
	const [filteredCategories, setFilteredCategories] = useState<
		CategoryDataFrontend[]
	>([]);
	const [, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

	const fetchCategories = async (familyId: string) => {
		setLoading(true);
		try {
			const backendCategories = await getCategoriesFromFamilyService(familyId);
			const frontendCategories = backendCategories.map(
				transformCategoryDataToFrontend,
			);
			setCategories(frontendCategories);
			setFilteredCategories(frontendCategories);
		} catch (error) {
			console.error('Failed to fetch categories:', error);
			showError('Error al cargar las categorías');
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = (searchTerm: string) => {
		const term = searchTerm.toLowerCase();
		setSearchTerm(term);
		const filtered = categories.filter(category =>
			category.name.toLowerCase().includes(term),
		);
		setFilteredCategories(filtered);
	};

	useEffect(() => {
		fetchCategories(id);
	}, [id]);

	return {
		categories,
		loading,
		errorLog,
		setCategories,
		filteredCategories,
		setFilteredCategories,
		handleSearch,
		fetchCategories,
	};
};

export default useFetchCategoriesFromFamily;
