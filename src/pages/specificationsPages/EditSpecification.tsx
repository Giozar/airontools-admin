import EditSpecifications from '@components/specifications/EditSpecifications';
import { useEffect, useState } from 'react';

export default function EditSpecification() {
	const initialState = {
		spec: { id: 'N/A', name: 'Desconocido' },
	};

	const [state] = useState(() => {
		const savedState = localStorage.getItem('specToEdit');
		return savedState ? JSON.parse(savedState) : initialState;
	});

	useEffect(() => {
		localStorage.setItem('specToEdit', JSON.stringify(state));
	}, [state]);

	return (
			<EditSpecifications specToEdit={state} />
	);
}