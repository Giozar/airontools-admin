import '@components/css/createSpecs.css';
import { useAlert } from '@contexts/Alert/AlertContext';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { SpecificationFormProps } from '@interfaces/SpecificationFormProps.interface';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import createSpecification from '@services/specifications/createSpecification.service';
import { useEffect, useState } from 'react';
import { ErrorResponse } from 'react-router-dom';

function SpecificationForm({
	familiesId,
	categoriesId,
	subcategoriesId,
}: SpecificationFormProps) {
	const { user } = useAuthContext();
	const [specifications, setSpecifications] = useState<SpecDataToSend[]>([]);
	const createdBy = user?.id || 'user';
	const { showAlert } = useAlert();

	// Inicializa el estado de especificaciones cada vez que cambian las IDs
	useEffect(() => {
		setSpecifications([
			{
				name: '',
				description: '',
				unit: '',
				createdBy,
				families: familiesId,
				categories: categoriesId,
				subcategories: subcategoriesId || '',
			},
		]);
	}, [familiesId, categoriesId, subcategoriesId, createdBy]);

	// Añade una nueva especificación
	const addSpecifications = () => {
		setSpecifications(prevSpecs => [
			...prevSpecs,
			{
				name: '',
				description: '',
				unit: '',
				createdBy,
				families: familiesId,
				categories: categoriesId,
				subcategories: subcategoriesId || '',
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
			} catch (err) {
				const error = err as ErrorResponse;
				showAlert(`No se pudo crear la especificación ${error}`, 'error');
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
