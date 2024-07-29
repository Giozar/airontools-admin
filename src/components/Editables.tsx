import '@components/css/editables.css';
import { ChangeEvent, useEffect, useState } from 'react';
import AutoCompleteInput from './AutoCompleteInput';
interface Option {
	id: string;
	name: string;
}
interface EditablesProps {
	what: string;
	valueOf: string;
	type: 'input' | 'textarea' | 'select';
	whichOne?: number;
	onUpdate?: (value: string) => void;
	onUpdateOne?: (value: string, whichOne: number) => void;
	list?: Option[];
}

function Editables({
	what,
	valueOf,
	type,
	whichOne,
	onUpdate,
	onUpdateOne,
	list,
}: EditablesProps) {
	const [input, setInput] = useState(valueOf);
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		setInput(valueOf);
	}, [valueOf]);

	const handleEditClick = () => {
		setEditing(!editing);
		setInput(valueOf);
	};

	const handleSaveClick = () => {
		if (whichOne && onUpdateOne) onUpdateOne(input, whichOne);
		else if (onUpdate) onUpdate(input);

		setEditing(false);
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setInput(e.target.value);
	};
	const handleChangeSelect = (value: string) => {
		setInput(value);
	};

	return (
		<div className='editable'>
			<label htmlFor={what}>{what}:</label>
			<div className='content'>
				{!editing ? (
					<p>{valueOf}</p>
				) : (
					<form>
						{type === 'input' && (
							<input
								type='text'
								value={input}
								onChange={handleChange}
								id={what}
							/>
						)}
						{type === 'textarea' && (
							<textarea value={input} onChange={handleChange} id={what} />
						)}
						{type === 'select' && list && onUpdate && (
							<AutoCompleteInput
								inputName={what}
								options={list}
								onSelect={handleChangeSelect}
							/>
						)}
					</form>
				)}
				<div className='buttons'>
					<button className='edit' onClick={handleEditClick}>
						{editing ? 'Cancelar' : 'Editar'}
					</button>
					{editing && (
						<button className='save' onClick={handleSaveClick}>
							Guardar
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
export default Editables;
