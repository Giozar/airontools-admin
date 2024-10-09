import { OtherProduct } from '@interfaces/OtherProduct.interface';
import {
	createOtherProductService,
	getOtherProductsByBrandService,
} from '@services/otherProducts/otherProducts.service';
import { useEffect, useState } from 'react';

export function useCreateOtherProduct() {
	const [otherProduct, setOtherProduct] = useState<OtherProduct>();

	const createOtherProduct = () => {
		if (otherProduct) createOtherProductService(otherProduct);
	};

	return { createOtherProduct, setOtherProduct };
}

export function useGetOtherProductsByBrand() {
	const [otherProducts, setOtherProducts] = useState<OtherProduct[]>();
	const [brand, setBrand] = useState<string>('');

	useEffect(() => {
		const getOtherProducts = async () => {
			const otherProducts = await getOtherProductsByBrandService(brand);
			setOtherProducts(otherProducts);
		};
		getOtherProducts();
	}, [brand]);

	return {
		otherProducts,
		setBrand,
	};
}
