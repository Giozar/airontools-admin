// src/hooks/useFetchCategoriesByFamily.ts

import { transformCategoryDataToFrontend } from '@adapters/category.adapter';
import { useAlert } from '@contexts/Alert/AlertContext';
import { CategoryDataFrontend } from '@interfaces/Category.interface';
import { getCategoriesFromFamilyService } from '@services/categories/getCategoriesByFamily.service';
import { useEffect, useState } from 'react';

const useFetchCategoriesByFamily = (id: string) => {
	const { showAlert } = useAlert();
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
			showAlert('Error al cargar las categorías', 'error');
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
		id && fetchCategories(id);
	}, [id]);

	return {
		categories,
		loading,
		setCategories,
		filteredCategories,
		setFilteredCategories,
		handleSearch,
		fetchCategories,
	};
};

export default useFetchCategoriesByFamily;
