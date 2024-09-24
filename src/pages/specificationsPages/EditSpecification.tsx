import { transformSpecDataToBackend } from '@adapters/specifications.adapter';
import EditSpecifications from '@components/specifications/EditSpecifications';
import useFetchSpecification from '@hooks/specifications/useFetchSpecification';
import { useEffect, useState } from 'react';

export default function EditSpecification() {
	const [id] = useState(() => {
		const savedId = localStorage.getItem('specToEdit');
		return savedId || '';
	});

	const { specification } = useFetchSpecification({ id });

	useEffect(() => {
		console.log(id);
	}, []);

	return (
		specification && (
			<EditSpecifications
				specToEdit={transformSpecDataToBackend(specification)}
			/>
		)
	);
}
