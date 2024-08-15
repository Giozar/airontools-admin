// hooks/useFetchFamilies.ts
import useErrorHandling from '@hooks/common/useErrorHandling';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { getSpecifications } from '@services/specifications/getSpecifications.service';
import { useEffect, useState } from 'react';

function useFetchSpecifications() {
	const { errorLog, showError } = useErrorHandling();
	const [specifications, setSpecifications] = useState<SpecDataFrontend[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchSpecifications = async () => {
			try {
				const specs = await getSpecifications();
				setSpecifications(specs);
				console.log(specs);
			} catch (error) {
				showError('Error al cargar las familias');
			} finally {
				setLoading(false);
			}
		};
		fetchSpecifications();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		specifications,
		loading,
		errorLog,
		setSpecifications,
	};
}

export default useFetchSpecifications;
