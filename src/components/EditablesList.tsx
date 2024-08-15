import TrashIcon from '@components/svg/TrashIcon';
import { ChangeEvent, useState } from 'react';

interface EditableListProps {
	value: string[];
	onUpdate: (values: string[]) => void;
	onCancel: () => void;
}

function EditableList({ value, onUpdate, onCancel }: EditableListProps) {
	const [inputs, setInputs] = useState<string[]>(value);

	const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
		const newInputs = [...inputs];
		newInputs[index] = e.target.value;
		setInputs(newInputs);
	};

	const handleAddInput = () => {
		setInputs([...inputs, '']);
	};

	const handleRemoveInput = (index: number) => {
		setInputs(inputs.filter((_, i) => i !== index));
	};

	const handleSave = () => {
		onUpdate(inputs);
	};

	return (
		<div className='editable-list'>
			{inputs.map((input, index) => (
				<div key={index} className='input-group'>
					<input
						type='text'
						value={input}
						onChange={e => handleChange(index, e)}
						onKeyDown={e => e.key === 'Enter' && handleSave()}
						autoFocus
						style={{ margin: '0' }}
					/>
					<button
						type='button'
						className='delete'
						onClick={() => handleRemoveInput(index)}
						style={{ transform: 'scale(0.7)' }}
					>
						<TrashIcon />
					</button>
				</div>
			))}
			<button
				type='button'
				onClick={handleAddInput}
				style={{ margin: '1rem 0 2rem 2rem' }}
			>
				Añadir
			</button>

			<div className='buttons'>
				<button className='edit' onClick={onCancel}>
					Cancelar
				</button>
				<button className='save' onClick={handleSave}>
					Editar
				</button>
			</div>
		</div>
	);
}

export default EditableList;
