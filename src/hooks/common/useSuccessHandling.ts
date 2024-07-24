import { useState } from 'react';

export interface FormSuccess {
	isSuccess: boolean;
	message: string;
}

const useSuccessHandling = () => {
	const [successLog, setSuccessLog] = useState<FormSuccess>({
		isSuccess: false,
		message: '',
	});

	const showSuccess = (successMessage: string, timeout = 4000) => {
		setSuccessLog({ isSuccess: true, message: successMessage });

		setTimeout(() => {
			setSuccessLog({ isSuccess: false, message: '' });
		}, timeout);
	};

	return {
		successLog,
		showSuccess,
	};
};

export default useSuccessHandling;
