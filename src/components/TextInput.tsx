import React from 'react';

interface TextInputProps {
	id: string;
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
	id,
	label,
	value,
	onChange,
}) => {
	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input type='text' id={id} value={value} onChange={onChange} />
		</div>
	);
};

export default TextInput;
