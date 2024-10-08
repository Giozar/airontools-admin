import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import deleteSpecificationService from '@services/specifications/deleteSpecification.service';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useSpecificationsManagement = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [deletionMessage, setDeletionMessage] = useState<string | null>(null);
	const [showDeletionModalFor, setShowDeletionModalFor] = useState<
		string | null
	>(null);
	const [showModalFor, setShowModalFor] = useState<string | null>(null);
	const [updateListFlag, setUpdateListFlag] = useState<boolean>(false);

	const handleEdit = (spec: SpecDataFrontend) => {
		localStorage.setItem('specToEdit', spec.id);
		navigate(location.pathname + `/editar-especificacion`);
	};

	const handleCloseModal = () => {
		setShowDeletionModalFor(null);
		setDeletionMessage(null);
	};
	const handleUpdateList = () => {
		setUpdateListFlag(prevFlag => !prevFlag);
	};
	const handleDelete = async (specid: string, specname: string) => {
		try {
			await deleteSpecificationService({ id: specid });
			setDeletionMessage(
				`${specname} (${specid}) ha sido eliminado correctamente.`,
			);
			console.log(`${specid} eliminado correctamente.`);
		} catch (error) {
			setDeletionMessage(
				`No se ha podido eliminar la especificación ${specid}.`,
			);
			console.error(`Error al eliminar la especificación ${specid}:`, error);
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

export default useSpecificationsManagement;
