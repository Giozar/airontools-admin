import React from 'react';

interface SelectInputProps {
	id: string;
	label: string;
	options: { value: string; label: string }[];
	value: string;
	onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
	id,
	label,
	options,
	value,
	onChange,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value);
	};
	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<select id={id} value={value} onChange={handleChange}>
				<option value='' disabled>
					Selecciona una opción
				</option>
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
