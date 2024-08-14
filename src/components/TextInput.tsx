import React from 'react';

interface TextInputProps {
	id: string;
	label: string;
	value: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
	id,
	label,
	value,
	placeholder,
	onChange,
}) => {
	return (
		<div className='textInput'>
			<label htmlFor={id}>{label}</label>
			<input
				type='text'
				id={id}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default TextInput;
