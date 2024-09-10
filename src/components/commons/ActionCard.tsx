import FlashIcon from '@components/svg/FlashIcon';
import { Link } from 'react-router-dom';

function ActionCard({ title, path }: { title: string; path: string }) {
	return (
		<Link to={path} className='card'>
			<dl>
				<dt>{title}</dt>
			</dl>
			<FlashIcon />
		</Link>
	);
}
export default ActionCard;
