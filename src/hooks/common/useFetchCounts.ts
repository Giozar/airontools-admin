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
				const requests = [];

				if (options.fetchCategories) {
					requests.push(
						axios.get(
							`${import.meta.env.VITE_API_URL}/categories/count${type || ''}/${param}`,
						),
					);
				}
				if (options.fetchSubcategories) {
					requests.push(
						axios.get(
							`${import.meta.env.VITE_API_URL}/subcategories/count${type || ''}/${param}`,
						),
					);
				}
				if (options.fetchSpecifications) {
					requests.push(
						axios.get(
							`${import.meta.env.VITE_API_URL}/specifications/count${type || ''}/${param}`,
						),
					);
				}
				if (options.fetchProducts) {
					requests.push(
						axios.get(
							`${import.meta.env.VITE_API_URL}/products/count${type || ''}/${param}`,
						),
					);
				}

				const responses = await Promise.all(requests);

				responses.forEach((response, index) => {
					if (options.fetchCategories && index === 0) {
						setNumberOfCategories(response.data);
					}
					if (
						options.fetchSubcategories &&
						index === (options.fetchCategories ? 1 : 0)
					) {
						setNumberOfSubcategories(response.data);
					}
					if (
						options.fetchSpecifications &&
						index ===
							(options.fetchCategories
								? options.fetchSubcategories
									? 2
									: 1
								: 0)
					) {
						setNumberOfSpecifications(response.data);
					}
					if (
						options.fetchProducts &&
						index ===
							(options.fetchCategories
								? options.fetchSubcategories
									? options.fetchSpecifications
										? 3
										: 2
									: 1
								: 0)
					) {
						setNumberOfProducts(response.data);
					}
				});
			} catch (error) {
				console.error('Error al contar datos:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCounts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [param]);

	return {
		numberOfCategories,
		numberOfSubcategories,
		numberOfSpecifications,
		numberOfProducts,
		loading,
	};
};

export default useFetchCounts;
