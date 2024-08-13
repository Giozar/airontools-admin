// src/hooks/useFamilyManagement.ts

import { FamilyDataFrontend } from '@interfaces/Family.interface';
import { deleteFamilyService } from '@services/families/deleteFamily.service';
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

	const handleEdit = (family: FamilyDataFrontend) => {
		localStorage.setItem('familyToEdit', JSON.stringify({ family }));
		navigate(`${location.pathname}/editar-familia`);
	};

	const handleCloseModal = () => {
		setShowDeletionModalFor(null);
		setDeletionMessage(null);
	};

	const handleUpdateList = () => {
		setUpdateListFlag(prevFlag => !prevFlag);
	};

	const handleDelete = async (familyId: string, familyName: string) => {
		try {
			await deleteFamilyService(familyId);
			setDeletionMessage(
				`${familyName} (${familyId}) ha sido eliminado correctamente.`,
			);
		} catch (error) {
			setDeletionMessage(`No se ha podido eliminar la familia ${familyId}.`);
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
