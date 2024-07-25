import {
	transformUserDataBack,
	UserDataBackend,
	UserDataFrontend,
} from '@adapters/user.adapter';
import axios from 'axios';
import useErrorHandling from './common/useErrorHandling';
import useSuccessHandling from './common/useSuccessHandling';

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
				import.meta.env.VITE_API_URL + `/auth/update/${userId}`,
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
