import { useState } from 'react';

export interface FormError {
	isError: boolean;
	message: string;
}

const useErrorHandling = () => {
	const [errorLog, setErrorLog] = useState<FormError>({
		isError: false,
		message: '',
	});

	const showError = (errorMessage: string) => {
		setErrorLog({ isError: true, message: errorMessage });

		setTimeout(() => {
			setErrorLog({ isError: false, message: '' });
		}, 4000);
	};

	return {
		errorLog,
		showError,
	};
};

export default useErrorHandling;
