import '@components/css/successMessage.css';
import CheckIcon from '@components/svg/CheckIcon';

interface SuccessMessageProps {
	message: string;
}
function SuccessMessage(success: SuccessMessageProps) {
	return (
		<div>
			{success.message && (
				<div className='successMessage'>
					<div className='success-icon'>
						<CheckIcon />
					</div>
					<p>{success.message}</p>
				</div>
			)}
		</div>
	);
}

export default SuccessMessage;
