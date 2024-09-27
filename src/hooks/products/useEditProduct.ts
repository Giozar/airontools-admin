import { filesUpload } from '@components/files/helpers/filesUpload.helper';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import { deleteFileService } from '@services/files/deleteFile.service';
import updateProductService from '@services/products/updateProduct.service';
import {
	uploadProductUrlImagesService,
	uploadProductUrlManualService,
} from '@services/products/uploadProductAssets.service';

export default function useEditProduct() {
	const { user } = useAuthContext();
	const { ...productToEdit } = useProductCreateContext();
	const editProduct = async (e: Event) => {
		e.preventDefault();
		if (!user?.id) throw new Error('No hay usuario para editar herramienta');

		if (!productToEdit?.id)
			throw new Error('No existe el id de la herramienta');

		const updatedProduct = await updateProductService(productToEdit.id, {
			...productToEdit,
			updatedBy: user?.id,
		});

		if (productToEdit.imagesRaw && productToEdit.imagesRaw.length > 0) {
			const newImageUrls = await filesUpload({
				type: 'images',
				feature: `products/${productToEdit.id}`,
				files: productToEdit.imagesRaw,
				setFiles: productToEdit.setImagesRaw,
				setFileUrls: productToEdit.setImages,
			});

			await uploadProductUrlImagesService({
				productId: productToEdit.id,
				images: [...productToEdit.images, ...newImageUrls],
			});

			productToEdit.setImages([...productToEdit.images, ...newImageUrls]);
			productToEdit.setImagesRaw([]);
		}

		if (productToEdit.manualsRaw && productToEdit.manualsRaw.length > 0) {
			const newManualUrls = await filesUpload({
				type: 'manuals',
				feature: `products/${productToEdit.id}`,
				files: productToEdit.manualsRaw,
				setFiles: productToEdit.setManualsRaw,
				setFileUrls: productToEdit.setManuals,
			});
			await uploadProductUrlManualService({
				productId: productToEdit.id,
				manuals: [...productToEdit.manuals, ...newManualUrls],
			});
			productToEdit.setManuals([...productToEdit.manuals, ...newManualUrls]);
			productToEdit.setManualsRaw([]);
		}

		if (productToEdit.imagesRemoved && productToEdit.imagesRemoved.length > 0) {
			console.log(productToEdit.imagesRemoved);
			await Promise.all(
				productToEdit.imagesRemoved.map(imageRemoved =>
					deleteFileService(imageRemoved),
				),
			).finally(() => {
				productToEdit.setImagesRemoved([]);
			});
		}

		if (
			productToEdit.manualsRemoved &&
			productToEdit.manualsRemoved.length > 0
		) {
			console.log(productToEdit.manualsRemoved);
			await Promise.all(
				productToEdit.manualsRemoved.map(manualRemoved =>
					deleteFileService(manualRemoved),
				),
			).finally(() => {
				productToEdit.setManualsRemoved([]);
			});
		}

		return updatedProduct;
	};

	return { editProduct };
}
