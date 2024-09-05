import HeaderTitle from '@components/commons/HeaderTitle';
import { Outlet, useLocation } from 'react-router-dom';
import './BasePage.css';
import HeaderApp from './HeaderApp';
import Sidebar from './Sidebar';

function BasePage() {
	const location = useLocation();
	const pathSegments = location.pathname.split('/').filter(Boolean); // Divide la ruta y filtra las partes vacías
	const lastSegment =
		pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : 'Home';

	// Reemplaza guiones con espacios y capitaliza la primera letra de cada palabra
	const formattedTitle = lastSegment
		.replace(/-/g, ' ') // Reemplaza guiones con espacios
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza cada palabra
		.join(' '); // Une las palabras con un espacio

	return (
		<div className='mainPage'>
			<Sidebar />
			<div className='content'>
				<HeaderApp />
				<main>
					<HeaderTitle title={formattedTitle} />
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default BasePage;
