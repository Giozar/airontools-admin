import axios from 'axios';
import { useState } from 'react';

const useFileManagement = () => {
	const [deletionMessage, setDeletionMessage] = useState<string | null>(null);
	const [showDeletionModalFor, setShowDeletionModalFor] = useState<
		string | null
	>(null);
	const [showModalFor, setShowModalFor] = useState<string | null>(null);
	const [updateListFlag, setUpdateListFlag] = useState<boolean>(false);

	const handleCloseModal = () => {
		setShowDeletionModalFor(null);
		setDeletionMessage(null);
	};
	const handleUpdateList = () => {
		setUpdateListFlag(prevFlag => !prevFlag);
	};
	const handleDelete = async (Fileid: string, Filename: string) => {
		try {
			console.log(Fileid, Filename);
			console.log();
			await axios.delete(Fileid);
			setDeletionMessage(
				`El archivo ${Fileid} ha sido eliminado correctamente.`,
			);
			console.log(`El archivo ${Fileid} eliminado correctamente.`);
		} catch (error) {
			setDeletionMessage(`No se ha podido eliminar al archivo ${Fileid}.`);
			console.error(`Error al eliminar archivo ${Fileid}:`, error);
		}
	};

	return {
		showDeletionModalFor,
		setShowDeletionModalFor,
		showModalFor,
		setShowModalFor,
		deletionMessage,
		handleCloseModal,
		handleDelete,
		handleUpdateList,
		updateListFlag,
	};
};

export default useFileManagement;
