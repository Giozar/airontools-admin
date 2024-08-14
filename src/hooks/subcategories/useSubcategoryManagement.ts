// src/hooks/useSubcategoryManagement.ts

import { deleteSubcategoryService } from '@services/subcategories/deleteSubcategory.service';
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
		subcategoryId: string,
		subcategoryName: string,
	) => {
		try {
			await deleteSubcategoryService(subcategoryId);
			setDeletionMessage(
				`${subcategoryName} (${subcategoryId}) ha sido eliminado correctamente.`,
			);
			console.log(`${subcategoryId} eliminado correctamente.`);
		} catch (error) {
			setDeletionMessage(
				`No se ha podido eliminar la subcategoría ${subcategoryId}.`,
			);
			console.error(
				`Error al eliminar la subcategoría ${subcategoryId}:`,
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
