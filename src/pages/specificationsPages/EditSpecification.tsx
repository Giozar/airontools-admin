import { transformSpecDataToBackend } from '@adapters/specifications.adapter';
import EditSpecifications from '@components/specifications/EditSpecifications';
import useFetchSpecification from '@hooks/specifications/useFetchSpecification';
import { useState } from 'react';

export default function EditSpecificationService() {
	const [id] = useState(() => {
		const savedId = localStorage.getItem('specToEdit');
		return savedId || '';
	});

	const { specification } = useFetchSpecification({ id });

	return (
		specification && (
			<EditSpecifications
				specToEdit={transformSpecDataToBackend(specification)}
			/>
		)
	);
}
