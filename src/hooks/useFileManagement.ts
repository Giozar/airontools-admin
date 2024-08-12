import axios from 'axios';
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
	const handleDeleteFile = async (Fileid: string, Filename: string) => {
		try {
			console.log(Fileid, Filename);
			console.log();
			await axios.delete(Fileid);
			setDeletionMessageFile(
				`El archivo ${Fileid} ha sido eliminado correctamente.`,
			);
			console.log(`El archivo ${Fileid} eliminado correctamente.`);
		} catch (error) {
			setDeletionMessageFile(`No se ha podido eliminar al archivo ${Fileid}.`);
			console.error(`Error al eliminar archivo ${Fileid}:`, error);
		}
	};

	return {
		setShowModalForFile,
		setShowDeletionModalForFile,
		showDeletionModalForFile,
		showModalForFile,
		deletionMessageFile,
		handleCloseModalFile,
		handleDeleteFile,
		handleUpdateList,
		updateListFlag,
	};
};

export default useFileManagement;
