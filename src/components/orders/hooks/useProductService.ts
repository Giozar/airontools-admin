import { OrderProduct } from '@interfaces/OrderProduct.interface';
import { CreateOtherProduct } from '@interfaces/OtherProduct.interface';
import {
	createOtherProductService,
	getOtherProductsByBrandService,
} from '@services/otherProducts/otherProducts.service';
import { errorHandler } from '@utils/errorHandler.util';
import { useState } from 'react';

export function useOrderProductService() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const findOrCreateProduct = async (product: OrderProduct) => {
		setIsLoading(true);
		setError(null);

		try {
			let foundProduct = await searchInternalDatabase(product);
			if (foundProduct.length <= 0 && product.brand !== 'airontools') {
				foundProduct = await searchExternalDatabase(product);
			}
			if (!foundProduct) {
				if (product.brand === 'airontools') {
					throw new Error('Producto no encontrado en la base de datos interna');
				} else {
					foundProduct = await createNewProduct(product);
				}
			}
			setIsLoading(false);
			return foundProduct;
		} catch (err) {
			setIsLoading(false);
			console.log(err);
			throw errorHandler(err);
		}
	};

	// Funciones simuladas para las operaciones de base de datos
	const searchInternalDatabase = async (product: OrderProduct) => {
		const response = await getOtherProductsByBrandService(product.brand);
		return response.filter(p => product.model === p.name);
	};

	const searchExternalDatabase = async (product: OrderProduct) => {
		const response = await getOtherProductsByBrandService(product.brand);
		return response.filter(p => product.model === p.name);
	};

	const createNewProduct = async (product: CreateOtherProduct) => {
		const response = await createOtherProductService(product);
		return response;
	};

	return { findOrCreateProduct, isLoading, error };
}
