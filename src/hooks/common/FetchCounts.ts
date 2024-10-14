import { airontoolsAPI } from '@configs/api.config';
import axios from 'axios';

interface FetchCountsOptions {
	fetchCategories?: boolean;
	fetchSubcategories?: boolean;
	fetchSpecifications?: boolean;
	fetchProducts?: boolean;
}

interface CountResults {
	categories: number | null;
	subcategories: number | null;
	specifications: number | null;
	products: number | null;
}

async function fetchCounts(
	param: string | null,
	options: FetchCountsOptions,
	type?: string,
): Promise<CountResults> {
	if (!param) {
		return {
			categories: null,
			subcategories: null,
			specifications: null,
			products: null,
		};
	}
	const urls = {
		categories: `${airontoolsAPI}/categories/count${type || ''}/${param}`,
		subcategories: `${airontoolsAPI}/subcategories/count${type || ''}/${param}`,
		specifications: `${airontoolsAPI}/specifications/count${type || ''}/${param}`,
		products: `${airontoolsAPI}/products/count${type || ''}/${param}`,
	};
	try {
		const counts: CountResults = {
			categories: null,
			subcategories: null,
			specifications: null,
			products: null,
		};
		// para que me complico la vida
		let response;
		if (options.fetchCategories) {
			response = await axios.get(urls.categories);
			counts.categories = response.data;
		}

		if (options.fetchSubcategories) {
			response = await axios.get(urls.subcategories);
			counts.subcategories = response.data;
		}

		if (options.fetchSpecifications) {
			response = await axios.get(urls.specifications);
			counts.specifications = response.data;
		}

		if (options.fetchProducts) {
			response = await axios.get(urls.products);
			counts.products = response.data;
		}

		return counts;
	} catch (error) {
		console.error('Error al contar datos:', error);
		throw error;
	}
}

export default fetchCounts;
