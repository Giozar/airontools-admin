import TrashIcon from '@components/svg/TrashIcon';
import React, { useEffect, useState } from 'react';

interface DynamicInput {
	id: number;
	value: string;
}
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
	const [inputs, setInputs] = useState<DynamicInput[]>([]);

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
			<button onClick={handleAdd} type='button' className='add'>
				Añadir {label}
			</button>
		</div>
	);
};

export default DynamicInputs;
