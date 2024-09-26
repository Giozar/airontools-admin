import { transformRoleDataFront } from '@adapters/role.adapter';
import { airontoolsAPI } from '@configs/api.config';
import { RoleDataBack, RoleDataFront } from '@interfaces/Role.interface';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

const apiUrl = airontoolsAPI + '/roles';

export async function getRolesService(): Promise<RoleDataFront[]> {
	try {
		const response = await axios.get<RoleDataBack[]>(apiUrl);

		const transformedRoles = response.data.map(role =>
			transformRoleDataFront(role),
		);
		return transformedRoles;
	} catch (error) {
		throw errorHandler(error);
	}
}
