import React from 'react';

interface SelectInputProps {
	id: string;
	name: string;
	options: { value: string; label: string }[];
	value: any;
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
			<select id={id} value={value?.name || value} onChange={handleChange}>
				<option value=''>Selecciona una opción</option>
				{options.map((option, index) => (
					<option key={option.value + index + 'select'} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectInput;
