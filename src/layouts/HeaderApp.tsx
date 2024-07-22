/* Se encuentra el header principal de la página
TODO: hacer componente breadcrumbs para que el titulo se actualice dinamicamente
TODO: hacer que el css sea generico para todas las paginas
TODO: que el darkmode se guarde en un contexto */
import { AuthContext } from '@apps/App';
import Breadcrumb from '@components/Breadcrumb';
import MoonIcon from '@components/svg/MoonIcon';
import SunIcon from '@components/svg/SunIcon';
import { useContext, useState } from 'react';

function HeaderApp() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const authContext = useContext(AuthContext);

	function toggleDarkMode() {
		setIsDarkMode(!isDarkMode);
		document.documentElement.classList.toggle('dark');
	}
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
					{authContext?.user?.name} <span>({authContext?.user?.roles})</span>
				</p>
				<button onClick={toggleDarkMode}>
					{isDarkMode ? <SunIcon /> : <MoonIcon />}
				</button>
			</div>
		</header>
	);
}

export default HeaderApp;
