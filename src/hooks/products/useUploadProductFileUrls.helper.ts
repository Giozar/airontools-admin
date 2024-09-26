import {
	uploadProductUrlImagesService,
	uploadProductUrlManualService,
} from '@services/products/uploadProductAssets.service';

interface UploadProductFileUrlsArgs {
	productId: string;
	imageUrls: string[];
	manualUrls: string[];
}
export function useUploadProductFileUrls() {
	const uploadProductFileUrls = async ({
		productId,
		imageUrls,
		manualUrls,
	}: UploadProductFileUrlsArgs) => {
		productId &&
			imageUrls &&
			imageUrls.length > 0 &&
			(await uploadProductUrlImagesService({
				productId,
				images: imageUrls,
			}));

		productId &&
			manualUrls &&
			manualUrls.length > 0 &&
			(await uploadProductUrlManualService({
				productId,
				manuals: manualUrls,
			}));
	};

	return { uploadProductFileUrls };
}
