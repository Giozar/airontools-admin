import axios from 'axios';
import { useState } from 'react';

const useSubcategoryManagement = () => {
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
	const handleDelete = async (
		subcategoryid: string,
		subcategoryname: string,
	) => {
		try {
			await axios.delete(
				import.meta.env.VITE_API_URL + `/subcategories/${subcategoryid}`,
			);
			setDeletionMessage(
				`${subcategoryname} (${subcategoryid}) ha sido eliminado correctamente.`,
			);
			console.log(`${subcategoryid} eliminado correctamente.`);
		} catch (error) {
			setDeletionMessage(
				`No se ha podido eliminar la subcategoria ${subcategoryid}.`,
			);
			console.error(
				`Error al eliminar la subcategoria ${subcategoryid}:`,
				error,
			);
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

export default useSubcategoryManagement;
