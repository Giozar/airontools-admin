// src/hooks/useUserUpdate.ts

import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { UserDataSend } from '@interfaces/User.interface';
import { updateUserService } from '@services/users/updateUser.service';
import { useState } from 'react';

const useUserUpdate = () => {
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();

	const [isUpdating, setIsUpdating] = useState<boolean>(false);

	const updateUser = async (userId: string, userData: UserDataSend) => {
		setIsUpdating(true);
		try {
			const data = await updateUserService(userId, userData);
			const { user } = data;
			console.log(user);
			showSuccess('Usuario Editado Con Éxito');
		} catch (error) {
			showError('No se ha podido editar el usuario');
			console.error(error);
		} finally {
			setIsUpdating(false);
		}
	};

	return { errorLog, successLog, updateUser, isUpdating };
};

export default useUserUpdate;
