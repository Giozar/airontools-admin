import '@components/css/createSpecs.css';
import { useAlert } from '@contexts/Alert/AlertContext';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useSpecificationContext } from '@contexts/specification/SpecificationContext';
import { ErrorResponse } from '@interfaces/ErrorResponse';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import createSpecification from '@services/specifications/createSpecification.service';
import { useEffect, useState } from 'react';

function SpecificationForm() {
	const { categorizations } = useSpecificationContext();
	const { user } = useAuthContext();
	const [specifications, setSpecifications] = useState<SpecDataToSend[]>([]);
	const createdBy = user?.id || 'user';
	const { showAlert } = useAlert();

	// Inicializa el estado de especificaciones cada vez que cambian las IDs
	useEffect(() => {
		const families = categorizations.map(cat => cat.selectedFamily);
		const categories = categorizations.flatMap(cat => cat.selectedCategories);
		const subcategories = categorizations.flatMap(
			cat => cat.selectedSubcategories,
		);
		setSpecifications([
			{
				name: '',
				description: '',
				unit: '',
				createdBy,
				families,
				categories,
				subcategories: subcategories || '',
			},
		]);
	}, [categorizations, createdBy]);

	// Añade una nueva especificación
	const addSpecifications = () => {
		const families = categorizations.map(cat => cat.selectedFamily);
		const categories = categorizations.flatMap(cat => cat.selectedCategories);
		const subcategories = categorizations.flatMap(
			cat => cat.selectedSubcategories,
		);
		setSpecifications(prevSpecs => [
			...prevSpecs,
			{
				name: '',
				description: '',
				unit: '',
				createdBy,
				families,
				categories,
				subcategories: subcategories || '',
			},
		]);
	};

	// Elimina una especificación por su índice
	const deleteSpecification = (index: number) => {
		setSpecifications(prevSpecs => prevSpecs.filter((_, i) => i !== index));
	};

	// Maneja cambios en los campos de una especificación
	const handleInputChangeInSpec = (
		index: number,
		field: keyof SpecDataToSend,
		value: string,
	) => {
		setSpecifications(prevSpecs => {
			const newSpecs = [...prevSpecs];
			newSpecs[index] = {
				...newSpecs[index],
				[field]: value,
			};
			return newSpecs;
		});
	};

	// Guarda las especificaciones
	const saveSpecifications = async () => {
		for (const specification of specifications) {
			try {
				await createSpecification({
					specification,
				});
				showAlert('Especificación creada con éxito', 'success');
			} catch (error) {
				const err = error as ErrorResponse;
				showAlert(
					`Ocurrió un error al crear la especificación ${err.message}`,
					'error',
				);
			}
		}
	};

	return (
		<div id='specifications'>
			{specifications.map((spec, index) => (
				<div
					key={index}
					id={`especificacion-${index}`}
					className='especificacion'
				>
					<p>
						Especificación {index + 1}{' '}
						<button
							onClick={() => deleteSpecification(index)}
							className='delete'
						>
							Borrar
						</button>
					</p>

					<form className='form-group'>
						<input
							type='text'
							placeholder='Nombre'
							value={spec.name}
							onChange={e =>
								handleInputChangeInSpec(index, 'name', e.target.value)
							}
							required
						/>
						<textarea
							placeholder='Descripción (opcional)'
							value={spec.description}
							onChange={e =>
								handleInputChangeInSpec(index, 'description', e.target.value)
							}
						/>
						<input
							id='unit'
							type='text'
							placeholder='Unidades (opcional)'
							value={spec.unit}
							onChange={e =>
								handleInputChangeInSpec(index, 'unit', e.target.value)
							}
						/>
					</form>
				</div>
			))}
			<button onClick={addSpecifications}>Agregar Especificación</button>
			<button onClick={saveSpecifications} className='save'>
				Guardar Especificaciones
			</button>
		</div>
	);
}

export default SpecificationForm;
