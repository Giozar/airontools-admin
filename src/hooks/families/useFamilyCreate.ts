// src/hooks/useFamilyCreate.ts

import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { FamilyDataToSend } from '@interfaces/Family.interface';
import { createFamilyService } from '@services/families/createFamily.service';
import { useState } from 'react';

const useFamilyCreate = () => {
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();
	const [familyId, setFamilyId] = useState<string>('');

	const createFamily = async (familyData: FamilyDataToSend) => {
		try {
			const result = await createFamilyService(familyData);
			setFamilyId(result._id);
			showSuccess('Familia Creada Con Éxito');
			return result._id;
		} catch (error) {
			showError('Error al crear la familia');
		}
	};

	return { errorLog, successLog, createFamily, familyId };
};

export default useFamilyCreate;
