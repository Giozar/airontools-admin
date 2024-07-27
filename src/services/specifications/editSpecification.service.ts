import {
	Specification,
	SpecificationSuccessResponse,
} from '@interfaces/Specifications.interface';
import axios from 'axios';

export default async function createSpecification({
	specification,
	id,
}: {
	specification: Specification;
	id: string;
}) {
	const response = await axios.patch<SpecificationSuccessResponse>(
		import.meta.env.VITE_API_URL + `/specifications/${id}`,
		specification,
	);
	const specificationCreated = response.data;
	return specificationCreated;
}
