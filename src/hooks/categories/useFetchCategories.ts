import { transformCategoryDataToFrontend } from '@adapters/category.adapter';
import { CategoryDataFrontend } from '@interfaces/Category.interface';
import { getCategories } from '@services/categories/getCategories.service';
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
				const categoriesResponse = await getCategories();
				categoriesResponse &&
					setCategories(
						categoriesResponse.map(transformCategoryDataToFrontend),
					);
				categoriesResponse &&
					setFilteredCategories(
						categoriesResponse.map(transformCategoryDataToFrontend),
					);
				setLoading(false);
			} catch (error) {
				showError('Error al cargar las categorías');
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
