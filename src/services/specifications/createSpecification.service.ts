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
		import.meta.env.VITE_API_URL + '/specifications',
		specification,
	);
	const specificationCreated = response.data;
	return specificationCreated;
}
