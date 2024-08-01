/* Se encuentra el header principal de la página
TODO: hacer componente breadcrumbs para que el titulo se actualice dinamicamente
TODO: hacer que el css sea generico para todas las paginas
TODO: que el darkmode se guarde en un contexto */
import Breadcrumb from '@components/Breadcrumb';
import ThemeToggleButton from '@components/ThemeToggle';
import { AuthContext } from '@contexts/AuthContext';
import { UserRole } from '@interfaces/UserRole';
import { useContext } from 'react';

function HeaderApp() {
	const authContext = useContext(AuthContext);
	const user = authContext?.user;
	const role = user?.role as UserRole;

	return (
		<header>
			<h2>
				<Breadcrumb />
			</h2>

			<div className='userinfo'>
				<div
					className='userpic'
					style={{ backgroundImage: `url(${authContext?.user?.imageUrl})` }}
				></div>
				<p>
					{authContext?.user?.name} <span>({role.name})</span>
				</p>
				<ThemeToggleButton />
			</div>
		</header>
	);
}

export default HeaderApp;
