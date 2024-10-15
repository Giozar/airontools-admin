import React, { useEffect, useState } from 'react';
import CheckboxInput from './CheckboxInput';

interface CheckboxInputListProps {
	id: string;
	name: string;
	options: { value: string; label: string }[];
	preselectedValues?: string[];
	onChange: (selectedValues: string[]) => void;
}

const CheckboxInputList: React.FC<CheckboxInputListProps> = ({
	id,
	name,
	options,
	preselectedValues,
	onChange,
}) => {
	const [selectedValues, setSelectedValues] = useState<string[]>(
		() => preselectedValues || [],
	);

	useEffect(() => {
		// Solo actualizar si hay un cambio en las opciones
		const newSelectedValues = selectedValues.filter(value =>
			options.some(option => option.value === value),
		);
		setSelectedValues(newSelectedValues);
	}, [options]);

	useEffect(() => {
		if (preselectedValues) {
			// Solo inicializa si no hay valores seleccionados
			if (selectedValues.length === 0) {
				setSelectedValues(preselectedValues);
			}
		}
	}, [preselectedValues, selectedValues]);

	const handleCheckboxChange = (value: string) => {
		const newSelectedValues = selectedValues.includes(value)
			? selectedValues.filter(v => v !== value)
			: [...selectedValues, value];

		setSelectedValues(newSelectedValues);
		onChange(newSelectedValues);
	};

	return (
		<div className='checkboxInput'>
			<label>{name}</label>
			<div id={id}>
				{options.map(option => (
					<div key={option.value}>
						<CheckboxInput
							id={option.value}
							label={option.label}
							value={option.value}
							checked={selectedValues.includes(option.value)} // Verifica si está seleccionado
							onChange={() => handleCheckboxChange(option.value)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default CheckboxInputList;
