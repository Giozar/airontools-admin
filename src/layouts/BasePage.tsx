import HeaderTitle from '@components/commons/HeaderTitle';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import './BasePage.css';
import HeaderApp from './HeaderApp';
import Sidebar from './Sidebar';

type BasePageProps = {
	title: string;
	children: ReactNode;
};

function BasePage({ title, children }: BasePageProps) {
	const location = useLocation();
	localStorage.setItem('location', location.pathname);
	return (
		<div className='mainPage'>
			<Sidebar />
			<div className='content'>
				<HeaderApp />
				<main>
					<HeaderTitle title={title} />
					{children}
				</main>
			</div>
		</div>
	);
}

export default BasePage;
