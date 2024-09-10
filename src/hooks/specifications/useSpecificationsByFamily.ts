import useErrorHandling from '@hooks/common/useErrorHandling';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { getSpecificationsByFamilyId } from '@services/specifications/getSpecificationsByCategorization.service';
import { useEffect, useState } from 'react';

export function useSpecificationsByFamily(id: string) {
	const { errorLog, showError } = useErrorHandling();
	const [specificationsByFamilyId, setSpecificationsByFamilyId] = useState<
		SpecDataFrontend[]
	>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchSpecificationsByFamilyId = async (id: string) => {
		try {
			setLoading(true);
			const specsFamilyIdResponse = await getSpecificationsByFamilyId(id);
			if (specsFamilyIdResponse) {
				setSpecificationsByFamilyId(specsFamilyIdResponse);
			}
		} catch (error) {
			showError('Error al cargar las especificaciones por Id de Familia');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		id && fetchSpecificationsByFamilyId(id);
	}, [id]);

	return {
		specificationsByFamilyId,
		loadingSpecificationsByFamily: loading,
		errorLog,
	};
}
