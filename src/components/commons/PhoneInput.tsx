import '@components/css/datalistOption.css';
import React from 'react';

interface PhoneInputProps {
	id: string;
	name: string;
	type?: string;
	placeholder?: string;
	options: string[];
	value?: string;
	setValue: (value: string) => void;
	required: boolean;
}

export default function PhoneInput({
	id,
	name,
	type = 'text',
	placeholder,
	options,
	value,
	setValue,
	required,
}: PhoneInputProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		if (target) {
			const phoneNumber = target.value.replace(/\D/g, '').slice(0, 10);
			let formattedPhoneNumber = '';
			for (let i = 0; i < phoneNumber.length; i++) {
				if (i === 3 || i === 6) {
					formattedPhoneNumber += '-';
				}
				formattedPhoneNumber += phoneNumber[i];
			}
			target.value = formattedPhoneNumber;
		}
		setValue(target.value);
	};

	return (
		<div className='datalist-input'>
			<label htmlFor={id} className='datalist-input__label'>
				{name}
			</label>
			<input
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={handleChange}
				list={`${id}-list`}
				placeholder={placeholder}
				className='datalist-input__input'
				required={required}
			/>
			<datalist id={`${id}-list`} className='datalist-input__datalist'>
				{options.map(option => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</datalist>
		</div>
	);
}
