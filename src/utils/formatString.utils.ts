export function formatString(name: string) {
	// Replaces special characters with their non-accented equivalents
	const cleanedName = name
		.trim()
		.normalize('NFD') // Normalize characters with diacritics
		.replace(/[\u0300-\u036f]/g, '') // Remove diacritics
		.replace(/[^\w\s]/gi, '-') // Remove special characters except letters and spaces
		.replace(/\s+/g, '-') // Replace spaces with dashes
		.replace(/-+/g, '-') // Replace multiple dashes with a single one
		.toLowerCase(); // Convert to lowercase

	return cleanedName;
}
