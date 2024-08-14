// src/hooks/useFileManagement.ts

import { deleteFileService } from '@services/files/deleteFile.service';
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

	const handleDelete = async (fileId: string) => {
		try {
			const message = await deleteFileService(fileId);
			setDeletionMessage(message);
			console.log(message);
		} catch (error) {
			setDeletionMessage(`Error al eliminar archivo ${fileId}`);
			// console.error(`Error al eliminar archivo ${fileId}:`, error);
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
