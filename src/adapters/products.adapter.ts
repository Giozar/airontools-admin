import {
	ProductDataBackend,
	ProductDataFrontend,
	ProductDataToSend,
} from '@interfaces/Product.interface';
import { transformUserDataFront } from './user.adapter';

export const transformProductDataToFrontend = (
	Product: ProductDataBackend,
): ProductDataFrontend => {
	return {
		id: Product._id,
		name: Product.name,
		model: Product.model,
		description: Product.description,
		characteristics: Product.characteristics,
		specifications: Product.specifications,
		includedItems: Product.includedItems,
		optionalAccessories: Product.optionalAccessories,
		operationRequirements: Product.operationRequirements,
		applications: Product.applications,
		recommendations: Product.recommendations,
		images: Product.images,
		manuals: Product.manuals,
		videos: Product.videos,
		family: Product.family,
		category: Product.category,
		subcategory: Product.subcategory,
		createdBy: transformUserDataFront(Product.createdBy),
		technicalDatasheet: Product.technicalDatasheet,
	};
};

export const transformProductDataToBackend = (
	Product: ProductDataFrontend,
): ProductDataToSend => {
	const transformedSpecifications = Product.specifications.map(spec => ({
		specification: spec.specification._id || '', // id de la especificación
		value: spec.value, // valor para el producto específico
	}));
	return {
		_id: Product.id,
		name: Product.name,
		model: Product.model,
		description: Product.description,
		characteristics: Product.characteristics,
		specifications: transformedSpecifications, // Transformamos las especificaciones aquí
		includedItems: Product.includedItems,
		optionalAccessories: Product.optionalAccessories,
		operationRequirements: Product.operationRequirements,
		applications: Product.applications,
		recommendations: Product.recommendations,
		family: Product.family._id || '', // Extraemos solo el _id
		category: Product.category._id || '', // Extraemos solo el _id
		subcategory: Product.subcategory?._id || '', // Extraemos solo el _id
		images: Product.images,
		manuals: Product.manuals,
		videos: Product.videos,
		createdBy: Product.createdBy.id, // Solo el id del creador
		technicalDatasheet: Product.technicalDatasheet,
	};
};
