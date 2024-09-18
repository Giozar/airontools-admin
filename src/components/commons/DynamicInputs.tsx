import '@components/css/DynamicInputs.css';
import TrashIcon from '@components/svg/TrashIcon';
import { useEffect, useState } from 'react';

interface DynamicInput {
	id: number;
	value: string;
}

interface DynamicInputsProps {
	label: string;
	onValuesChange?: (values: string[]) => void;
	placeholder: string;
}

const DynamicInputs = ({
	label,
	onValuesChange,
	placeholder,
}: DynamicInputsProps) => {
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
		<div className='dynamic-inputs'>
			<label className='dynamic-inputs__label'>{label}</label>
			{inputs.map((input, index) => (
				<div key={index} className='dynamic-inputs__input-group'>
					<input
						type='text'
						value={input.value}
						onChange={e => handleChange(index, e.target.value)}
						placeholder={placeholder}
						className='dynamic-inputs__input'
					/>
					<button
						onClick={() => handleRemove(index)}
						type='button'
						className='dynamic-inputs__delete'
					>
						<TrashIcon />
					</button>
				</div>
			))}
			<button onClick={handleAdd} type='button' className='dynamic-inputs__add'>
				Añadir {label}
			</button>
		</div>
	);
};

export default DynamicInputs;
