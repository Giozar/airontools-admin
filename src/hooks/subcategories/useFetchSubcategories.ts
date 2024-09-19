// src/hooks/useFetchSubcategories.ts

import { useAlert } from '@contexts/Alert/AlertContext';
import { SubcategoryDataFrontend } from '@interfaces/subcategory.interface';
import { getSubcategoriesService } from '@services/subcategories/getSubcategories.service';
import { useEffect, useState } from 'react';

const useFetchSubcategories = () => {
	const { showAlert } = useAlert();
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
				showAlert('Error al cargar las subcategorías', 'error');
				setLoading(false);
			}
		};

		fetchSubcategories();
	}, []);

	return {
		subcategories,
		loading,
		setSubcategories,
		filteredSubcategories,
		setFilteredSubcategories,
	};
};

export default useFetchSubcategories;
