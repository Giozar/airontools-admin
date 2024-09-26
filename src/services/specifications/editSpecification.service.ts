import { airontoolsAPI } from '@configs/api.config';
import {
	SpecDataBackend,
	SpecDataToSend,
} from '@interfaces/Specifications.interface';
import { errorHandler } from '@utils/errorHandler.util';
import { filterEmptyCategorizations } from '@utils/filterEmptyCategorizations.util';
import axios from 'axios';

export default async function editSpecificationService({
	specification,
	id,
}: {
	specification: SpecDataToSend;
	id: string;
}) {
	try {
		const filteredSpecification = {
			...specification,
			families: filterEmptyCategorizations(specification.families),
			categories: filterEmptyCategorizations(specification.categories),
			subcategories: filterEmptyCategorizations(specification.subcategories),
		};

		const response = await axios.patch<SpecDataBackend>(
			airontoolsAPI + `/specifications/${id}`,
			filteredSpecification,
		);
		const specificationUpdated = response.data;
		return specificationUpdated;
	} catch (error) {
		throw errorHandler(error);
	}
}
