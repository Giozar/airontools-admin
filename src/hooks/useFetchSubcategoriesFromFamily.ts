import { transformSubcategoryDataToFrontend } from '@adapters/subcategory.adapter';
import {
	SubcategoryDataBackend,
	SubcategoryDataFrontend,
} from '@interfaces/subcategory.interface';
import axios from 'axios';
import { useState } from 'react';
import useErrorHandling from './common/useErrorHandling';

function useFetchSubcategoriesFromFamily() {
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
		try {
			const response = await axios.get<SubcategoryDataBackend[]>(
				import.meta.env.VITE_API_URL + `/subcategories?category=${categoryId}`,
			);
			setSubcategories(response.data.map(transformSubcategoryDataToFrontend));
			setFilteredSubcategories(
				response.data.map(transformSubcategoryDataToFrontend),
			);
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
}

export default useFetchSubcategoriesFromFamily;
