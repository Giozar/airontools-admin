import { airontoolsAPI } from '@configs/api.config';
import {
	SpecDataBackend,
	SpecDataToSend,
} from '@interfaces/Specifications.interface';
import { filterEmptyCategorizations } from '@utils/filterEmptyCategorizations.util';
import axios from 'axios';

export default async function editSpecification({
	specification,
	id,
}: {
	specification: SpecDataToSend;
	id: string;
}) {
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
}
