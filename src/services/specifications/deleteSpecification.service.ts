import { SpecificationSuccessResponse } from '@interfaces/Specifications.interface';
import axios from 'axios';

export default async function createSpecification({ id }: { id: string }) {
	const response = await axios.delete<SpecificationSuccessResponse>(
		import.meta.env.VITE_API_URL + `/specifications/${id}`,
	);
	const specificationCreated = response.data;
	return specificationCreated;
}
