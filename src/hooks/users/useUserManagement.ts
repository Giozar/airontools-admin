import { useAlert } from '@contexts/Alert/AlertContext';
import { UserDataFrontend } from '@interfaces/User.interface';
import { deleteUserService } from '@services/users/deleteUser.service';
import { errorHandler } from '@utils/errorHandler.util';
import { useLocation, useNavigate } from 'react-router-dom';

const useUserManagement = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { showAlert } = useAlert();

	const handleEdit = (user: UserDataFrontend) => {
		localStorage.setItem('userToEdit', JSON.stringify(user));
		navigate(location.pathname + `/editar-usuario`);
	};

	const handleDelete = async (user: UserDataFrontend | null) => {
		if (!user) return;
		try {
			await deleteUserService(user.id);
			showAlert(
				`Usuario ${user.name} (${user.id}) ha sido eliminado correctamente.`,
				'success',
			);
		} catch (error) {
			showAlert(
				`No se ha podido eliminar al usuario ${user.id}.` + errorHandler(error),
				'error',
			);
		}
	};

	return {
		handleEdit,
		handleDelete,
	};
};

export default useUserManagement;
