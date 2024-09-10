import { airontoolsAPI } from '@configs/api.config';
import axios from 'axios';

export async function uploadProductUrlImages({
	productId,
	images,
}: {
	productId: string;
	images: string[];
}) {
	await axios.patch(airontoolsAPI + '/products/' + productId, {
		images: images,
	});
}

export async function uploadProductUrlManual({
	productId,
	manuals,
}: {
	productId: string;
	manuals: string[];
}) {
	await axios.patch(airontoolsAPI + '/products/' + productId, {
		manuals: manuals,
	});
}
