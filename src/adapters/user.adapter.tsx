import { UserRole } from '@interfaces/UserRole';

export interface UserDataBackend {
	_id: string;
	imageUrl: string;
	email: string;
	password?: string;
	fullName: string;
	role: string | UserRole;
}

export interface UserDataFrontend {
	id?: string;
	imageUrl?: string;
	email?: string;
	password?: string;
	name: string;
	role: string | UserRole;
}

export const transformUserData = (user: UserDataBackend): UserDataFrontend => {
	return {
		id: user._id,
		imageUrl: user.imageUrl,
		email: user.email,
		password: user.password,
		name: user.fullName,
		role: user.role,
	};
};
