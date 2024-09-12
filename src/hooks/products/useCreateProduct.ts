import { filesUpload } from '@components/files/helpers/filesUpload.helper';
import { uploadProductFileUrls } from '@components/products/helpers/UploadProductFileUrls.helper';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import createProductService from '@services/products/createProduct.service';

import { useEffect } from 'react';

export function useCreateProduct() {
	const { user } = useAuthContext();
	const { ...productToCreate } = useProductCreateContext();

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
				feature: 'products',
				files: productToCreate.imagesRaw,
				setFiles: productToCreate.setImagesRaw,
				setFileUrls: productToCreate.setImages,
			}));

		productToCreate.manualsRaw.length > 0 &&
			productToCreate &&
			(await filesUpload({
				type: 'manuals',
				feature: 'products',
				files: productToCreate.manualsRaw,
				setFiles: productToCreate.setManualsRaw,
				setFileUrls: productToCreate.setManuals,
			}));

		return createdProduct;
	};

	return {
		createProduct,
	};
}
