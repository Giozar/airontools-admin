// Custom hook to fetch products
import { ErrorResponse } from '@interfaces/ErrorResponse';
import { ProductDataFrontend } from '@interfaces/Product.interface';
import { searchProductsService } from '@services/products/seachProducts.service';
import { useCallback, useState } from 'react';

export default function useProducts() {
	const [products, setProducts] = useState<ProductDataFrontend[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const fetchProducts = useCallback(async (searchTerm: string) => {
		try {
			setLoading(true);
			setError('');
			const newProducts = await searchProductsService(searchTerm);
			setProducts(newProducts);
		} catch (error) {
			const err = error as ErrorResponse;
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		products,
		fetchProducts,
		loading,
		error,
	};
}
