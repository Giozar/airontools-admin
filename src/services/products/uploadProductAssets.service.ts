import { airontoolsAPI } from '@configs/api.config';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function uploadProductUrlImagesService({
	productId,
	images,
}: {
	productId: string;
	images: string[];
}) {
	try {
		const productUpdated = await axios.patch(
			airontoolsAPI + '/products/' + productId,
			{
				images,
			},
		);
		return productUpdated;
	} catch (error) {
		errorHandler(error);
	}
}

export async function uploadProductUrlManualService({
	productId,
	manuals,
}: {
	productId: string;
	manuals: string[];
}) {
	try {
		const productUpdated = await axios.patch(
			airontoolsAPI + '/products/' + productId,
			{
				manuals,
			},
		);
		return productUpdated;
	} catch (error) {
		throw errorHandler(error);
	}
}
