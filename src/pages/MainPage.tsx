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
				<HeaderTitle title='Acciones' />
				<div className='options'>
					<ActionCard title='Usuarios' path={location.pathname + '/usuarios'} />
					<ActionCard
						title='Categorización'
						path={location.pathname + '/categorizacion'}
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
