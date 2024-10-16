import { useAlert } from '@contexts/Alert/AlertContext';
import useEditProduct from '@hooks/products/useEditProduct';
import useFetchProduct from '@hooks/products/useFetchProduct';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import { useState } from 'react';
import ProductForm from './ProductForm';

export default function EditProduct() {
	const { editProduct } = useEditProduct();
	const { showAlert } = useAlert();

	const [id] = useState(() => {
		const savedId = localStorage.getItem('ProductToEdit');
		return savedId || '';
	});

	const { product } = useFetchProduct({ id });

	const edit = async (e: Event) => {
		try {
			const updatedProduct = await editProduct(e);
			showAlert(
				`Herramienta ${updatedProduct?.name} actualizada con éxito`,
				'success',
			);
		} catch (err) {
			const error = err as ErrorResponse;
			showAlert(error.message, 'error');
		}
	};

	return (
		<>
			<ProductForm
				key={'Editar Productos'}
				actionName='Guardar cambios de herramienta'
				action={edit}
				initialData={product}
			/>
		</>
	);
}
