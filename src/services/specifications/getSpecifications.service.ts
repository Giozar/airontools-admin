import { transformSpecDataToFrontend } from '@adapters/specifications.adapter';
import { SpecDataBackend } from '@interfaces/Specifications.interface';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL + '/specifications';

export async function getSpecifications() {
	const response = await axios.get<SpecDataBackend[]>(apiUrl);
	return response.data.map(transformSpecDataToFrontend);
}
