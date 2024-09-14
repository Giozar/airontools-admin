import React, { ChangeEvent, useEffect, useState } from 'react';

interface TableRowProps {
	label: string;
	unit: string;
	placeholder: string;
	onValueChange: (newValue: string) => void;
	value?: string; // Valor opcional inicial
}

const TableRow: React.FC<TableRowProps> = ({
	label,
	unit,
	placeholder,
	onValueChange,
	value = 'Hola', // Valor inicial opcional
}) => {
	const [inputValue, setInputValue] = useState(value);

	// Sincronizar el valor inicial si cambia
	useEffect(() => {
		setInputValue(value);
	}, [value]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setInputValue(newValue);
		onValueChange(newValue); // Llama a la función pasada desde el componente padre
	};

	return (
		<tr className='tableRow'>
			<td className='cell'>
				<div className='label'>{label}</div>
				<input
					type='text'
					placeholder={placeholder}
					value={inputValue}
					onChange={handleChange}
				/>
				<div className='unit'>{unit}</div>
			</td>
		</tr>
	);
};

export default TableRow;
