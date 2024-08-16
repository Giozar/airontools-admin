import TrashIcon from '@components/svg/TrashIcon';
import { ChangeEvent, useEffect, useState } from 'react';
import ImageUploaderSingle from './ImageUploaderSingle';
import TextAreaInput from './TextAreaInput';
import TextInput from './TextInput';
interface DynamicInputArea {
	name: string;
	description: string;
}

interface DynamicInputAreaProps {
	name: string;
	type: string;
	filePreviews: {
		[key: string]: string[];
	};
	onFileSelect: (event: ChangeEvent<HTMLInputElement>, type: string) => void;
	onRemoveFile: (type: string, index: number) => void;
	onChange?: (components: DynamicInputArea[]) => void;
}

const DynamicImageInputAreaList = ({
	name,
	type,
	filePreviews,
	onFileSelect,
	onRemoveFile,
	onChange,
}: DynamicInputAreaProps) => {
	const [components, setComponents] = useState<DynamicInputArea[]>([]);

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

	const handleAddComponent = () => {
		setComponents([...components, { name: '', description: '' }]);
	};

	const handleRemoveComponent = (index: number) => {
		setComponents(components.filter((_, i) => i !== index));
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					marginBottom: '50px',
				}}
			>
				{components.map((component, index) => (
					<div key={index} style={{ display: 'flex', margin: '20px' }}>
						<div>
							<TextInput
								id={`name-${index}`}
								label={`Nombre de ${name} ${index + 1}:`}
								value={component.name}
								placeholder={`${name} ${index + 1}`}
								onChange={e => handleNameChange(index, e.target.value)}
								required={true}
							/>
							<br />
							<TextAreaInput
								id={`description-${index}`}
								label={`Descripción de ${name} ${index + 1}:`}
								value={component.description}
								placeholder={`Introduce la descripción de la ${name} ${index + 1}...`}
								onChange={e => handleDescriptionChange(index, e.target.value)}
								rows={2}
							/>
							<ImageUploaderSingle
								title={`Imagen de ${name} ${index + 1}:`}
								filePreviews={filePreviews}
								onFileSelect={onFileSelect}
								onRemoveFile={onRemoveFile}
								type={type}
								index={index + 1}
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
			<button type='button' className='add' onClick={handleAddComponent}>
				Añadir {name}
			</button>
		</>
	);
};

export default DynamicImageInputAreaList;
