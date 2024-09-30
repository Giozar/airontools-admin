// src/hooks/useFamilyUpdate.ts

import { useAlert } from '@contexts/Alert/AlertContext';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import { FamilyDataToSend } from '@interfaces/Family.interface';
import { updateFamilyService } from '@services/families/updateFamily.service';

const useFamilyUpdate = () => {
	const { showAlert } = useAlert();
	const updateFamily = async (familyData: FamilyDataToSend) => {
		try {
			if (!familyData._id) throw new Error('No hay id de familia que editar');
			await updateFamilyService(familyData._id, familyData);
			showAlert('Familia Actualizada Con Éxito', 'success');
		} catch (error) {
			showAlert(
				'No se pudo actualizar la familia' + (error as ErrorResponse).message,
				'error',
			);
		}
	};

	return { updateFamily };
};

export default useFamilyUpdate;
