import HeaderTitle from '@components/commons/HeaderTitle';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './BasePage.css';
import HeaderApp from './HeaderApp';
import Sidebar from './Sidebar';

function BasePage() {
	const location = useLocation();
	const pathSegments = location.pathname.split('/').filter(Boolean);
	const lastSegment =
		pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : 'Home';

	const formattedTitle = lastSegment
		.replace(/-/g, ' ')
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	// Estado para controlar la visibilidad del sidebar
	const [isSidebarVisible, setIsSidebarVisible] = useState(() => {
		// Recuperar el estado del localStorage o usar true como valor por defecto
		const savedState = localStorage.getItem('isSidebarVisible');
		return savedState !== null ? JSON.parse(savedState) : true;
	});

	const toggleSidebar = () => {
		setIsSidebarVisible((prev: any) => {
			const newState = !prev;
			// Guardar el nuevo estado en localStorage
			localStorage.setItem('isSidebarVisible', JSON.stringify(newState));
			return newState;
		});
	};

	useEffect(() => {
		// Actualizar el localStorage cada vez que isSidebarVisible cambie
		localStorage.setItem('isSidebarVisible', JSON.stringify(isSidebarVisible));
	}, [isSidebarVisible]);

	return (
		<div className='mainPage'>
			{isSidebarVisible && <Sidebar />}
			<div className='content'>
				<HeaderApp
					toggleSidebar={toggleSidebar}
					isSidebarVisible={isSidebarVisible}
				/>

				<main>
					<HeaderTitle title={formattedTitle} />
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default BasePage;
