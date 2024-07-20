import { useLocation } from 'react-router-dom';
import ActionCard from '../components/ActionCard';
import HeaderTitle from '../components/HeaderTitle';
import BasePage from '../layouts/BasePage';
import HeaderApp from '../layouts/HeaderApp';

function ContentMainPage() {
	const location = useLocation();
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Acciones' />
				<div className='options'>
					<ActionCard title='Usuarios' path={location.pathname + '/usuarios'} />
					<ActionCard
						title='Especificaciones'
						path={location.pathname + '/especificaciones'}
					/>
				</div>
			</main>
		</BasePage>
	);
}

function Home() {
	return <ContentMainPage />;
}
export default Home;
