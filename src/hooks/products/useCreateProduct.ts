import { filesUpload } from '@components/files/helpers/filesUpload.helper';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import { useUploadProductFileUrls } from '@hooks/products/useUploadProductFileUrls.helper';
import createProductService from '@services/products/createProduct.service';

import { useAlert } from '@contexts/Alert/AlertContext';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import useResetProduct from './useResetProduct';

export function useCreateProduct() {
	const { user } = useAuthContext();
	const { ...productToCreate } = useProductCreateContext();
	const { uploadProductFileUrls } = useUploadProductFileUrls();
	const { resetProduct } = useResetProduct();

	const { showAlert } = useAlert();

	const createProduct = async (e: Event) => {
		e.preventDefault();
		try {
			if (!user?.id) throw new Error('No usuario para crear herramienta');

			const createdProduct = await createProductService({
				...productToCreate,
				createdBy: user?.id,
			});

			if (createdProduct?.id) {
				productToCreate.setId(createdProduct.id);
			}

			if (
				createdProduct?.id &&
				productToCreate.imagesRaw &&
				productToCreate.imagesRaw.length > 0
			) {
				console.log('Subo archivo');
				const imageUrls = await filesUpload({
					type: 'images',
					feature: `products/${createdProduct.id}`,
					files: productToCreate.imagesRaw,
					setFiles: productToCreate.setImagesRaw,
					setFileUrls: productToCreate.setImages,
				});

				await uploadProductFileUrls({
					productId: createdProduct.id,
					imageUrls,
					manualUrls: [],
				});
			}

			if (
				createdProduct?.id &&
				productToCreate.manualsRaw &&
				productToCreate.manualsRaw.length > 0
			) {
				const manualUrls = await filesUpload({
					type: 'manuals',
					feature: `products/${createdProduct.id}`,
					files: productToCreate.manualsRaw,
					setFiles: productToCreate.setManualsRaw,
					setFileUrls: productToCreate.setManuals,
				});
				await uploadProductFileUrls({
					productId: createdProduct.id,
					imageUrls: [],
					manualUrls,
				});
			}

			resetProduct();

			showAlert(
				`Herramienta ${createdProduct?.name} creado con éxito`,
				'success',
			);
		} catch (error) {
			showAlert((error as ErrorResponse).message, 'error');
		}
	};

	return {
		createProduct,
	};
}
