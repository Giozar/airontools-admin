import React from 'react';

interface TextAreaInputProps {
	id: string;
	label: string;
	placeholder?: string;
	value: string;
	rows?: number;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
	id,
	label,
	placeholder = '',
	value,
	rows = 3,
	onChange,
}) => {
	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<textarea
				id={id}
				placeholder={placeholder}
				rows={rows}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default TextAreaInput;
