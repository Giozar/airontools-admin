import { UserDataBackend, UserDataFrontend } from '@interfaces/User.interface';
import { transformRoleDataFront } from './role.adapter';

export const transformUserDataFront = (
	user: UserDataBackend,
): UserDataFrontend => {
	return {
		id: user._id,
		imageUrl: user.imageUrl,
		email: user.email,
		password: user.password,
		name: user.name,
		role: user.role ? transformRoleDataFront(user.role) : null,
		createdBy: user.createdBy ? transformUserDataFront(user.createdBy) : null,
	};
};
