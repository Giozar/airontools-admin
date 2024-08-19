import ErrorMessage from '@components/commons/ErrorMessage';
import SuccessMessage from '@components/commons/SuccessMessage';
import '@components/css/createSpecs.css';
import { AuthContext } from '@contexts/AuthContext';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { SpecificationFormProps } from '@interfaces/SpecificationFormProps.interface';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import createSpecification from '@services/specifications/createSpecification.service';
import { errorHandler } from '@utils/errorHandler.util';
import { useContext, useEffect, useState } from 'react';

function SpecificationForm({
	familyId,
	categoryId,
	subcategoryId,
}: SpecificationFormProps) {
	const [specifications, setSpecifications] = useState<SpecDataToSend[]>([]);
	const { showError, errorLog } = useErrorHandling();
	const authContext = useContext(AuthContext);
	const createdBy = authContext?.user?.id || 'user';
	const { showSuccess, successLog } = useSuccessHandling();
	const [flag, setFlag] = useState(false);
	// Aquí se inicializa el Array con un objeto vacío al primer render del dom
	useEffect(() => {
		console.log(subcategoryId);
		setSpecifications([
			{
				name: '',
				description: '',
				unit: '',
				createdBy,
				family: familyId,
				category: categoryId,
				subcategory: subcategoryId || '',
			},
		]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [flag]);

	// Se añade una especificación y se suma uno al conteo
	const addSpecifications = () => {
		setSpecifications([
			...specifications,
			{
				name: '',
				description: '',
				unit: '',
				createdBy,
				family: familyId,
				category: categoryId,
				subcategory: subcategoryId || '',
			},
		]);
	};

	// Se elimina por la posición
	const deleteSpecification = (index: number) => {
		setSpecifications(specifications.filter((_, i) => i !== index));
	};

	const handleInputChangeInSpec = (
		index: number,
		field: keyof SpecDataToSend,
		value: string,
	) => {
		const newspecifications = [...specifications];
		newspecifications[index] = {
			...newspecifications[index],
			[field]: value,
		};
		setSpecifications(newspecifications);
	};

	const saveSpecifications = async () => {
		for (const specification of specifications) {
			try {
				await createSpecification({
					specification,
				});
				showSuccess('Especificación creado con éxito');
				setFlag(!flag);
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
