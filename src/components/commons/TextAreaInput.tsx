import '@components/css/TextAreaInput.css';
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
	disabled?: boolean;
}

const TextAreaInput = ({
	id,
	label,
	placeholder = '',
	value,
	rows = 3,
	onChange,
	className,
	classNameForLabel,
	classNameForTextArea,
	disabled,
}: TextAreaInputProps) => {
	return (
		<div className={className || 'text-area-input'}>
			<label
				htmlFor={id}
				className={classNameForLabel || 'text-area-input__label'}
			>
				{label}
			</label>
			<textarea
				disabled={disabled}
				id={id}
				placeholder={placeholder}
				rows={rows}
				value={value}
				onChange={onChange}
				className={classNameForTextArea || 'text-area-input__textarea'}
			/>
		</div>
	);
};

export default TextAreaInput;
