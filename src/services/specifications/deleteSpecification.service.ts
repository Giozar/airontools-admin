import { SpecDataBackend } from '@interfaces/Specifications.interface';
import axios from 'axios';

export default async function deleteSpecification({ id }: { id: string }) {
	const response = await axios.delete<SpecDataBackend>(
		import.meta.env.VITE_API_URL + `/specifications/${id}`,
	);
	const specificationDeleted = response.data;
	return specificationDeleted;
}
