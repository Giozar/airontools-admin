import ErrorMessage from '@components/commons/ErrorMessage';
import SuccessMessage from '@components/commons/SuccessMessage';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import useEditProduct from '@hooks/products/useEditProduct';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import { useEffect, useState } from 'react';
import ProductForm from './ProductForm';

export default function EditProduct() {
	const { editProduct } = useEditProduct();
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();

	const initialState = {
		spec: { _id: 'N/A', name: 'Desconocido' },
	};

	const [state, setState] = useState(() => {
		const savedState = localStorage.getItem('ProductToEdit');
		return savedState ? JSON.parse(savedState) : initialState;
	});

	const edit = async (e: Event) => {
		try {
			const updatedProduct = await editProduct(e);

			// Actualizar el estado después de la edición
			const newState = {
				...state,
				...updatedProduct,
			};

			setState(newState);
			localStorage.setItem('ProductToEdit', JSON.stringify(newState)); // Actualizar localStorage con los cambios
			showSuccess(`Herramienta ${updatedProduct?.name} actualizada con éxito`);
		} catch (err) {
			const error = err as ErrorResponse;
			showError(error.message);
		}
	};

	// Actualizar el localStorage cada vez que el estado cambie
	useEffect(() => {
		localStorage.setItem('ProductToEdit', JSON.stringify(state));
	}, [state]);

	return (
		<>
			{successLog.isSuccess && <SuccessMessage message={successLog.message} />}
			{errorLog.isError && <ErrorMessage message={errorLog.message} />}
			<ProductForm
				key={'Editar Productos'}
				actionName='Editar herramientas'
				action={edit}
				initialData={state}
			/>
		</>
	);
}
