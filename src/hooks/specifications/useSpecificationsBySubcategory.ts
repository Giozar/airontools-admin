import { useAlert } from '@contexts/Alert/AlertContext';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { getSpecificationsBySubcategoryIdService } from '@services/specifications/getSpecificationsByCategorization.service';
import { useEffect, useState } from 'react';

export function useSpecificationsBySubcategory(id: string) {
	const { showAlert } = useAlert();
	const [specificationsBySubcategoryId, setSpecificationsBySubcategoryId] =
		useState<SpecDataFrontend[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchSpecificationsBySubcategoryId = async (id: string) => {
		try {
			setLoading(true);
			const specsSubcategoryIdResponse =
				await getSpecificationsBySubcategoryIdService(id);
			if (specsSubcategoryIdResponse) {
				setSpecificationsBySubcategoryId(specsSubcategoryIdResponse);
			}
		} catch (error) {
			showAlert(
				'Error al cargar las especificaciones por Id de Subcategoría',
				'error',
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		id && fetchSpecificationsBySubcategoryId(id);
	}, [id]);

	return {
		specificationsBySubcategoryId,
		loadingSpecificationsBySUbcategory: loading,
	};
}
