import { UserDataBackend, UserDataFrontend } from '@interfaces/User.interface';

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

export const transformUserDataBack = (
	user: UserDataFrontend,
): UserDataBackend => {
	return {
		_id: user.id,
		imageUrl: user.imageUrl,
		email: user.email,
		password: user.password,
		fullName: user.name,
		role: user.role,
	};
};
