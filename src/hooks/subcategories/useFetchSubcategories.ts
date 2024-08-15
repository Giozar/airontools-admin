// src/hooks/useFetchSubcategories.ts

import useErrorHandling from '@hooks/common/useErrorHandling';
import { SubcategoryDataFrontend } from '@interfaces/subcategory.interface';
import { getSubcategoriesService } from '@services/subcategories/getSubcategories.service';
import { useEffect, useState } from 'react';

const useFetchSubcategories = () => {
	const { errorLog, showError } = useErrorHandling();
	const [subcategories, setSubcategories] = useState<SubcategoryDataFrontend[]>(
		[],
	);
	const [filteredSubcategories, setFilteredSubcategories] = useState<
		SubcategoryDataFrontend[]
	>([]);

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
	}, []);

	return {
		subcategories,
		loading,
		errorLog,
		setSubcategories,
		filteredSubcategories,
		setFilteredSubcategories,
	};
};

export default useFetchSubcategories;
