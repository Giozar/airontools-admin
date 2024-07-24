import {
	transformUserDataBack,
	UserDataFrontend,
} from '@adapters/user.adapter';
import {
	RegisterResponse,
	ValidationError,
} from '@interfaces/users/userResponse';
import axios from 'axios';

export default async function createUser(
	userData: UserDataFrontend,
): Promise<RegisterResponse> {
	try {
		const response = await axios.post<RegisterResponse>(
			'http://localhost:4000/auth/register',
			transformUserDataBack(userData),
		);
		const userCreated = response.data;

		return userCreated;
	} catch (error) {
		if (axios.isAxiosError<ValidationError>(error) && error.response) {
			const errorMessage = error.response.data.message;
			const message = Array.isArray(errorMessage)
				? errorMessage.join(', ')
				: errorMessage;
			throw new Error(message);
		} else {
			throw new Error('Registration failed');
		}
	}
}
