import '@components/css/TextInput.css';
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

const TextInput = ({
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
}: TextInputProps) => {
	return (
		<div className={className || 'text-input'}>
			<label htmlFor={id} className={classNameForLabel || 'text-input__label'}>
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
				className={classNameForInput || 'text-input__input'}
			/>
		</div>
	);
};

export default TextInput;
