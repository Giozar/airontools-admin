// Alert.tsx
import '@components/css/AlertComponent.css';
import CheckIcon from '@components/svg/CheckIcon';
import CrossIcon from '@components/svg/CrossIcon';
import WarningIcon from '@components/svg/WarningIcon';

type AlertType = 'success' | 'warning' | 'error';

interface AlertProps {
	message: string;
	type: AlertType;
	onClose: () => void;
}

const Alert = ({ message, type, onClose }: AlertProps) => {
	let icon;

	switch (type) {
		case 'success':
			icon = <CheckIcon />;
			break;
		case 'warning':
			icon = <WarningIcon />;
			break;
		case 'error':
			icon = <CrossIcon />;
			break;
		default:
			icon = null;
	}

	return (
		<div className='alert-container'>
			<div className={`alert alert--${type}`}>
				<div className='alert__icon'>{icon}</div>
				<p className='alert__message'>{message}</p>
				<button className='alert__close-button' onClick={onClose}>
					Cerrar
				</button>
			</div>
		</div>
	);
};

export default Alert;
