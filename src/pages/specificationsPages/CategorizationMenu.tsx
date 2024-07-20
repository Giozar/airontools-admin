import ActionCard from '@components/ActionCard';
import HeaderTitle from '@components/HeaderTitle';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import { useLocation } from 'react-router-dom';

function ContentMainPage() {
	const location = useLocation();
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Categorización' />
				<div className='options users'>
					<ActionCard
						title='Crear Familia'
						path={location.pathname + '/crear-familia'}
					/>
					<ActionCard
						title='Editar Familia'
						path={location.pathname + '/editar-familia'}
					/>
				</div>
			</main>
		</BasePage>
	);
}

function CategorizationMenu() {
	return <ContentMainPage />;
}

export default CategorizationMenu;
