import { ProductDataFrontend } from '@interfaces/Product.interface';
import { getProductService } from '@services/products/getProduct.service';
import { useEffect, useState } from 'react';

export default function useFetchProduct({ id }: { id: string }) {
	const [product, setProduct] = useState<ProductDataFrontend>();

	useEffect(() => {
		if (id) {
			const fetchProduct = async () => {
				const product = await getProductService({ id });
				setProduct(product);
			};
			fetchProduct();
		}
	}, [id]);

	return { product };
}
