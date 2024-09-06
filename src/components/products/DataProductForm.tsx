import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';

interface DataProductProps {
	toolName: string;
	toolModel: string;
	setToolName: (value: string) => void;
	setToolModel: (value: string) => void;
	toolDescription: string;
	setToolDescription: (value: string) => void;
}

export const DataProduct = ({
	toolName,
	toolModel,
	setToolName,
	setToolModel,
	toolDescription,
	setToolDescription,
}: DataProductProps) => {
	return (
		<>
			<div className='form-header'>
				<TextInput
					id='toolName'
					label='Nombre de herramienta'
					value={toolName}
					placeholder='Herramienta 1'
					onChange={e => setToolName(e.target.value)}
				/>

				<TextInput
					id='toolModel'
					label='Modelo de herramienta'
					value={toolModel}
					placeholder='---'
					onChange={e => setToolModel(e.target.value)}
				/>
			</div>
			<div>
				<TextAreaInput
					id='toolDescription'
					label='Descripción de herramienta'
					placeholder='Descripción general de la herramienta'
					value={toolDescription}
					onChange={e => setToolDescription(e.target.value)}
					rows={5}
				/>
			</div>
		</>
	);
};
