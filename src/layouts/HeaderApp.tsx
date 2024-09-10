import Breadcrumb from '@components/commons/Breadcrumb';
import ThemeToggleButton from '@components/ThemeToggle';
import { useAuthContext } from '@contexts/auth/AuthContext';

function HeaderApp() {
	const { user } = useAuthContext();

	return (
		<header>
			<h2>
				<Breadcrumb />
			</h2>

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
		</header>
	);
}

export default HeaderApp;
