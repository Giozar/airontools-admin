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

	const handleDelete = async (user: UserDataFrontend | null) => {
		if (!user) return;
		try {
			await deleteUserService(user.id);
			setDeletionMessage(
				`Usuario ${user.name} (${user.id}) ha sido eliminado correctamente.`,
			);
			console.log(`Usuario ${user.id} eliminado correctamente.`);
		} catch (error) {
			setDeletionMessage(`No se ha podido eliminar al usuario ${user.id}.`);
			console.error(`Error al eliminar usuario ${user.id}:`, error);
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
