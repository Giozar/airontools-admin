import { UserDataFrontend } from '@adapters/user.adapter';
import axios from 'axios';
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
	const handleDelete = async (userid: string, username: string) => {
		try {
			await axios.delete(import.meta.env.VITE_API_URL + `/auth/${userid}`);
			setDeletionMessage(
				`Usuario ${username} (${userid}) ha sido eliminado correctamente.`,
			);
			console.log(`Usuario ${userid} eliminado correctamente.`);
		} catch (error) {
			setDeletionMessage(`No se ha podido eliminar al usuario ${userid}.`);
			console.error(`Error al eliminar usuario ${userid}:`, error);
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
