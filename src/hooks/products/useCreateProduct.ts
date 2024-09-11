import { useAuthContext } from '@contexts/auth/AuthContext';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import createProductService from '@services/products/createProduct.service';

import {
	uploadProductUrlImages,
	uploadProductUrlManual,
} from '@services/products/uploadProductAssets.service';

export function useCreateProduct() {
	const { user } = useAuthContext();
	const { ...productToCreate } = useProductCreateContext();

	const createProduct = async (e: Event) => {
		e.preventDefault();

		if (!user?.id) throw new Error('No usuario para crear herramienta');

		const createdProduct = await createProductService({
			...productToCreate,
			createdBy: user?.id,
		});

		// Si se creo el producto
		if (createdProduct) {
			createdProduct.images &&
				createdProduct.images.length &&
				(await uploadProductUrlImages({
					productId: createdProduct.id,
					images: createdProduct.images,
				}));

			createdProduct.manuals &&
				createdProduct.manuals.length &&
				(await uploadProductUrlManual({
					productId: createdProduct.id,
					manuals: createdProduct.manuals,
				}));
		}

		return createdProduct;
	};

	return {
		createProduct,
	};
}
