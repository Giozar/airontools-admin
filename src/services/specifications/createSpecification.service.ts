import { airontoolsAPI } from '@configs/api.config';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import { filterEmptyCategorizations } from '@utils/filterEmptyCategorizations.util';
import axios from 'axios';

export default async function createSpecification({
	specification,
}: {
	specification: SpecDataToSend;
}) {
	const filteredSpecification = {
		...specification,
		families: filterEmptyCategorizations(specification.families),
		categories: filterEmptyCategorizations(specification.categories),
		subcategories: filterEmptyCategorizations(specification.subcategories),
	};

	console.log(filteredSpecification);

	const response = await axios.post(
		`${airontoolsAPI}/specifications`,
		filteredSpecification,
	);

	return response.data;
}
