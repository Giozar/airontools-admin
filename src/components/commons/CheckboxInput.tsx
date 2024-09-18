import '@components/css/CheckboxInput.css';
interface CheckboxInputProps {
	id: string;
	label: string;
	checked: boolean;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	readOnly?: boolean;
	className?: string;
}

const CheckboxInput = ({
	id,
	label,
	checked,
	value,
	onChange,
	required,
	readOnly,
	className,
}: CheckboxInputProps) => {
	return (
		<div className={className || 'checkbox-input'}>
			<label htmlFor={id} className='checkbox-input__label'>
				<input
					type='checkbox'
					id={id}
					checked={checked}
					value={value}
					onChange={onChange}
					required={required}
					readOnly={readOnly}
					className='checkbox-input__checkbox'
				/>
				<span className='checkbox-input__custom-checkbox'></span>
				{label}
			</label>
		</div>
	);
};

export default CheckboxInput;
