export function filterEmptyCategorizations(
	categorizations: string[],
): string[] {
	const isValidMongoId = (id: string) => /^[a-f\d]{24}$/i.test(id);
	console.log('hola', categorizations);
	return categorizations.filter(id => isValidMongoId(id) && id.trim() !== '');
}
