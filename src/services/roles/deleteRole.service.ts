import { airontoolsAPI } from '@configs/api.config';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

export async function deleteRoleService(roleId: string) {
	try {
		const response = await axios.delete(
			airontoolsAPI + `/roles/delete/${roleId}`,
		);
		return response.data;
	} catch (error) {
		throw errorHandler(error);
	}
}
