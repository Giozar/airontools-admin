// src/hooks/useFamilyUpdate.ts

import { useAlert } from '@contexts/Alert/AlertContext';
import { FamilyDataToSend } from '@interfaces/Family.interface';
import { updateFamilyService } from '@services/families/updateFamily.service';

const useFamilyUpdate = () => {
	const { showAlert } = useAlert();
	const updateFamily = async (familyData: FamilyDataToSend) => {
		try {
			await updateFamilyService(familyData);
			showAlert('Familia Actualizada Con Éxito', 'success');
		} catch (error) {
			showAlert('No se pudo actualizar la familia', 'success');
		}
	};

	return { updateFamily };
};

export default useFamilyUpdate;
