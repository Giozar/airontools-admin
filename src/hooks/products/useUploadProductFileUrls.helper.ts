import {
	uploadProductUrlImages,
	uploadProductUrlManual,
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
			(await uploadProductUrlImages({
				productId,
				images: imageUrls,
			}));

		productId &&
			manualUrls &&
			manualUrls.length > 0 &&
			(await uploadProductUrlManual({
				productId,
				manuals: manualUrls,
			}));
	};

	return { uploadProductFileUrls };
}