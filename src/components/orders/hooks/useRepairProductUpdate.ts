// useProductUpdate.ts
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useOrderContext } from '@contexts/order/OrderContext';
import { useEffect } from 'react';
import { OrderProduct } from '../../../interfaces/OrderProduct.interface';

export const useOrderProduct = (index: number) => {
	const { products, setProducts } = useOrderContext();
	const { user } = useAuthContext();
	const createdBy = user?.id || 'user';

	useEffect(() => {
		if (index === 0) updateProduct({ createdBy: createdBy });
	}, [createdBy]);

	const updateProduct = (updates: Partial<OrderProduct>) => {
		const newProduct = { ...products[index], ...updates };
		const newProducts = [...products];
		newProducts[index] = newProduct;
		setProducts(newProducts);
	};

	const addProduct = () => {
		setProducts([
			...products,
			{
				quantity: 1,
				brand: '',
				model: '',
				serialNumber: '',
				description: '',
				observation: '',
				rawImage: null,
				createdBy,
			},
		]);
	};

	const removeProduct = (indexToRemove: number) => {
		setProducts(products.filter((_, idx) => idx !== indexToRemove));
	};

	return { updateProduct, addProduct, removeProduct, product: products[index] };
};
