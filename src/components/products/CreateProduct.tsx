import { useCreateProduct } from '@hooks/products/useCreateProduct';
import ProductForm from './ProductForm';

export default function CreateProduct() {
	const { createProduct } = useCreateProduct();
	return (
		<ProductForm actionName='Guardar herramienta' action={createProduct} />
	);
}
