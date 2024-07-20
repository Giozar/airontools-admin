import './css/errorMessage.css';

interface ErrorMessageProps {
	message: string;
}

function ErrorMessage(error: ErrorMessageProps) {
	return <p className='errorMessage'>{error.message}</p>;
}

export default ErrorMessage;
