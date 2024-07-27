import { SpecsFrontend } from '@adapters/specifications.adapter';
import '@components/css/createSpecs.css';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { CreateSpecsProps } from '@interfaces/CreateSpecsProps';
import createSpecification from '@services/specifications/createSpecification.service';
import { errorHandler } from '@utils/errorHandler.util';
import { useEffect, useState } from 'react';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
function CreateSpecs({
	familyId,
	categoryId,
	subcategoryId,
}: CreateSpecsProps) {
	const [specifications, setSpecifications] = useState<SpecsFrontend[]>([]);
	const [specificationsCounter, setSpecificationsCounter] = useState<number>(0);
	const { showError, errorLog } = useErrorHandling();
	const { showSuccess, successLog } = useSuccessHandling();
	useEffect(() => {
		setSpecifications([
			{
				name: '',
				description: '',
				unit: '',
				createdBy: '',
				path: '',
				familyId,
				categoryId,
				subcategoryId: subcategoryId || '',
			},
		]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const addSpecifications = () => {
		setSpecificationsCounter(specificationsCounter + 1);
		setSpecifications([
			...specifications,
			{
				name: '',
				description: '',
				unit: '',
				createdBy: '',
				path: '',
				familyId,
				categoryId,
				subcategoryId: subcategoryId || '',
			},
		]);
	};

	const deleteSpecification = (index: number) => {
		setSpecifications(specifications.filter((_, i) => i !== index));
	};

	const handleInputChangeInSpec = (
		index: number,
		field: keyof SpecsFrontend,
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
				await createSpecification({ specification });
				showSuccess('Especificación creado con éxito');
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
export default CreateSpecs;
