import FlashIcon from '@components/svg/FlashIcon';
import { useNavigate } from 'react-router-dom';

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
