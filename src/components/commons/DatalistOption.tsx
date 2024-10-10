import '@components/css/datalistOption.css';
import React from 'react';

interface DatalistInputProps {
	id: string;
	name: string;
	type?: string;
	placeholder?: string;
	options: string[];
	value?: string;
	setValue: (value: string) => void;
}

const DatalistOption: React.FC<DatalistInputProps> = ({
	id,
	name,
	type = 'text',
	placeholder,
	options,
	value,
	setValue,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<div className='datalist-input'>
			<label htmlFor={id} className='datalist-input__label'>
				{name}
			</label>
			<input
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={handleChange}
				list={`${id}-list`}
				placeholder={placeholder}
				className='datalist-input__input'
			/>
			<datalist id={`${id}-list`} className='datalist-input__datalist'>
				{options.map(option => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</datalist>
		</div>
	);
};

export default DatalistOption;
