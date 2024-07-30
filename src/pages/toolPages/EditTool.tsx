import HeaderTitle from '@components/HeaderTitle';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import { useEffect, useState } from 'react';

function ContentMainPage() {
	const initialState = {
		spec: { id: 'N/A', name: 'Desconocido' },
	};

	const [state] = useState(() => {
		const savedState = localStorage.getItem('ProductToEdit');
		return savedState ? JSON.parse(savedState) : initialState;
	});

	useEffect(() => {
		localStorage.setItem('ProductToEdit', JSON.stringify(state));
	}, [state]);

	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Editar Herramienta' />
				<p>{state.name}</p>
			</main>
		</BasePage>
	);
}

function EditTool() {
	return <ContentMainPage />;
}

export default EditTool;
