import '@components/css/LimitInput.css';
import { ChangeEvent } from 'react';
interface LimitInputProps {
	limit: number;
	setLimit: (value: number) => void;
}

export default function LimitInput({ limit, setLimit }: LimitInputProps) {
	return (
		<div className={'limit-input'}>
			<label htmlFor='limit' className='limit-label'>
				Mostrar hasta:
			</label>
			<input
				type='number'
				id='limit'
				name='limit'
				min={1}
				value={limit}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setLimit(parseInt(e.target.value))
				}
				className={'limit-input__input'}
			/>
		</div>
	);
}
