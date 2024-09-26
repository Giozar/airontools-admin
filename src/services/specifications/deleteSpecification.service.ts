import { airontoolsAPI } from '@configs/api.config';
import { SpecDataBackend } from '@interfaces/Specifications.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export default async function deleteSpecificationService({
	id,
}: {
	id: string;
}) {
	try {
		const response = await axios.delete<SpecDataBackend>(
			airontoolsAPI + `/specifications/${id}`,
		);
		const specificationDeleted = response.data;
		return specificationDeleted;
	} catch (error) {
		throw errorHandler(error);
	}
}
