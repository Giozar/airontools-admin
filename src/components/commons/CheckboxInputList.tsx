import React, { useEffect, useRef, useState } from 'react';
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
		preselectedValues || [],
	);

	const prevOptionsRef = useRef<{ value: string; label: string }[]>(options);

	useEffect(() => {
		const prevOptions = prevOptionsRef.current;
		prevOptionsRef.current = options;

		if (JSON.stringify(prevOptions) !== JSON.stringify(options)) {
			setSelectedValues([]);
		}
		if (preselectedValues) {
			setSelectedValues(preselectedValues);
		}
	}, [options, preselectedValues]);

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
