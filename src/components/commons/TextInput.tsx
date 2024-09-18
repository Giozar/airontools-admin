import React from 'react';

interface TextInputProps {
	id: string;
	label: string;
	value: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	readOnly?: boolean;
	className?: string;
	classNameForLabel?: string;
	classNameForInput?: string;
}

const TextInput: React.FC<TextInputProps> = ({
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
}) => {
	return (
		<div className={className || `textInput`}>
			<label htmlFor={id} className={classNameForLabel}>
				{label}
			</label>
			<input
				type='text'
				id={id}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				readOnly={readOnly}
				className={classNameForInput}
			/>
		</div>
	);
};

export default TextInput;
