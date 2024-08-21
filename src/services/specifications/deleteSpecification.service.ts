import { airontoolsAPI } from '@configs/api.config';
import { SpecDataBackend } from '@interfaces/Specifications.interface';
import axios from 'axios';

export default async function deleteSpecification({ id }: { id: string }) {
	const response = await axios.delete<SpecDataBackend>(
		airontoolsAPI + `/specifications/${id}`,
	);
	const specificationDeleted = response.data;
	return specificationDeleted;
}
