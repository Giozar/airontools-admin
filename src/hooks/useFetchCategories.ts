import { transformCategoryDataToFrontend } from '@adapters/category.adapter';
import {
	CategoryDataBackend,
	CategoryDataFrontend,
} from '@interfaces/Category.interface';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useErrorHandling from './common/useErrorHandling';

function useFetchCategories() {
	const { errorLog, showError } = useErrorHandling();
	const [categories, setCategories] = useState<CategoryDataFrontend[]>([]);
	const [filteredCategories, setFilteredCategories] = useState<
		CategoryDataFrontend[]
	>([]);
	const [, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get<CategoryDataBackend[]>(
					import.meta.env.VITE_API_URL + '/categories',
				);
				setCategories(response.data.map(transformCategoryDataToFrontend));
				setFilteredCategories(
					response.data.map(transformCategoryDataToFrontend),
				);
				setLoading(false);
			} catch (error) {
				console.error('Failed to fetch categories:', error);
				showError('Error al cargar las categorias');
				setLoading(false);
			}
		};

		fetchCategories();
	}, []); // Empty dependency array ensures this effect runs only once

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
	};
}

export default useFetchCategories;
