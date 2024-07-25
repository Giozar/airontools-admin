import {
	SubcategoryBackend,
	SubcategoryFrontend,
	transformSubcategoryData,
} from '@adapters/subcategory.adapter';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useErrorHandling from './common/useErrorHandling';

function useFetchSubcategories() {
	const { errorLog, showError } = useErrorHandling();
	const [subcategories, setSubcategories] = useState<SubcategoryFrontend[]>([]);
	const [filteredSubcategories, setFilteredSubcategories] = useState<
		SubcategoryFrontend[]
	>([]);
	const [, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchSubcategories = async () => {
			try {
				const response = await axios.get<SubcategoryBackend[]>(
					import.meta.env.VITE_API_URL + '/subcategories',
				);
				setSubcategories(response.data.map(transformSubcategoryData));
				setFilteredSubcategories(response.data.map(transformSubcategoryData));
				setLoading(false);
			} catch (error) {
				console.error('Failed to fetch categories:', error);
				showError('Error al cargar las categorias');
				setLoading(false);
			}
		};

		fetchSubcategories();
	}, []); // Empty dependency array ensures this effect runs only once

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
	};
}

export default useFetchSubcategories;
