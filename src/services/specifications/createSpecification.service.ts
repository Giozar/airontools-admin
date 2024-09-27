import { airontoolsAPI } from '@configs/api.config';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import { errorHandler } from '@utils/errorHandler.util';
import { filterEmptyCategorizations } from '@utils/filterEmptyCategorizations.util';
import axios from 'axios';

export default async function createSpecificationService({
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
	try {
		const response = await axios.post(
			`${airontoolsAPI}/specifications`,
			filteredSpecification,
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}
