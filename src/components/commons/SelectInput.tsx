import React from 'react';

interface SelectInputProps {
	id: string;
	name: string;
	options: { value: string; label: string }[];
	value?: string; // Add a value prop for the preselected value
	onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
	id,
	name,
	options,
	value, // Receive the value prop
	onChange,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value);
	};

	return (
		<div className='selectInput'>
			<label htmlFor={id}>{name}</label>
			<select id={id} value={value} onChange={handleChange}>
				<option value=''>Selecciona una opción</option>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectInput;
