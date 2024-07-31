import '@components/css/editables.css';
import React, { ChangeEvent, useEffect, useState } from 'react';
import AutoCompleteInput from './AutoCompleteInput';
import EditableList from './EditablesList';

interface Option {
	id: string;
	name: string;
}
interface EditablesProps {
	what: string;
	valueOf: string;
	unit?: string;
	type: 'input' | 'textarea' | 'select' | 'list';
	whichOne?: number;
	onUpdate?: (value: string) => void;
	onUpdateOne?: (value: string, whichOne: number) => void;
	list?: Option[];
	strlist?: string[];
	onUpdateMany?: (value: string[]) => void;
}

function Editables({
	what,
	valueOf,
	unit,
	type,
	whichOne,
	onUpdate,
	onUpdateOne,
	list,
	strlist,
	onUpdateMany,
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

	const handleSaveInput = () => {
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
	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSaveInput();
		}
	};

	const handleUpdate = (newValues: string[]) => {
		if (onUpdateMany) {
			onUpdateMany(newValues);
			console.log(newValues);
		}
		setEditing(false);
	};

	return (
		<div className='editable'>
			<label htmlFor={what}>{what}:</label>
			<div className='content'>
				{!editing ? (
					<p onClick={handleEditClick}>
						{valueOf} {unit || ''}
					</p>
				) : (
					<form>
						{type === 'input' && (
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<input
									type='text'
									value={input}
									onChange={handleChange}
									onKeyDown={handleKeyDown}
									id={what}
								/>{' '}
								{unit && <span style={{ marginLeft: '8px' }}>{unit}</span>}
							</div>
						)}
						{type === 'textarea' && (
							<textarea
								value={input}
								onChange={handleChange}
								id={what}
								onKeyDown={handleKeyDown}
							/>
						)}
						{type === 'select' && list && onUpdate && (
							<AutoCompleteInput
								inputName={what}
								options={list}
								onSelect={handleChangeSelect}
							/>
						)}
						{type === 'list' && strlist && onUpdateMany && (
							<EditableList
								value={strlist}
								onUpdate={handleUpdate}
								onCancel={handleEditClick}
							/>
						)}
					</form>
				)}
				<div className='buttons'>
					{editing && !onUpdateMany && (
						<button className='edit' onClick={handleEditClick}>
							Cancelar
						</button>
					)}
					{!valueOf && !editing && (
						<button className='edit' onClick={handleEditClick}>
							Añadir
						</button>
					)}
					{editing && !onUpdateMany && (
						<button className='save' onClick={handleSaveInput}>
							Editar
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
export default Editables;
