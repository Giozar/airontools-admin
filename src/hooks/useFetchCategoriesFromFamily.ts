import {
	CategoryBackend,
	CategoryFrontend,
	transformCategoryData,
} from '@adapters/category.adapter';
import axios from 'axios';
import { useState } from 'react';
import useErrorHandling from './useErrorHandling';

function useFetchCategoriesFromFamily() {
	const { errorLog, showError } = useErrorHandling();
	const [categories, setCategories] = useState<CategoryFrontend[]>([]);
	const [filteredCategories, setFilteredCategories] = useState<
		CategoryFrontend[]
	>([]);
	const [, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

	const fetchCategories = async (familyId: string) => {
		try {
			const response = await axios.get<CategoryBackend[]>(
				`http://localhost:4000/categories?familyId=${familyId}`,
			);
			setCategories(response.data.map(transformCategoryData));
			setFilteredCategories(response.data.map(transformCategoryData));
			setLoading(false);
		} catch (error) {
			console.error('Failed to fetch categories:', error);
			showError('Error al cargar las categorias');
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
}

export default useFetchCategoriesFromFamily;
