import React, { useEffect } from 'react';

interface SelectInputProps {
	id: string;
	name: string;
	options: { value: string; label: string }[];
	onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
	id,
	name,
	options,
	onChange,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value);
	};

	useEffect(() => {}, [handleChange]);

	return (
		<div className='selectInput'>
			<label htmlFor={id}>{name}</label>
			<select id={id} onChange={handleChange}>
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
