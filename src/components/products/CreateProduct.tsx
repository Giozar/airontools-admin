import { useAlert } from '@contexts/Alert/AlertContext';
import { useCreateProduct } from '@hooks/products/useCreateProduct';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import ProductForm from './ProductForm';

export default function CreateProduct() {
	const { showAlert } = useAlert();
	const { createProduct } = useCreateProduct();

	const create = async (e: Event) => {
		try {
			const createdProduct = await createProduct(e);
			showAlert(`Herramienta ${createdProduct?.name}`, 'success');
		} catch (err) {
			const error = err as ErrorResponse;
			showAlert(error.message, 'error');
		}
	};

	return (
		<>
			<ProductForm actionName='Crear herramienta' action={create} />
		</>
	);
}
