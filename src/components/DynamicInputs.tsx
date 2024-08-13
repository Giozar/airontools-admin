import React, { useEffect, useState } from 'react';
import TrashIcon from './svg/TrashIcon';

interface DynamicInputsProps {
	label: string;
	onValuesChange?: (values: string[]) => void;
}

const DynamicInputs: React.FC<DynamicInputsProps> = ({
	label,
	onValuesChange,
}) => {
	const [inputs, setInputs] = useState([{ id: Date.now(), value: '' }]);

	const handleAdd = () => {
		setInputs([...inputs, { id: Date.now(), value: '' }]);
	};

	const handleRemove = (index: number) => {
		setInputs(inputs.filter((_, i) => i !== index));
	};

	const handleChange = (index: number, value: string) => {
		setInputs(
			inputs.map((input, i) => (i === index ? { ...input, value } : input)),
		);
	};
	useEffect(() => {
		const values = inputs.map(input => input.value);
		if (onValuesChange) {
			onValuesChange(values);
		}
	}, [inputs, onValuesChange]);

	return (
		<div>
			<label>{label}</label>
			{inputs.map((input, index) => (
				<div key={index}>
					<input
						type='text'
						value={input.value}
						onChange={e => handleChange(index, e.target.value)}
					/>
					<button onClick={() => handleRemove(index)}>
						<TrashIcon />
					</button>
				</div>
			))}
			<button onClick={handleAdd}>Añadir Característica</button>
		</div>
	);
};

export default DynamicInputs;
