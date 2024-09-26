// src/hooks/useUserUpdate.ts

import { useAlert } from '@contexts/Alert/AlertContext';
import { UserDataSend } from '@interfaces/User.interface';
import { updateUserService } from '@services/users/updateUser.service';
import { useState } from 'react';

const useUserUpdate = () => {
	const { showAlert } = useAlert();
	const [isUpdating, setIsUpdating] = useState<boolean>(false);

	const updateUser = async (userId: string, userData: UserDataSend) => {
		setIsUpdating(true);
		try {
			const data = await updateUserService(userId, userData);
			const { user } = data;
			console.log(user);
			showAlert('Usuario Editado Con Éxito', 'success');
		} catch (error) {
			showAlert('No se ha podido editar el usuario' + error, 'error');
			console.error(error);
		} finally {
			setIsUpdating(false);
		}
	};

	return { updateUser, isUpdating };
};

export default useUserUpdate;
