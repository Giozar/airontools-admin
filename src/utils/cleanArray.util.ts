export const cleanArray = (arr: string[]): string[] => {
	return arr.filter(str => str.trim() !== '');
};
