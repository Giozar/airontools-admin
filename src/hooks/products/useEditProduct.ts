import { filesUpload } from '@components/files/helpers/filesUpload.helper';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import updateProductService from '@services/products/updateProduct.service';

export default function useEditProduct() {
	const { user } = useAuthContext();
	const { ...productToEdit } = useProductCreateContext();
	// const { uploadProductFileUrls } = useUploadProductFileUrls();
	const editProduct = async (e: Event) => {
		e.preventDefault();
		if (!user?.id) throw new Error('No hay usuario para editar herramienta');

		if (!productToEdit?.id)
			throw new Error('No existe el id de la herramienta');

		const updatedProduct = await updateProductService(productToEdit.id, {
			...productToEdit,
			updatedBy: user?.id,
		});

		productToEdit.imagesRaw.length > 0 &&
			productToEdit &&
			(await filesUpload({
				type: 'images',
				feature: `products/${productToEdit.id}`,
				files: productToEdit.imagesRaw,
				setFiles: productToEdit.setImagesRaw,
				setFileUrls: productToEdit.setImages,
			}));

		productToEdit.manualsRaw.length > 0 &&
			productToEdit &&
			(await filesUpload({
				type: 'manuals',
				feature: `products/${productToEdit.id}`,
				files: productToEdit.manualsRaw,
				setFiles: productToEdit.setManualsRaw,
				setFileUrls: productToEdit.setManuals,
			}));
		return updatedProduct;
	};

	return { editProduct };
}
