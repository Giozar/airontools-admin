import React from 'react';

interface SelectInputProps {
	id: string;
	name: string;
	options: { value: string; label: string }[];
	value: string;
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
		<div className='selectInput'>
			<label htmlFor={id}>{name}</label>
			<select id={id} value={value?.name} onChange={handleChange}>
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