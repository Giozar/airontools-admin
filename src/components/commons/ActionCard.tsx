import '@components/css/ActionsCard.css';
import FlashIcon from '@components/svg/FlashIcon';
import { Link } from 'react-router-dom';
interface ActionCardProps {
	title: string;
	path: string;
	description?: string;
}

function ActionCard({ title, path, description }: ActionCardProps) {
	return (
		<Link to={path} className='options__card'>
			<div className='options__card-content'>
				<p className='options__card-text'>{title}</p>
				{description && (
					<p className='options__card-description'>{description}</p>
				)}
			</div>
			<FlashIcon className='options__card-icon' />
		</Link>
	);
}
export default ActionCard;
