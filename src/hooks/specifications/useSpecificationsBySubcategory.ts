import useErrorHandling from '@hooks/common/useErrorHandling';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { getSpecificationsBySubcategoryId } from '@services/specifications/getSpecificationsByCategorization.service';
import { useEffect, useState } from 'react';

export function useSpecificationsBySubcategory(id: string) {
	const { errorLog, showError } = useErrorHandling();
	const [specificationsBySubcategoryId, setSpecificationsBySubcategoryId] =
		useState<SpecDataFrontend[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchSpecificationsBySubcategoryId = async (id: string) => {
		try {
			setLoading(true);
			const specsSubcategoryIdResponse =
				await getSpecificationsBySubcategoryId(id);
			if (specsSubcategoryIdResponse) {
				setSpecificationsBySubcategoryId(specsSubcategoryIdResponse);
			}
		} catch (error) {
			showError('Error al cargar las especificaciones por Id de Subcategoría');
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
		errorLog,
	};
}
