import { ProductDataFrontend } from '@interfaces/Product.interface';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const deleteProduct = async (product: ProductDataFrontend) => {
	try {
		const deleteImageAndManuals = async () => {
			const items = (product.images || []).concat(product.manuals || []);
			await Promise.all(items.map(item => axios.delete(item)));
		};

		await deleteImageAndManuals();
		await axios.delete(`${API_URL}/products/${product.id}`);
		return `El producto ${product.name} (${product.id}) ha sido eliminado correctamente.`;
	} catch (error) {
		throw new Error(`No se ha podido eliminar al producto ${product.id}.`);
	}
};