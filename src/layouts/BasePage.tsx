import HeaderTitle from '@components/commons/HeaderTitle';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './BasePage.css';
import HeaderApp from './HeaderApp';
import Sidebar from './Sidebar';

function BasePage() {
	const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Estado para controlar la visibilidad del sidebar
	const location = useLocation();
	const pathSegments = location.pathname.split('/').filter(Boolean);
	const lastSegment =
		pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : 'Home';

	const formattedTitle = lastSegment
		.replace(/-/g, ' ')
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	const toggleSidebar = () => {
		setIsSidebarVisible(prev => !prev); // Alterna la visibilidad del sidebar
	};

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
