import { transformRoleDataFront } from '@adapters/role.adapter';
import { RoleDataBack, RoleDataFront } from '@interfaces/Role.interface';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL + '/roles';

export async function getRoles(): Promise<RoleDataFront[]> {
	const response = await axios.get<RoleDataBack[]>(apiUrl);

	const transformedRoles = response.data.map(role =>
		transformRoleDataFront(role),
	);
	return transformedRoles;
}
