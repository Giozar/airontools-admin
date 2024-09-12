export function transformFilesToUrls(files: File[]): string[] {
	const urls = files.map(file => URL.createObjectURL(file));
	return urls;
}
