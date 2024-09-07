import ErrorMessage from '@components/commons/ErrorMessage';
import SuccessMessage from '@components/commons/SuccessMessage';
import '@components/css/createSpecs.css';
import { AuthContext } from '@contexts/auth/AuthContext';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { SpecificationFormProps } from '@interfaces/SpecificationFormProps.interface';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import createSpecification from '@services/specifications/createSpecification.service';
import { errorHandler } from '@utils/errorHandler.util';
import { useContext, useEffect, useState } from 'react';

function SpecificationForm({
	familiesId,
	categoriesId,
	subcategoriesId,
}: SpecificationFormProps) {
	const [specifications, setSpecifications] = useState<SpecDataToSend[]>([]);
	const { showError, errorLog } = useErrorHandling();
	const authContext = useContext(AuthContext);
	const createdBy = authContext?.user?.id || 'user';
	const { showSuccess, successLog } = useSuccessHandling();

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
				showSuccess('Especificación creada con éxito');
			} catch (error) {
				errorHandler(error, showError);
			}
		}
	};

	return (
		<div id='specifications'>
			{<ErrorMessage message={errorLog.message} />}
			{<SuccessMessage message={successLog.message} />}
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
