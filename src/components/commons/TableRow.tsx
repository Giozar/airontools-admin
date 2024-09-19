import '@components/css/TableRow.css';
import React, { ChangeEvent, useEffect, useState } from 'react';
interface TableRowProps {
	label: string;
	unit: string;
	placeholder: string;
	onValueChange: (newValue: string) => void;
	value?: string;
}

const TableRow: React.FC<TableRowProps> = ({
	label,
	unit,
	placeholder,
	onValueChange,
	value = '',
}) => {
	const [inputValue, setInputValue] = useState(value);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setInputValue(newValue);
		onValueChange(newValue);
	};

	return (
		<tr className='table-row'>
			<td className='table-row__cell'>
				<div className='table-row__label'>{label}</div>
				<div className='table-row__input-container'>
					<input
						type='text'
						placeholder={placeholder}
						value={inputValue}
						onChange={handleChange}
						className='table-row__input'
					/>
					<div className='table-row__unit'>{unit}</div>
				</div>
			</td>
		</tr>
	);
};

export default TableRow;
