import { UserDataFrontend } from '@interfaces/User.interface';
import { deleteUserService } from '@services/users/deleteUser.service';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useUserManagement = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [deletionMessage, setDeletionMessage] = useState<string | null>(null);
	const [showDeletionModalFor, setShowDeletionModalFor] = useState<
		string | null
	>(null);
	const [showModalFor, setShowModalFor] = useState<string | null>(null);
	const [updateListFlag, setUpdateListFlag] = useState<boolean>(false);

	const handleEdit = (user: UserDataFrontend) => {
		localStorage.setItem('userToEdit', JSON.stringify(user));
		navigate(location.pathname + `/editar-usuario`);
	};

	const handleCloseModal = () => {
		setShowDeletionModalFor(null);
		setDeletionMessage(null);
	};

	const handleUpdateList = () => {
		setUpdateListFlag(prevFlag => !prevFlag);
	};

	const handleDelete = async (userId: string, userName: string) => {
		try {
			await deleteUserService(userId);
			setDeletionMessage(
				`Usuario ${userName} (${userId}) ha sido eliminado correctamente.`,
			);
			console.log(`Usuario ${userId} eliminado correctamente.`);
		} catch (error) {
			setDeletionMessage(`No se ha podido eliminar al usuario ${userId}.`);
			console.error(`Error al eliminar usuario ${userId}:`, error);
		}
	};

	return {
		showDeletionModalFor,
		setShowDeletionModalFor,
		showModalFor,
		setShowModalFor,
		deletionMessage,
		handleEdit,
		handleCloseModal,
		handleDelete,
		handleUpdateList,
		updateListFlag,
	};
};

export default useUserManagement;
