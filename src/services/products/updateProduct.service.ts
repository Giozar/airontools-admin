import { transformProductDataToFrontend } from '@adapters/products.adapter';
import { airontoolsAPI } from '@configs/api.config';
import {
	ProductDataBackend,
	ProductDataToSend,
} from '@interfaces/Product.interface';
import { ProductSpecification } from '@interfaces/Specifications.interface';
import { cleanArray } from '@utils/cleanArray.util';
import { errorHandler } from '@utils/errorHandler.util';
import { filterEmptySpecifications } from '@utils/filterEmptySpecifications.util';
import axios from 'axios';

export default async function updateProductService(
	productId: string,
	product: ProductDataToSend,
) {
	try {
		// Paso 1: Actualizar el producto
		const response = await axios.patch<ProductDataBackend>(
			`${airontoolsAPI}/products/${productId}`,
			{
				...product,
				characteristics: cleanArray(product.characteristics as string[]),
				includedItems: cleanArray(product.includedItems as string[]),
				optionalAccessories: cleanArray(
					product.optionalAccessories as string[],
				),
				operationRequirements: cleanArray(
					product.operationRequirements as string[],
				),
				applications: cleanArray(product.applications as string[]),
				recommendations: cleanArray(product.recommendations as string[]),
				specifications: filterEmptySpecifications(
					product.specifications as ProductSpecification[],
				),
				videos: cleanArray(product.videos as string[]),
			},
		);
		const updatedProduct = transformProductDataToFrontend(response.data);

		return updatedProduct;
	} catch (error) {
		throw errorHandler(error);
	}
}
