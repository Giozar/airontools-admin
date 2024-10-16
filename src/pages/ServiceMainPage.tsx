import ActionCard from '@components/commons/ActionCard';
import { useLocation } from 'react-router-dom';

export default function ServiceMainPage() {
	const location = useLocation();
	return (
		<>
			<div className='options'>
				<ActionCard
					title='Orden de reparación'
					path={location.pathname + '/ver-orden'}
					description='Lista de ordenes de reparación, crear ordenes'
				/>
			</div>
		</>
	);
}
