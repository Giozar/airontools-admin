import { deleteFileService } from '@services/files/deleteFile.service';
import { useState } from 'react';

const useFileManagement = () => {
	const [deletionMessageFile, setDeletionMessageFile] = useState<string | null>(
		null,
	);
	const [showDeletionModalForFile, setShowDeletionModalForFile] = useState<
		string | null
	>(null);
	const [showModalForFile, setShowModalForFile] = useState<string | null>(null);
	const [updateListFlag, setUpdateListFlag] = useState<boolean>(false);

	const handleCloseModalFile = () => {
		setShowDeletionModalForFile(null);
		setDeletionMessageFile(null);
	};

	const handleUpdateList = () => {
		setUpdateListFlag(prevFlag => !prevFlag);
	};

	const handleDelete = async (fileId: string) => {
		try {
			const message = await deleteFileService(fileId);
			setDeletionMessageFile(message);
			console.log(message);
		} catch (error) {
			setDeletionMessageFile(`Error al eliminar archivo ${fileId}`);
			// console.error(`Error al eliminar archivo ${fileId}:`, error);
		}
	};

	return {
		setShowModalForFile,
		setShowDeletionModalForFile,
		showDeletionModalForFile,
		showModalForFile,
		deletionMessageFile,
		handleCloseModalFile,
		handleDelete,
		handleUpdateList,
		updateListFlag,
	};
};

export default useFileManagement;
