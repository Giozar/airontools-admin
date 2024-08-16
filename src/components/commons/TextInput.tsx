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
}) => {
	return (
		<div className={className || `textInput`}>
			<label htmlFor={id}>{label}</label>
			<input
				type='text'
				id={id}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				readOnly={readOnly}
			/>
		</div>
	);
};

export default TextInput;
