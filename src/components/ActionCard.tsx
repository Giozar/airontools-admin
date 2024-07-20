import { useNavigate } from 'react-router-dom';
import FlashIcon from './svg/FlashIcon';

function ActionCard({ title, path }: { title: string; path: string }) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(path);
	};
	return (
		<button className='card' onClick={handleClick}>
			<dl>
				<dt>{title}</dt>
			</dl>
			<FlashIcon />
		</button>
	);
}
export default ActionCard;
