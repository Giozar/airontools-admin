import useErrorHandling from '@hooks/common/useErrorHandling';
import { ProductDataFrontend } from '@interfaces/Product.interface';
import { getProductsService } from '@services/products/getProducts.service';
import { useEffect, useState } from 'react';

const useFetchProducts = () => {
	const { errorLog, showError } = useErrorHandling();
	const [products, setProducts] = useState<ProductDataFrontend[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<
		ProductDataFrontend[]
	>([]);

	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const data = await getProductsService();
				setProducts(data);
				setFilteredProducts(data);
				setLoading(false);
			} catch (error) {
				showError('Error al cargar las subcategorías');
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return {
		products,
		loading,
		errorLog,
		setProducts,
		filteredProducts,
		setFilteredProducts,
	};
};

export default useFetchProducts;
