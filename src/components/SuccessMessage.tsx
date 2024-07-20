import './css/successMessage.css';

interface SuccessMessageProps {
	message: string;
}
function SuccessMessage(success: SuccessMessageProps) {
	return <p className='successMessage'>{success.message}</p>;
}

export default SuccessMessage;
