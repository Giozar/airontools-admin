import '@components/css/dateInput.css';
interface Props {
	label?: string;
	date: Date;
	setDate: (date: Date) => void;
}

 export default function DateInput({ label, date, setDate }: Props) {
	return (
		<div className='form-date'>
			<label className='form-date__label' htmlFor='input-date'>
				{label}
			</label>
			<input
				id='input-date'
				type='datetime-local'
				value={date.toISOString().slice(0, 16)}
				onChange={e => setDate(new Date(e.target.value))}
				className='form-date__input'
			/>
		</div>
	);
};

