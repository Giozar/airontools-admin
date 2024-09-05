import EditSpecifications from '@components/specifications/EditSpecifications';
import BasePage from '@layouts/BasePage';
import { useEffect, useState } from 'react';

function ContentMainPage() {
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
		<BasePage title='Editar Especificación'>
			<EditSpecifications specToEdit={state} />
		</BasePage>
	);
}

function EditSpecification() {
	return <ContentMainPage />;
}

export default EditSpecification;
