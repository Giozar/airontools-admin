import { filesUpload } from '@components/files/helpers/filesUpload.helper';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import { useUploadProductFileUrls } from '@hooks/products/useUploadProductFileUrls.helper';
import createProductService from '@services/products/createProduct.service';

import { useEffect } from 'react';
import useResetProduct from './useResetProduct';

export function useCreateProduct() {
	const { user } = useAuthContext();
	const { ...productToCreate } = useProductCreateContext();
	const { uploadProductFileUrls } = useUploadProductFileUrls();
	const { resetProduct } = useResetProduct();

	useEffect(() => {
		productToCreate.id &&
			uploadProductFileUrls({
				productId: productToCreate.id,
				imageUrls: productToCreate.images,
				manualUrls: productToCreate.manuals,
			});
	}, [productToCreate.id, productToCreate.images, productToCreate.manuals]);

	const createProduct = async (e: Event) => {
		e.preventDefault();

		if (!user?.id) throw new Error('No usuario para crear herramienta');

		const createdProduct = await createProductService({
			...productToCreate,
			createdBy: user?.id,
		});

		if (createdProduct?.id) {
			productToCreate.setId(createdProduct.id);
		}

		productToCreate.imagesRaw.length > 0 &&
			productToCreate &&
			(await filesUpload({
				type: 'images',
				feature: `products/${productToCreate.id}`,
				files: productToCreate.imagesRaw,
				setFiles: productToCreate.setImagesRaw,
				setFileUrls: productToCreate.setImages,
			}));

		productToCreate.manualsRaw.length > 0 &&
			productToCreate &&
			(await filesUpload({
				type: 'manuals',
				feature: `products/${productToCreate.id}`,
				files: productToCreate.manualsRaw,
				setFiles: productToCreate.setManualsRaw,
				setFileUrls: productToCreate.setManuals,
			}));

		if (
			productToCreate.imagesRaw.length === 0 &&
			productToCreate.manualsRaw.length === 0
		) {
			resetProduct();
		}

		return createdProduct;
	};

	return {
		createProduct,
	};
}
