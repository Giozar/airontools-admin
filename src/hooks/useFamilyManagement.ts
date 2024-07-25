import { FamilyFrontend } from '@adapters/family.adapter';
import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useFamilyManagement = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [deletionMessage, setDeletionMessage] = useState<string | null>(null);
	const [showDeletionModalFor, setShowDeletionModalFor] = useState<
		string | null
	>(null);
	const [showModalFor, setShowModalFor] = useState<string | null>(null);
	const [updateListFlag, setUpdateListFlag] = useState<boolean>(false);

	const handleEdit = (
		family: FamilyFrontend,
		numberOfCategories: number,
		numberOfSubcategories: number,
	) => {
		localStorage.setItem(
			'familyToEdit',
			JSON.stringify({ family, numberOfCategories, numberOfSubcategories }),
		);
		navigate(location.pathname + `/editar-familia`);
	};

	const handleCloseModal = () => {
		setShowDeletionModalFor(null);
		setDeletionMessage(null);
	};
	const handleUpdateList = () => {
		setUpdateListFlag(prevFlag => !prevFlag);
	};
	const handleDelete = async (familyid: string, familyname: string) => {
		try {
			await axios.delete(`http://localhost:4000/families/${familyid}`);
			setDeletionMessage(
				`${familyname} (${familyid}) ha sido eliminado correctamente.`,
			);
			console.log(`${familyid} eliminado correctamente.`);
		} catch (error) {
			setDeletionMessage(`No se ha podido eliminar la familia ${familyid}.`);
			console.error(`Error al eliminar la familia ${familyid}:`, error);
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

export default useFamilyManagement;
