import {
	uploadProductUrlImages,
	uploadProductUrlManual,
} from '@services/products/uploadProductAssets.service';

interface UploadProductFileUrlsArgs {
	productId: string;
	imageUrls: string[];
	manualUrls: string[];
}
export async function uploadProductFileUrls({
	productId,
	imageUrls,
	manualUrls,
}: UploadProductFileUrlsArgs) {
	productId &&
		imageUrls &&
		imageUrls.length > 0 &&
		(await uploadProductUrlImages({
			productId: productId,
			images: imageUrls,
		}));

	productId &&
		manualUrls &&
		manualUrls.length > 0 &&
		(await uploadProductUrlManual({
			productId: productId,
			manuals: manualUrls,
		}));
}
