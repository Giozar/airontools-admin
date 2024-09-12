import { useEffect, useState } from 'react';
import ProductForm from './ProductForm';

export default function EditProduct() {
	const initialState = {
		spec: { _id: 'N/A', name: 'Desconocido' },
	};

	const [state] = useState(() => {
		const savedState = localStorage.getItem('ProductToEdit');
		return savedState ? JSON.parse(savedState) : initialState;
	});

	useEffect(() => {
		localStorage.setItem('ProductToEdit', JSON.stringify(state));
	}, [state]);
	return (
		<ProductForm
			key={'Editar Productos'}
			actionName='Editar herramientas'
			action={async (e: Event) => {
				console.log('Editar productos', e);
			}}
			initialData={state}
		/>
	);
}
