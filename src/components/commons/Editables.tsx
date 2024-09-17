import '@components/css/editables.css';
import React, { ChangeEvent, useEffect, useState } from 'react';
import EditableList from './EditablesList';

interface Option {
	id: string;
	name: string;
}
interface EditablesProps {
	what: string;
	valueOf: string;
	unit?: string;
	type: 'input' | 'textarea' | 'list';
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
	strlist,
	onUpdateMany,
}: EditablesProps) {
	const [input, setInput] = useState(valueOf);
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		setInput(valueOf);
		if (!valueOf) setEditing(true);
	}, [valueOf]);

	const handleEditClick = () => {
		setEditing(!editing);
		setInput(valueOf);
	};

	const handleSaveInput = () => {
		if (whichOne && onUpdateOne) {
			onUpdateOne(input, whichOne);
		} else if (onUpdate) onUpdate(input);

		setEditing(false);
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setInput(e.target.value);
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
					<div onClick={handleEditClick}>
						{valueOf.includes('<br>') ? (
							valueOf.split('<br>').map(value => (
								<React.Fragment key={value}>
									<p>{value}</p>
									<br />
								</React.Fragment>
							))
						) : (
							<p>
								{valueOf} {unit || ''}
							</p>
						)}
					</div>
				) : (
					<>
						{type === 'input' && (
							<div
								style={{ display: 'flex', alignItems: 'center', width: '100%' }}
							>
								<input
									type='text'
									value={input}
									onChange={handleChange}
									onKeyDown={handleKeyDown}
									id={what}
								/>
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
						{type === 'list' && strlist && onUpdateMany && (
							<EditableList
								value={strlist}
								onUpdate={handleUpdate}
								onCancel={handleEditClick}
							/>
						)}
					</>
				)}
				<div className='buttons'>
					{editing && !onUpdateMany && (
						<button className='edit' onClick={handleEditClick}>
							Cancelar
						</button>
					)}
					{editing && !onUpdateMany && (
						<button className='save' onClick={handleSaveInput}>
							Editar
						</button>
					)}
					{!editing && valueOf && (
						<button className='edit' onClick={handleEditClick}>
							Editar
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Editables;
