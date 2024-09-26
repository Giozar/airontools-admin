import { transformSpecDataToFrontend } from '@adapters/specifications.adapter';
import { airontoolsAPI } from '@configs/api.config';
import { SpecDataBackend } from '@interfaces/Specifications.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function getSpecificationService({ id }: { id: string }) {
	try {
		const response = await axios.get<SpecDataBackend>(
			airontoolsAPI + '/specifications/' + id,
		);
		return transformSpecDataToFrontend(response.data);
	} catch (error) {
		throw errorHandler(error);
	}
}
