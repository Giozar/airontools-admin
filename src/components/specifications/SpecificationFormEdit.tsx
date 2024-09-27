import '@components/css/createSpecs.css';
import { useAlert } from '@contexts/Alert/AlertContext';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useSpecificationContext } from '@contexts/specification/SpecificationContext';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import editSpecificationService from '@services/specifications/editSpecification.service';
import { useEffect, useState } from 'react';

function SpecificationFormEdit({ specToEdit }: { specToEdit: SpecDataToSend }) {
	const { categorizations } = useSpecificationContext();
	const id = specToEdit?._id as string;
	const [specification, setSpecification] = useState<SpecDataToSend>({
		name: specToEdit?.name || '',
		description: specToEdit?.description || '',
		unit: specToEdit?.unit || '',
		createdBy: '',
		families: categorizations.map(cat => cat.selectedFamily),
		categories: categorizations.flatMap(cat => cat.selectedCategories),
		subcategories:
			categorizations.flatMap(cat => cat.selectedSubcategories) || [],
	});

	const { user } = useAuthContext();
	const { showAlert } = useAlert();
	const createdBy = user?.id || 'user';

	useEffect(() => {
		const families = categorizations.map(cat => cat.selectedFamily);
		const categories = categorizations.flatMap(cat => cat.selectedCategories);
		const subcategories = categorizations.flatMap(
			cat => cat.selectedSubcategories,
		);
		// Actualiza el estado de la especificación cuando cambian las IDs o el usuario autenticado
		setSpecification(prevSpec => ({
			...prevSpec,
			createdBy,
			families,
			categories,
			subcategories: subcategories || [],
		}));
	}, [categorizations, createdBy]);

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
			console.log(specification);
			await editSpecificationService({ specification, id });
			showAlert('Especificación guardada con éxito', 'success');
		} catch (error) {
			const err = error as ErrorResponse;
			showAlert(
				`Ocurrió un error al editar especificación ${err.message}`,
				'error',
			);
		}
	};

	return (
		<div id='specifications'>
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
