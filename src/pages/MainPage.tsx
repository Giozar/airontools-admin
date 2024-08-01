import ActionCard from '@components/ActionCard';
import HeaderTitle from '@components/HeaderTitle';
import { AuthContext } from '@contexts/AuthContext';
import { UserRole } from '@interfaces/UserRole';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

function ContentMainPage() {
	const authContext = useContext(AuthContext);
	const user = authContext?.user;
	console.log(user);
	const role = user?.role as UserRole;
	const location = useLocation();
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Acciones' />
				<div className='options'>
					{role.name === 'Administrador' ? (
						<>
							<ActionCard
								title='Usuarios'
								path={location.pathname + '/usuarios'}
							/>
							<ActionCard
								title='Categorización'
								path={location.pathname + '/categorizacion'}
							/>
							<ActionCard
								title='Herramientas'
								path={location.pathname + '/herramientas'}
							/>
						</>
					) : (
						<ActionCard
							title='El editor puede ver esto'
							path={location.pathname}
						/>
					)}
				</div>
			</main>
		</BasePage>
	);
}

function Home() {
	return <ContentMainPage />;
}
export default Home;
