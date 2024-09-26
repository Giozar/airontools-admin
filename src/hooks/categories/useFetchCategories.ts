import { transformCategoryDataToFrontend } from '@adapters/category.adapter';
import { useAlert } from '@contexts/Alert/AlertContext';
import { CategoryDataFrontend } from '@interfaces/Category.interface';
import { getCategoriesService } from '@services/categories/getCategories.service';
import { useEffect, useState } from 'react';

function useFetchCategories() {
	const { showAlert } = useAlert();
	const [categories, setCategories] = useState<CategoryDataFrontend[]>([]);
	const [filteredCategories, setFilteredCategories] = useState<
		CategoryDataFrontend[]
	>([]);
	const [, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categoriesResponse = await getCategoriesService();
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
				showAlert('Error al cargar las categorías', 'error');
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
		setCategories,
		filteredCategories,
		setFilteredCategories,
		handleSearch,
	};
}

export default useFetchCategories;
