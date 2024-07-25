import './css/errorMessage.css';
import CrossIcon from './svg/CrossIcon';

interface ErrorMessageProps {
	message: string;
}

function ErrorMessage(error: ErrorMessageProps) {
	return (
		<p className='errorMessage'>
			<div className='error-icon'>
				<CrossIcon />
			</div>
			{error.message}
		</p>
	);
}

export default ErrorMessage;
