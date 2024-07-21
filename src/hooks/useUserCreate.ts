import axios from 'axios';
import {
	transformUserDataBack,
	UserDataBackend,
	UserDataFrontend,
} from '../adapters/user.adapter';
import useErrorHandling from './useErrorHandling';
import useSuccessHandling from './useSuccessHandling';

interface RegisterResponse {
	token: string;
	user: UserDataBackend;
}

interface ValidationError {
	message: string[];
}

const useUserCreate = () => {
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();

	const createUser = async (userData: UserDataFrontend) => {
		try {
			const response = await axios.post<RegisterResponse>(
				'http://localhost:4000/auth/register',
				transformUserDataBack(userData),
			);
			const { user } = response.data;
			console.log(user);
			showSuccess('Usuario Creado Con Éxito');
		} catch (error) {
			if (!axios.isAxiosError<ValidationError>(error)) {
				console.error('Registration failed', error);
				return;
			}
			console.log(userData.password);
			if (!error.response) return;
			console.log(error);
			const errorMessage = error.response.data.message;
			const message = Array.isArray(errorMessage)
				? errorMessage.join(', ')
				: errorMessage;
			showError(message);
		}
	};
	return { errorLog, successLog, createUser };
};

export default useUserCreate;
