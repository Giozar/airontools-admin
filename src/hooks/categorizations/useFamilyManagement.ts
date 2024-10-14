// src/hooks/useFamilyManagement.ts

import { useAlert } from '@contexts/Alert/AlertContext';
import { FamilyDataFrontend } from '@interfaces/Family.interface';
import { deleteFamilyService } from '@services/families/deleteFamily.service';
import { useLocation, useNavigate } from 'react-router-dom';

const useFamilyManagement = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { showAlert } = useAlert();

	const handleEdit = (family: FamilyDataFrontend) => {
		localStorage.setItem('familyToEdit', family.id);
		navigate(`${location.pathname}/editar-familia`);
	};

	const handleDelete = async (familyId: string, familyName: string) => {
		try {
			await deleteFamilyService(familyId);
			showAlert(
				`${familyName} (${familyId}) ha sido eliminado correctamente.`,
				'success',
			);
		} catch (error) {
			showAlert(`No se ha podido eliminar la familia ${familyId}.`, 'error');
		}
	};

	return {
		handleEdit,
		handleDelete,
	};
};

export default useFamilyManagement;
