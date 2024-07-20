import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import './BasePage.css';
import Sidebar from './Sidebar';

type BasePageProps = {
	children: ReactNode;
};

function BasePage({ children }: BasePageProps) {
	const location = useLocation();
	localStorage.setItem('location', location.pathname);
	return (
		<div className='mainPage'>
			<Sidebar />
			<div className='content'>{children}</div>
		</div>
	);
}

export default BasePage;
