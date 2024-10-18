import uploadFileService from '@services/files/fileUpload.service';
import { errorHandler } from '@utils/errorHandler.util';
interface FilesUploadArgs {
	type: string;
	feature: string;
	files: File[];
	setFiles: (value: File[]) => void;
	setFileUrls: (value: string[]) => void;
}
export async function filesUpload({
	type,
	feature,
	files,
	setFiles,
	setFileUrls,
}: FilesUploadArgs) {
	const urls: string[] = [];

	for (const file of files) {
		try {
			const url = await uploadFileService(file, type, feature);
			urls.push(url);
		} catch (error) {
			console.error('No se pudo subir archivo:', file.name, error);
		}
	}

	// Limpia los estados
	setFiles([]);
	setFileUrls(urls);
	return urls;
}

interface FileUploadArgs {
	type: string;
	feature: string;
	file: File | null;
	setFile: (value: File | null) => void;
	setFileUrl: (value: string) => void;
}
export async function fileUpload({
	type,
	feature,
	file,
	setFile,
	setFileUrl,
}: FileUploadArgs) {
	try {
		if (!file) return;
		const url = await uploadFileService(file, type, feature);
		setFileUrl(url);
		// Limpia los estados
		setFile(null);
		return url;
	} catch (error) {
		console.error('No se pudo subir archivo:', (file as File).name, error);
		throw errorHandler(error);
	}
}
