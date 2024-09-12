import uploadFileService from '@services/files/fileUpload.service';
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
