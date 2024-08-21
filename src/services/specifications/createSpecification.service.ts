import { airontoolsAPI } from '@configs/api.config';
import {
	SpecDataBackend,
	SpecDataToSend,
} from '@interfaces/Specifications.interface';
import axios from 'axios';

export default async function createSpecification({
	specification,
}: {
	specification: SpecDataToSend;
}) {
	const response = await axios.post<SpecDataBackend>(
		airontoolsAPI + '/specifications',
		specification,
	);
	const specificationCreated = response.data;
	return specificationCreated;
}
