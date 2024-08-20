/* Se encuentra el header principal de la página
TODO: hacer componente breadcrumbs para que el titulo se actualice dinamicamente
TODO: hacer que el css sea generico para todas las paginas
TODO: que el darkmode se guarde en un contexto */
import Breadcrumb from '@components/commons/Breadcrumb';
import ThemeToggleButton from '@components/ThemeToggle';
import { AuthContext } from '@contexts/AuthContext';
import { useContext } from 'react';

function HeaderApp() {
	const authContext = useContext(AuthContext);

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
					{authContext?.user?.name} <span>({authContext?.role?.name})</span>
				</p>
				<ThemeToggleButton />
			</div>
		</header>
	);
}

export default HeaderApp;
