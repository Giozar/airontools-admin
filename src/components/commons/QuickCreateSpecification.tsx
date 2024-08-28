import TrashIcon from '@components/svg/TrashIcon';
import { AuthContext } from '@contexts/AuthContext';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import createSpecification from '@services/specifications/createSpecification.service';
import { errorHandler } from '@utils/errorHandler.util';
import { useContext, useEffect, useState } from 'react';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import TextAreaInput from './TextAreaInput';
import TextInput from './TextInput';

interface DynamicInputAreaInputProps {
	name: string;
	onChange?: (components: SpecDataToSend[]) => void;
	familyId: string;
	categoryId: string;
	subcategoryId: string;
}

const QuickCreateSpecification = ({
	name,
	onChange,
	familyId,
	categoryId,
	subcategoryId,
}: DynamicInputAreaInputProps) => {
	const [components, setComponents] = useState<SpecDataToSend[]>([]);
	const [showAddButton, setShowAddButton] = useState<boolean>(true);
	const [showCreateButton, setShowCreateButton] = useState<boolean>(false);
	const authContext = useContext(AuthContext);
	const createdBy = authContext?.user?.id || 'user';

	const { showError, errorLog } = useErrorHandling();
	const { showSuccess, successLog } = useSuccessHandling();

	const [flag, setFlag] = useState(false);
	useEffect(() => {
		handleRemoveComponent(0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [flag]);
	const saveSpecifications = async () => {
		try {
			await createSpecification({
				specification: components[0],
			});
			showSuccess('Especificación creada con éxito');
			setFlag(!flag);
		} catch (error) {
			errorHandler(error, showError);
		}
	};

	useEffect(() => {
		if (onChange) onChange(components);
	}, [components, onChange]);

	const handleNameChange = (index: number, newName: string) => {
		const newComponents = [...components];
		newComponents[index].name = newName;
		setComponents(newComponents);
	};

	const handleDescriptionChange = (index: number, newDescription: string) => {
		const newComponents = [...components];
		newComponents[index].description = newDescription;
		setComponents(newComponents);
	};
	const handleUnitChange = (index: number, newUnit: string) => {
		const newComponents = [...components];
		newComponents[index].unit = newUnit;
		setComponents(newComponents);
	};

	const handleAddComponent = () => {
		if (components.length === 0) {
			setComponents([
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
		} else {
			setComponents([
				...components,
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
		}
		setShowAddButton(false);
		setShowCreateButton(true);
	};

	const handleRemoveComponent = (index: number) => {
		setComponents(components.filter((_, i) => i !== index));
		if (components.length <= 1) {
			setShowAddButton(true);
			setShowCreateButton(false);
		}
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
				}}
			>
				{<ErrorMessage message={errorLog.message} />}
				{<SuccessMessage message={successLog.message} />}
				{components.map((component, index) => (
					<div key={index} style={{ display: 'flex', margin: '20px' }}>
						<div>
							<TextInput
								id={`name-${index}`}
								label={`Nombre de ${name}:`}
								value={component.name}
								placeholder={`${name}`}
								onChange={e => handleNameChange(index, e.target.value)}
								required={true}
							/>
							<br />
							<TextAreaInput
								id={`description-${index}`}
								label={`Descripción de ${name}:`}
								value={component.description || ''}
								placeholder={`Introduce la descripción de la ${name}...`}
								onChange={e => handleDescriptionChange(index, e.target.value)}
								rows={2}
							/>
							<TextInput
								id={`unit-${index}`}
								label={`Unidad de ${name}:`}
								value={component.unit || ''}
								placeholder={`${name}`}
								onChange={e => handleUnitChange(index, e.target.value)}
								required={true}
							/>
						</div>
						<div>
							<button
								type='button'
								className='delete'
								style={{ padding: '5px' }}
								onClick={() => handleRemoveComponent(index)}
							>
								<TrashIcon />
							</button>
						</div>
					</div>
				))}
			</div>
			{showAddButton && (
				<button type='button' className='add' onClick={handleAddComponent}>
					Añadir {name}
				</button>
			)}
			{showCreateButton && (
				<button type='button' className='edit' onClick={saveSpecifications}>
					Crear {name}
				</button>
			)}
		</>
	);
};

export default QuickCreateSpecification;
