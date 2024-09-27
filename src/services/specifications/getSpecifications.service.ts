import { transformSpecDataToFrontend } from '@adapters/specifications.adapter';
import { airontoolsAPI } from '@configs/api.config';
import { SpecDataBackend } from '@interfaces/Specifications.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const apiUrl = airontoolsAPI + '/specifications';

export async function getSpecificationsService() {
	try {
		const response = await axios.get<SpecDataBackend[]>(apiUrl);
		return response.data.map(transformSpecDataToFrontend);
	} catch (error) {
		throw errorHandler(error);
	}
}
