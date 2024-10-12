import { ProductDataFrontend } from '@interfaces/Product.interface';
import { Search } from '@interfaces/Search.interface';
import { getProductsService } from '@services/products/getProducts.service';
import { searchProductsService } from '@services/products/seachProduct.service';
import { errorHandler } from '@utils/errorHandler.util';
import { useCallback, useRef, useState } from 'react';

export default function useProductsSearch() {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState<ProductDataFrontend[]>([]);
	const previusSearch = useRef<Search>();
	// Esta funcion es para que al iniciar la lista se vean todos los elementos
	const fetchAllProducts = useCallback(async () => {
		try {
			setLoading(true);
			const allProducts = await getProductsService(); // Llama a tu servicio para obtener todos los productos
			setProducts(allProducts);
		} catch (error) {
			errorHandler(error);
		} finally {
			setLoading(false);
		}
	}, [setLoading, setProducts]);

	const getSearchedProducts = useCallback(
		async ({ search }: { search: Search }) => {
			if (previusSearch.current === search) return;
			try {
				setLoading(true);
				previusSearch.current = search;
				const newProducts = await searchProductsService(search);
				setProducts(newProducts);
			} catch (error) {
				errorHandler(error);
			} finally {
				setLoading(false);
			}
		},
		[setLoading, setProducts],
	);

	return {
		products,
		getSearchedProducts,
		fetchAllProducts,
		loading,
	};
}
