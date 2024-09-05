import HeaderTitle from '@components/commons/HeaderTitle';
import { ReactNode } from 'react';
import './BasePage.css';
import HeaderApp from './HeaderApp';
import Sidebar from './Sidebar';

type BasePageProps = {
	title: string;
	children: ReactNode;
};

function BasePage({ title, children }: BasePageProps) {
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
