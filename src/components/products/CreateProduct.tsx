import ErrorMessage from '@components/commons/ErrorMessage';
import SuccessMessage from '@components/commons/SuccessMessage';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { useCreateProduct } from '@hooks/products/useCreateProduct';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import ProductForm from './ProductForm';

export default function CreateProduct() {
	const { createProduct } = useCreateProduct();
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();

	const create = async (e: Event) => {
		try {
			const createdProduct = await createProduct(e);
			showSuccess(`Herramienta ${createdProduct?.name}`);
		} catch (err) {
			const error = err as ErrorResponse;
			showError(error.message);
		}
	};

	return (
		<>
			{successLog.isSuccess && <SuccessMessage message={successLog.message} />}
			{errorLog.isError && <ErrorMessage message={errorLog.message} />}
			<ProductForm actionName='Crear herramienta' action={create} />
		</>
	);
}
