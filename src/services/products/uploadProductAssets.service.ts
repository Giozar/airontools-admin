import { airontoolsAPI } from '@configs/api.config';
import axios from 'axios';

export async function uploadProductUrlImages(
	productId: string,
	uploadedUrlImages: string[],
) {
	await axios.patch(airontoolsAPI + '/products/' + productId, {
		images: uploadedUrlImages,
	});
}

export async function uploadProductUrlManual(
	productId: string,
	uploadedUrlManuals: string[],
) {
	await axios.patch(airontoolsAPI + '/products/' + productId, {
		manuals: uploadedUrlManuals,
	});
}
