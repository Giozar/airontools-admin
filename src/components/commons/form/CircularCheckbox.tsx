import '@components/css/CircularCheckbox.css';
interface CircularCheckboxProps {
	label?: string;
	id: string;
	checked: boolean;
	onChange: (value: any) => void;
}
export default function CircularCheckbox({
	label,
	id,
	checked,
	onChange,
}: CircularCheckboxProps) {
	return (
		<div className='checkbox-wrapper-15'>
			<input
				className='inp-cbx'
				id={id}
				type='checkbox'
				style={{ display: 'none' }}
				checked={checked}
				onChange={onChange}
			/>
			<label className='cbx' htmlFor='cbx-15'>
				<span>
					<svg width='12px' height='9px' viewBox='0 0 12 9'>
						<polyline points='1 5 4 8 11 1'></polyline>
					</svg>
				</span>
				<span>{label}</span>
			</label>
		</div>
	);
}
