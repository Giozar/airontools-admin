import useErrorHandling from '@hooks/common/useErrorHandling';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { getSpecificationsByCategoryId } from '@services/specifications/getSpecificationsByCategorization.service';
import { useEffect, useState } from 'react';

export function useSpecificationsByCategory(id: string) {
	const { errorLog, showError } = useErrorHandling();
	const [specificationsByCategoryId, setSpecificationsByCategoryId] = useState<
		SpecDataFrontend[]
	>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchSpecificationsByCategoryId = async (id: string) => {
		try {
			setLoading(true);
			const specsCategoryIdResponse = await getSpecificationsByCategoryId(id);
			if (specsCategoryIdResponse) {
				setSpecificationsByCategoryId(specsCategoryIdResponse);
			}
		} catch (error) {
			showError('Error al cargar las especificaciones por Id de Categoría');
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
		errorLog,
	};
}
