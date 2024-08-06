import { UserDataBackend, UserDataFrontend } from '@interfaces/User.interface';

export const transformUserDataFront = (
	user: UserDataBackend,
): UserDataFrontend => {
	return {
		id: user._id,
		imageUrl: user.imageUrl,
		email: user.email,
		password: user.password,
		name: user.name,
		role: user.role,
	};
};
