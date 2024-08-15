import TrashIcon from '@components/svg/TrashIcon';
import React, { useEffect, useState } from 'react';

interface DynamicInputsProps {
	label: string;
	onValuesChange?: (values: string[]) => void;
	placeholder: string;
}

const DynamicInputs: React.FC<DynamicInputsProps> = ({
	label,
	onValuesChange,
	placeholder,
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
		<div className='dynamicInputs'>
			<label>{label}</label>
			{inputs.map((input, index) => (
				<div key={index} className='input-group'>
					<input
						type='text'
						value={input.value}
						onChange={e => handleChange(index, e.target.value)}
						placeholder={placeholder}
					/>
					<button
						onClick={() => handleRemove(index)}
						type='button'
						className='delete'
					>
						<TrashIcon />
					</button>
				</div>
			))}
			<button onClick={handleAdd} type='button'>
				Añadir {label}
			</button>
		</div>
	);
};

export default DynamicInputs;
