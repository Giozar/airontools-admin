import React from 'react';

interface TextAreaInputProps {
	id: string;
	label: string;
	placeholder?: string;
	value: string;
	rows?: number;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	className?: string;
	classNameForLabel?: string;
	classNameForTextArea?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
	id,
	label,
	placeholder = '',
	value,
	rows = 3,
	onChange,
	className,
	classNameForLabel,
	classNameForTextArea,
}) => {
	return (
		<div className={className || `textAreaInput`}>
			<label htmlFor={id} className={classNameForLabel}>
				{label}
			</label>
			<textarea
				id={id}
				placeholder={placeholder}
				rows={rows}
				value={value}
				onChange={onChange}
				className={classNameForTextArea}
			/>
		</div>
	);
};

export default TextAreaInput;
