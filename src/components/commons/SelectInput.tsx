import '@components/css/SelectInput.css';
import React from 'react';
interface SelectInputProps {
	id: string;
	name: string;
	options: { value: string; label: string }[];
	value?: string;
	onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
	id,
	name,
	options,
	value,
	onChange,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value);
	};

	return (
		<div className='select-input'>
			<label htmlFor={id} className='select-input__label'>
				{name}
			</label>
			<select
				id={id}
				value={value || ''}
				onChange={handleChange}
				className='select-input__select'
			>
				<option value=''>Selecciona una opción</option>
				{options.map(option => (
					<option
						key={option.value}
						value={option.value}
						className='select-input__option'
					>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectInput;
