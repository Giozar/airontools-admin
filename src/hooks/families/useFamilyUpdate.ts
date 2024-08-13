// src/hooks/useFamilyUpdate.ts

import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { FamilyDataToSend } from '@interfaces/Family.interface';
import { updateFamilyService } from '@services/families/updateFamily.service';

const useFamilyUpdate = () => {
	const { errorLog: errorLogFamily, showError: showErrorFamily } =
		useErrorHandling();
	const { successLog: successLogFamily, showSuccess: showSuccessFamily } =
		useSuccessHandling();

	const updateFamily = async (familyData: FamilyDataToSend) => {
		try {
			await updateFamilyService(familyData);
			showSuccessFamily('Familia Actualizada Con Éxito');
		} catch (error) {
			showErrorFamily(errorLogFamily.message);
		}
	};

	return { errorLogFamily, successLogFamily, updateFamily };
};

export default useFamilyUpdate;
