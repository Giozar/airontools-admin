import './css/successMessage.css';
import CheckIcon from './svg/CheckIcon';

interface SuccessMessageProps {
	message: string;
}
function SuccessMessage(success: SuccessMessageProps) {
	return (
		<p className='successMessage'>
			<div className='success-icon'>
				<CheckIcon />
			</div>
			{success.message}
		</p>
	);
}

export default SuccessMessage;
