import '@components/css/TextInput.css';
import { ChangeEvent } from 'react';
interface NumberInputProps {
	id: string;
	label: string;
	value: string;
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	readOnly?: boolean;
	className?: string;
	classNameForLabel?: string;
	classNameForInput?: string;
	min?: string;
	max?: string;
}

const NumberInput = ({
	id,
	label,
	value,
	placeholder,
	onChange,
	required,
	readOnly,
	className,
	classNameForLabel,
	classNameForInput,
	min = '0',
	max = '1000000',
}: NumberInputProps) => {
	return (
		<div className={className || 'text-input'}>
			<label htmlFor={id} className={classNameForLabel || 'text-input__label'}>
				{label}
			</label>
			<input
				type='number'
				id={id}
				value={value}
				min={min}
				max={max}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				readOnly={readOnly}
				className={classNameForInput || 'text-input__input'}
			/>
		</div>
	);
};

export default NumberInput;
