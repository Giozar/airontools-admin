export function formatPathName(input: string): string {
	// Trim leading/trailing spaces, normalize diacritics, and format the string for URL paths
	const formattedPath = input
		.trim() // Remove leading and trailing whitespace
		.normalize('NFD') // Normalize characters with diacritics (e.g., é -> e)
		.replace(/[\u0300-\u036f]/g, '') // Remove diacritic marks
		.replace(/[^\w\s]/gi, '-') // Replace non-alphanumeric characters with dashes
		.replace(/\s+/g, '-') // Replace spaces with dashes
		.replace(/-+/g, '-') // Replace multiple consecutive dashes with a single one
		.toLowerCase(); // Convert to lowercase

	return formattedPath;
}
