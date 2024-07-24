import {
	CategoryBackend,
	CategoryFrontend,
	transformCategoryData,
} from '@adapters/category.adapter';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useErrorHandling from './common/useErrorHandling';

function useFetchCategories() {
	const { errorLog, showError } = useErrorHandling();
	const [categories, setCategories] = useState<CategoryFrontend[]>([]);
	const [filteredCategories, setFilteredCategories] = useState<
		CategoryFrontend[]
	>([]);
	const [, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get<CategoryBackend[]>(
					'http://localhost:4000/categories',
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
