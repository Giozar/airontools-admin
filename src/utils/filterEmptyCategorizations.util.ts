export function filterEmptyCategorizations(
	categorizations: string[],
): string[] {
	const isValidMongoId = (id: string) => /^[a-f\d]{24}$/i.test(id);
	return categorizations.filter(id => isValidMongoId(id) && id.trim() !== '');
}
