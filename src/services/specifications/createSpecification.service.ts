import {
	Specification,
	SpecificationSuccessResponse,
} from '@interfaces/Specifications.interface';
import axios from 'axios';

export default async function createSpecification({
	specification,
}: {
	specification: Specification;
}) {
	const response = await axios.post<SpecificationSuccessResponse>(
		import.meta.env.VITE_API_URL + '/specifications',
		specification,
	);
	const specificationCreated = response.data;
	return specificationCreated;
}
