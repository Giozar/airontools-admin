import './css/errorMessage.css';
import CrossIcon from './svg/CrossIcon';

interface ErrorMessageProps {
	message: string;
}

function ErrorMessage(error: ErrorMessageProps) {
	return (
		<div>
			{error.message && (
				<div className='errorMessage'>
					<div className='error-icon'>
						<CrossIcon />
					</div>
					<p>{error.message}</p>
				</div>
			)}
		</div>
	);
}

export default ErrorMessage;
