import Breadcrumb from '@components/commons/Breadcrumb';
import CircleLeftIcon from '@components/svg/CircleLeftIcon';
import MenuIcon from '@components/svg/MenuIcon';
import ThemeToggleButton from '@components/ThemeToggle';
import { useAuthContext } from '@contexts/auth/AuthContext';

interface HeaderAppProps {
	toggleSidebar: () => void;
	isSidebarVisible: boolean;
}

function HeaderApp({ toggleSidebar, isSidebarVisible }: HeaderAppProps) {
	const { user } = useAuthContext();

	return (
		<header>
			<div className='header__group'>
				<button
					onClick={toggleSidebar}
					className='header__button-toggle-sidebar'
				>
					{isSidebarVisible ? <CircleLeftIcon /> : <MenuIcon />}
				</button>
				<div className='userinfo'>
					<div
						className='userpic'
						style={{ backgroundImage: `url(${user?.imageUrl})` }}
					></div>
					<p>
						{user?.name} <span>({user?.role?.name})</span>
					</p>
					<ThemeToggleButton />
				</div>
			</div>
			<div className='header__group'>
				<Breadcrumb />
			</div>
		</header>
	);
}

export default HeaderApp;
