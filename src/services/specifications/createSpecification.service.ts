import {
	Specification,
	SpecificationSuccesResponse,
} from '@interfaces/Specifications.interface';
import axios from 'axios';

export default async function createSpecification({
	specification,
}: {
	specification: Specification;
}) {
	try {
		const response = await axios.post<SpecificationSuccesResponse>(
			import.meta.env.VITE_API_URL + '/specifications',
			specification,
		);
		const specificationCreated = response.data;
		console.log('Especificación creado con éxito');
		return specificationCreated;
	} catch (error) {
		console.error(error);
	}
}
