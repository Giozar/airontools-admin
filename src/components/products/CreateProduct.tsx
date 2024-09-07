import ErrorMessage from '@components/commons/ErrorMessage';
import SuccessMessage from '@components/commons/SuccessMessage';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import createProductService from '@services/products/createProduct.service';
import ProductForm from './ProductForm';

export default function CreateProduct() {
	const { user } = useAuthContext();
	const { ...newProduct } = useProductCreateContext();
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();
	const createProduct = async (e: Event) => {
		e.preventDefault();
		try {
			console.log(newProduct);
			const requestCreateProduct = await createProductService({
				...newProduct,
				createdBy: user?.id as string,
			});
			showSuccess(`Herramineta ${requestCreateProduct?.name} creado con éxito`);
		} catch (err) {
			const error = err as ErrorResponse;
			showError(error.message);
		}
	};

	return (
		<>
			{successLog.isSuccess && <SuccessMessage message={successLog.message} />}
			{errorLog.isError && <ErrorMessage message={errorLog.message} />}
			<ProductForm actionName='Crear herramienta' callback={createProduct} />
		</>
	);
}
