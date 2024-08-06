import { RoleDataBack, RoleDataFront } from '@interfaces/Role.interface';
import { transformUserDataFront } from './user.adapter';

export const transformRoleDataFront = (role: RoleDataBack): RoleDataFront => {
	return {
		id: role._id,
		name: role.name,
		description: role.description,
		permissions: role.permissions,
		createdBy: role.createdBy && transformUserDataFront(role.createdBy),
		updatedBy: role.updatedBy && transformUserDataFront(role.updatedBy),
	};
};
