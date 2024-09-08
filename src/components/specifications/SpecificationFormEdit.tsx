import ErrorMessage from '@components/commons/ErrorMessage';
import SuccessMessage from '@components/commons/SuccessMessage';
import '@components/css/createSpecs.css';
import { useAuthContext } from '@contexts/auth/AuthContext';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { SpecificationFormEditProps } from '@interfaces/SpecificationFormProps.interface';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import editSpecification from '@services/specifications/editSpecification.service';
import { errorHandler } from '@utils/errorHandler.util';
import { useEffect, useState } from 'react';

function SpecificationFormEdit({
	specToEdit,
	familiesId,
	categoriesId,
	subcategoriesId,
}: SpecificationFormEditProps) {
	const id = specToEdit?._id as string;
	const [specification, setSpecification] = useState<SpecDataToSend>({
		name: specToEdit?.name || '',
		description: specToEdit?.description || '',
		unit: specToEdit?.unit || '',
		createdBy: '',
		families: familiesId,
		categories: categoriesId,
		subcategories: subcategoriesId || '',
	});

	const { user } = useAuthContext();

	const { showError, errorLog } = useErrorHandling();
	const { showSuccess, successLog } = useSuccessHandling();
	const createdBy = user?.id || 'user';

	useEffect(() => {
		// Actualiza el estado de la especificación cuando cambian las IDs o el usuario autenticado
		setSpecification(prevSpec => ({
			...prevSpec,
			createdBy,
			families: familiesId,
			categories: categoriesId,
			subcategories: subcategoriesId || '',
		}));
	}, [familiesId, categoriesId, subcategoriesId, createdBy]);

	// Maneja cambios en los campos de la especificación
	const handleInputChange = (field: keyof SpecDataToSend, value: string) => {
		setSpecification(prevSpec => ({
			...prevSpec,
			[field]: value,
		}));
	};

	// Guarda la especificación
	const saveSpecification = async () => {
		try {
			await editSpecification({ specification, id });
			showSuccess('Especificación creada con éxito');
		} catch (error) {
			errorHandler(error, showError);
		}
	};

	return (
		<div id='specifications'>
			<ErrorMessage message={errorLog.message} />
			<SuccessMessage message={successLog.message} />

			<form className='form-group'>
				<input
					type='text'
					placeholder='Nombre'
					value={specification.name}
					onChange={e => handleInputChange('name', e.target.value)}
					required
				/>
				<textarea
					placeholder='Descripción (opcional)'
					value={specification.description}
					onChange={e => handleInputChange('description', e.target.value)}
				/>
				<input
					id='unit'
					type='text'
					placeholder='Unidades (opcional)'
					value={specification.unit}
					onChange={e => handleInputChange('unit', e.target.value)}
				/>
			</form>

			<button onClick={saveSpecification} className='save'>
				Guardar Especificación
			</button>
		</div>
	);
}

export default SpecificationFormEdit;
