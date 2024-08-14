// src/hooks/useFetchSubcategories.ts

import { SubcategoryDataFrontend } from '@interfaces/subcategory.interface';
import { getSubcategoriesService } from '@services/subcategories/getSubcategories.service';
import { useEffect, useState } from 'react';
import useErrorHandling from '../common/useErrorHandling';

const useFetchSubcategories = () => {
	const { errorLog, showError } = useErrorHandling();
	const [subcategories, setSubcategories] = useState<SubcategoryDataFrontend[]>(
		[],
	);
	const [filteredSubcategories, setFilteredSubcategories] = useState<
		SubcategoryDataFrontend[]
	>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchSubcategories = async () => {
			try {
				const data = await getSubcategoriesService();
				setSubcategories(data);
				setFilteredSubcategories(data);
				setLoading(false);
			} catch (error) {
				showError('Error al cargar las subcategorías');
				setLoading(false);
			}
		};

		fetchSubcategories();
	}, [showError]);

	const handleSearch = (term: string) => {
		const lowercaseTerm = term.toLowerCase();
		setSearchTerm(lowercaseTerm);
		const filtered = subcategories.filter(subcategory =>
			subcategory.name.toLowerCase().includes(lowercaseTerm),
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
};

export default useFetchSubcategories;
