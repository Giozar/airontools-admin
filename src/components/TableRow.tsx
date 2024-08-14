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
		<tr>
			<th>{label}</th>
			<td>
				<input type='text' value={value} onChange={handleChange} />
			</td>
			<td>{unit}</td>
		</tr>
	);
};

export default TableRow;
