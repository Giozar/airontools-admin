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

export default async function createProductService(product: ProductDataToSend) {
	try {
		// console.log(createToolData);
		// console.log(createToolData.specifications);

		// Paso 1: Crear el producto
		const response = await axios.post<ProductDataBackend>(
			`${airontoolsAPI}/products`,
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
		const createdProduct = transformProductDataToFrontend(response.data);

		return createdProduct;
	} catch (error) {
		errorHandler(error);
	}
}
