import { airontoolsAPI } from '@configs/api.config';
import {
	SpecDataBackend,
	SpecDataToSend,
} from '@interfaces/Specifications.interface';
import axios from 'axios';

export default async function editSpecification({
	specification,
	id,
}: {
	specification: SpecDataToSend;
	id: string;
}) {
	const response = await axios.patch<SpecDataBackend>(
		airontoolsAPI + `/specifications/${id}`,
		specification,
	);
	const specificationCreated = response.data;
	return specificationCreated;
}
