import React from 'react';

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

const CheckboxInput: React.FC<CheckboxInputProps> = ({
	id,
	label,
	checked,
	value,
	onChange,
	required,
	readOnly,
	className,
}) => {
	return (
		<div className={className || 'checkboxInput'}>
			<label htmlFor={id}>
				<input
					type='checkbox'
					id={id}
					checked={checked}
					value={value}
					onChange={onChange}
					required={required}
					readOnly={readOnly}
				/>
				{label}
			</label>
		</div>
	);
};

export default CheckboxInput;
