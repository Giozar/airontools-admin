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
