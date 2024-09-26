import { useAlert } from '@contexts/Alert/AlertContext';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { getSpecificationsByCategoryIdService } from '@services/specifications/getSpecificationsByCategorization.service';
import { useEffect, useState } from 'react';

export function useSpecificationsByCategory(id: string) {
	const { showAlert } = useAlert();
	const [specificationsByCategoryId, setSpecificationsByCategoryId] = useState<
		SpecDataFrontend[]
	>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchSpecificationsByCategoryId = async (id: string) => {
		try {
			setLoading(true);
			const specsCategoryIdResponse =
				await getSpecificationsByCategoryIdService(id);
			if (specsCategoryIdResponse) {
				setSpecificationsByCategoryId(specsCategoryIdResponse);
			}
		} catch (error) {
			showAlert(
				'Error al cargar las especificaciones por Id de Categoría',
				'error',
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		id && fetchSpecificationsByCategoryId(id);
	}, [id]);

	return {
		specificationsByCategoryId,
		loadingSpecificationsByCategory: loading,
	};
}
