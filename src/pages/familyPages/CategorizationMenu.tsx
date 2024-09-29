import ActionCard from '@components/commons/ActionCard';
import FamilyList from '@components/families/FamilyList';

import '@pages/css/familyList.css';
import { useLocation } from 'react-router-dom';

export default function CategorizationMenu() {
	const location = useLocation();
	return (
		<>
			<div className='options users'>
				<ActionCard
					title='Crear Familia'
					path={location.pathname + '/crear-familia'}
				/>
				<ActionCard
					title='Especificaciones'
					path={location.pathname + '/especificaciones'}
				/>
			</div>
			<FamilyList />
		</>
	);
}
