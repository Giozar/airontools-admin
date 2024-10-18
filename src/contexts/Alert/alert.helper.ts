// alertHelpers.ts
import { useAlert } from '@contexts/Alert/AlertContext';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import { useNavigate } from 'react-router-dom';

export const useAlertHelper = () => {
	const { showAlert } = useAlert();
	const navigate = useNavigate();

	const showError = (message: string, error?: unknown) => {
		const fullMessage = `${message}: ${(error as ErrorResponse).message}`;
		showAlert(fullMessage, 'error');
	};

	const showSuccess = (message: string) => {
		showAlert(message, 'success');
	};

	const showSuccessAndReload = (message: string) => {
		showAlert(message, 'success');
		setTimeout(() => {
			navigate(0); // Recarga la página actual
		}, 1000);
	};
	const showSuccessAndReturn = (message: string) => {
		showAlert(message, 'success');
		setTimeout(() => {
			navigate(-1); // Recarga la página actual
		}, 1000);
	};
	const showSuccessAndNavigate = (message: string, navigateTo: string) => {
		showAlert(message, 'success');
		setTimeout(() => {
			navigate(navigateTo);
		}, 2000);
	};

	const showWarning = (message: string) => {
		showAlert(message, 'warning');
	};

	return {
		showError,
		showSuccess,
		showWarning,
		showSuccessAndReload,
		showSuccessAndNavigate,
		showSuccessAndReturn,
	};
};
