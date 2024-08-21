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
		import.meta.env.VITE_API_URL + `/specifications/${id}`,
		specification,
	);
	const specificationCreated = response.data;
	return specificationCreated;
}
