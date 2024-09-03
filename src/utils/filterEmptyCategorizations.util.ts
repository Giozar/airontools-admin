export function filterEmptyCategorizations(
	categorizations: string[],
): string[] {
	return categorizations.filter(id => id !== null && id.trim() !== '');
}
