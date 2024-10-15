import '@components/css/createSpecs.css';
import { useAlertHelper } from '@contexts/Alert/alert.helper';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useSpecificationContext } from '@contexts/specification/SpecificationContext';
import editSpecificationService from '@services/specifications/editSpecification.service';
import { useEffect, useState, useCallback } from 'react';
import { SpecDataToSend } from '@interfaces/Specifications.interface';

function SpecificationFormEdit({ specToEdit }: { specToEdit: SpecDataToSend }) {
	const { categorizations } = useSpecificationContext();
	const id = specToEdit?._id as string;
	const { user } = useAuthContext();
	const { showSuccessAndReload, showError } = useAlertHelper();
	const createdBy = user?.id || 'user';

	const [specification, setSpecification] = useState<SpecDataToSend>({
		name: specToEdit?.name || '',
		description: specToEdit?.description || '',
		unit: specToEdit?.unit || '',
		createdBy,
		families: [],
		categories: [],
		subcategories: [],
	});

	const updateSpecification = useCallback(() => {
		const families = categorizations.map(cat => cat.selectedFamily);
		const categories = categorizations.flatMap(cat => cat.selectedCategories);
		const subcategories = categorizations.flatMap(cat => cat.selectedSubcategories);

		setSpecification(prevSpec => ({
			...prevSpec,
			families,
			categories,
			subcategories,
		}));
	}, [categorizations]);

	useEffect(() => {
		updateSpecification();
	}, [updateSpecification]);

	const handleInputChange = (field: keyof SpecDataToSend, value: string) => {
		setSpecification(prevSpec => ({
			...prevSpec,
			[field]: value,
		}));
	};

	const saveSpecification = async () => {
		try {
			await editSpecificationService({ specification, id });
			showSuccessAndReload('Especificación guardada con éxito');
		} catch (error) {
			showError(`Error al editar especificación`, error);
		}
	};

	return (
		<div id='specifications'>
			<form className='form-group'>
				<label htmlFor='name'>Nombre</label>
				<input
					id='name'
					type='text'
					placeholder='Nombre'
					value={specification.name}
					onChange={e => handleInputChange('name', e.target.value)}
					required
				/>
				<label htmlFor='description'>Descripción (opcional)</label>
				<textarea
					id='description'
					placeholder='Descripción (opcional)'
					value={specification.description}
					onChange={e => handleInputChange('description', e.target.value)}
				/>
				<label htmlFor='unit'>Unidades (opcional)</label>
				<input
					id='unit'
					type='text'
					placeholder='Unidades (opcional)'
					value={specification.unit}
					onChange={e => handleInputChange('unit', e.target.value)}
				/>
				<button onClick={saveSpecification} className='save' type='button'>
					Guardar Especificación
				</button>
			</form>
		</div>
	);
}

export default SpecificationFormEdit;
