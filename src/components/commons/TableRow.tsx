import React, { ChangeEvent } from 'react';

interface TableRowProps {
	label: string;
	unit: string;
	value: string;
	onValueChange: (newValue: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({
	label,
	unit,
	value,
	onValueChange,
}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onValueChange(e.target.value);
	};

	return (
		<tr className='tableRow'>
			<td className='cell'>
				<div className='label'>{label}</div>
				<input type='text' value={value} onChange={handleChange} />
				<div className='unit'>{unit}</div>
			</td>
		</tr>
	);
};

export default TableRow;
