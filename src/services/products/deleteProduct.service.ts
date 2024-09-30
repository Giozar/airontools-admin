import { airontoolsAPI } from '@configs/api.config';
import { ProductDataFrontend } from '@interfaces/Product.interface';
import { deleteFileService } from '@services/files/deleteFile.service';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const API_URL = airontoolsAPI;

export const deleteProductService = async (product: ProductDataFrontend) => {
	try {
		const deleteImageAndManuals = async () => {
			const items = (product.images || []).concat(product.manuals || []);
			await Promise.all(items.map(item => deleteFileService(item)));
		};

		await deleteImageAndManuals();
		await axios.delete(`${API_URL}/products/${product.id}`);
		return `El producto ${product.name} (${product.id}) ha sido eliminado correctamente.`;
	} catch (error) {
		throw errorHandler(error);
	}
};
