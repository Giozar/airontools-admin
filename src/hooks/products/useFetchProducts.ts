import { useAlert } from '@contexts/Alert/AlertContext';
import { ProductDataFrontend } from '@interfaces/Product.interface';
import { getProductsService } from '@services/products/getProducts.service';
import { useEffect, useState } from 'react';

const useFetchProducts = () => {
	const { showAlert } = useAlert();
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
				showAlert('Error al cargar las subcategorías', 'error');
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return {
		products,
		loading,
		setProducts,
		filteredProducts,
		setFilteredProducts,
	};
};

export default useFetchProducts;
