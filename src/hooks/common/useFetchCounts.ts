import { airontoolsAPI } from '@configs/api.config';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface FetchCountsOptions {
	fetchCategories?: boolean;
	fetchSubcategories?: boolean;
	fetchSpecifications?: boolean;
	fetchProducts?: boolean;
}

const useFetchCounts = (
	param: string | null,
	options: FetchCountsOptions,
	type?: string,
) => {
	const [numberOfCategories, setNumberOfCategories] = useState<number | null>(
		null,
	);
	const [numberOfSubcategories, setNumberOfSubcategories] = useState<
		number | null
	>(null);
	const [numberOfSpecifications, setNumberOfSpecifications] = useState<
		number | null
	>(null);
	const [numberOfProducts, setNumberOfProducts] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchCounts = async () => {
			if (!param) {
				setNumberOfCategories(null);
				setNumberOfSubcategories(null);
				setNumberOfSpecifications(null);
				setNumberOfProducts(null);
				setLoading(false);
				return;
			}

			setLoading(true);
			try {
				const urls: { [key: string]: string } = {
					categories: `${airontoolsAPI}/categories/count${type || ''}/${param}`,
					subcategories: `${airontoolsAPI}/subcategories/count${type || ''}/${param}`,
					specifications: `${airontoolsAPI}/specifications/count${type || ''}/${param}`,
					products: `${airontoolsAPI}/products/count${type || ''}/${param}`,
				};

				const requests = Object.entries(options).reduce(
					(acc, [key, shouldFetch]) => {
						if (shouldFetch && urls[key]) {
							acc.push(axios.get(urls[key]));
						}
						return acc;
					},
					[] as Promise<any>[],
				);

				const responses = await Promise.all(requests);

				const results = {
					categories: responses[0]?.data ?? null,
					subcategories: responses[1]?.data ?? null,
					specifications: responses[2]?.data ?? null,
					products: responses[3]?.data ?? null,
				};

				if (options.fetchCategories) setNumberOfCategories(results.categories);
				if (options.fetchSubcategories)
					setNumberOfSubcategories(results.subcategories);
				if (options.fetchSpecifications)
					setNumberOfSpecifications(results.specifications);
				if (options.fetchProducts) setNumberOfProducts(results.products);
			} catch (error) {
				console.error('Error al contar datos:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCounts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [param, options, type]);

	return {
		numberOfCategories,
		numberOfSubcategories,
		numberOfSpecifications,
		numberOfProducts,
		loading,
	};
};

export default useFetchCounts;
