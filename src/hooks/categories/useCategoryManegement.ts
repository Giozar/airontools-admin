import { deleteCategory } from '@services/categories/deleteCategory.service';
import { useState } from 'react';

const useCategoryManagement = () => {
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
	const handleDelete = async (categoryid: string, categoryname: string) => {
		try {
			await deleteCategory(categoryid);
			setDeletionMessage(
				`${categoryname} (${categoryid}) ha sido eliminado correctamente.`,
			);
		} catch (error) {
			setDeletionMessage(
				`No se ha podido eliminar la categoria ${categoryid}.`,
			);
			// console.error(`Error al eliminar la categoria ${categoryid}:`, error);
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

export default useCategoryManagement;