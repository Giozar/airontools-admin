// src/hooks/useFamilyCreate.ts

import { useAlert } from '@contexts/Alert/AlertContext';
import { FamilyDataToSend } from '@interfaces/Family.interface';
import { createFamilyService } from '@services/families/createFamily.service';
import { useState } from 'react';

const useFamilyCreate = () => {
	const { showAlert } = useAlert();
	const [familyId, setFamilyId] = useState<string>('');

	const createFamily = async (familyData: FamilyDataToSend) => {
		try {
			const result = await createFamilyService(familyData);
			setFamilyId(result._id);
			showAlert('Familia Creada Con Éxito', 'success');
			return result._id;
		} catch (error) {
			showAlert('Error al crear la familia', 'error');
		}
	};

	return { createFamily, familyId };
};

export default useFamilyCreate;
