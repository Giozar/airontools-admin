import React, { ChangeEvent } from 'react';

interface TableRowProps {
	label: string;
	unit: string;
	placeholder: string;
	onValueChange: (newValue: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({
	label,
	unit,
	placeholder,
	onValueChange,
}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onValueChange(e.target.value); // Llama a la función pasada desde el componente padre
	};

	return (
		<tr className='tableRow'>
			<td className='cell'>
				<div className='label'>{label}</div>
				<input type='text' placeholder={placeholder} onChange={handleChange} />
				<div className='unit'>{unit}</div>
			</td>
		</tr>
	);
};

export default TableRow;
