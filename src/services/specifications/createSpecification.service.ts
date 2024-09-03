import { airontoolsAPI } from '@configs/api.config';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import { filterEmptyCategorizations } from '@utils/filterEmptyCategorizations.util';
import axios from 'axios';

export default async function createSpecification({
	specification,
}: {
	specification: SpecDataToSend;
}) {
	const response = await axios.post(airontoolsAPI + '/specifications', {
		...specification,
		families: filterEmptyCategorizations(specification.families),
		categories: filterEmptyCategorizations(specification.categories),
		subcategory: filterEmptyCategorizations(specification.subcategories),
	});
	const specificationCreated = response.data;
	return specificationCreated;
}
