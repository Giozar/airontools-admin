import axios from 'axios';
import {
	transformUserDataBack,
	UserDataBackend,
	UserDataFrontend,
} from '../adapter';
import useErrorHandling from './useErrorHandling';
import useSuccessHandling from './useSuccessHandling';

interface RegisterResponse {
	token: string;
	user: UserDataBackend;
}

interface ValidationError {
	message: string[];
}

const useUserUpdate = () => {
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();

	const updateUser = async (userId: string, userData: UserDataFrontend) => {
		try {
			const response = await axios.put<RegisterResponse>(
				`http://localhost:4000/auth/update/${userId}`,
				transformUserDataBack(userData),
			);
			const { user } = response.data;
			console.log(user);
			showSuccess('Usuario Editado Con Éxito');
		} catch (error) {
			if (!axios.isAxiosError<ValidationError>(error)) {
				console.error('Edition failed', error);
				return;
			}
			console.log(userId);
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
	return { errorLog, successLog, updateUser };
};

export default useUserUpdate;