import { transformSpecDataToFrontend } from '@adapters/specifications.adapter';
import { airontoolsAPI } from '@configs/api.config';
import { SpecDataBackend } from '@interfaces/Specifications.interface';
import axios from 'axios';

const apiUrl = airontoolsAPI + '/specifications';

export async function getSpecifications() {
	const response = await axios.get<SpecDataBackend[]>(apiUrl);
	return response.data.map(transformSpecDataToFrontend);
}
