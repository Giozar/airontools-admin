/* 
TODO: que tenga un css consistente durante todas las paginas
*/

import ComboBox from '@components/commons/ComboBox';
import BellIcon from '@components/svg/BellIcon';
import { Link, useNavigate } from 'react-router-dom';

import BotIcon from '@components/svg/BotIcon';
import { useAuthContext } from '@contexts/auth/AuthContext';
import logoAiron from '@pages/generalPages/logos/Logo-AIRON-TOOLS-perfil.png';
import './Sidebar.css';

const routeMap: {
	'Ver herramientas': string;
	'Crear herramientas': string;
	'Ver usuarios': string;
	'Crear usuarios': string;
	'Crear rol de usuarios': string;
	'Ver categorizaciones': string;
	'Crear categorizaciones': string;
	'Ver especificaciones': string;
	'Crear especificaciones': string;
	'Crear orden': string;
	'Ver orden': string;
} = {
	'Ver herramientas': '/home/productos/herramientas',
	'Crear herramientas': '/home/productos/herramientas/crear-herramienta',
	'Ver usuarios': '/home/usuarios',
	'Crear usuarios': '/home/usuarios/crear-usuario',
	'Crear rol de usuarios': '/home/usuarios/crear-rol',
	'Ver categorizaciones': '/home/productos/categorizacion',
	'Crear categorizaciones': '/home/productos/categorizacion/crear-familia',
	'Ver especificaciones': '/home/productos/categorizacion/especificaciones',
	'Crear especificaciones':
		'/home/productos/categorizacion/especificaciones/crear-especificaciones',
	'Crear orden': '/home/servicios/crear-orden',
	'Ver orden': '/home/servicios/ver-orden',
};
export default function Sidebar() {
	const { user, setUser, setAuth } = useAuthContext();
	const navigate = useNavigate();
	const handleOptionSelected = (selectedOption: string) => {
		console.log('Opción seleccionada:', selectedOption);
		const route = routeMap[selectedOption as keyof typeof routeMap];
		// console.log(route);
		if (route) {
			navigate(route);
		}
	};

	const handleClose = () => {
		setAuth(false);
		setUser(null);
		localStorage.removeItem('token');
		navigate('login/airontools');
	};

	return (
		<div className='sidebar'>
			<div className='sidebar__content'>
				<div className='sidebar__top'>
					<div className='sidebar__title'>
						<Link to='/home'>
							<img src={logoAiron} alt='AironTools Logo' />
						</Link>
						<h1>Sistema de gestión de AironTools</h1>
					</div>
					<Link to='/notificaciones' className='sidebar__link'>
						<BellIcon />
						Notificaciones
					</Link>
					{user && user.role?.name === 'Administrador' && (
						<Link to='/chat-con-asistente' className='sidebar__link'>
							<BotIcon />
							Asistente AironTools
						</Link>
					)}
					<ComboBox
						option='Orden'
						options={['Ver', 'Crear'].map(val => val + ' orden')}
						linkto={['/home/ver-orden', '/home/crear-orden']}
						onOptionSelected={handleOptionSelected}
					/>
					<ComboBox
						option='Herramientas'
						options={['Ver', 'Crear'].map(val => val + ' herramientas')}
						linkto={[
							'/home/herramientas',
							'/home/herramientas/crear-herramienta',
						]}
						onOptionSelected={handleOptionSelected}
					/>
					{user && user.role?.name === 'Administrador' && (
						<ComboBox
							option='Usuarios'
							options={['Ver', 'Crear', 'Crear rol de'].map(
								val => val + ' usuarios',
							)}
							linkto={['/home/usuarios', '/home/usuarios/crear-usuario']}
							onOptionSelected={handleOptionSelected}
						/>
					)}
					{user && user.role?.name === 'Administrador' && (
						<ComboBox
							option='Categorizaciones'
							options={['Ver', 'Crear'].map(val => val + ' categorizaciones')}
							linkto={[
								'/home/categorizacion',
								'/home/categorizacion/crear-familia',
							]}
							onOptionSelected={handleOptionSelected}
						/>
					)}
					{user && user.role?.name === 'Administrador' && (
						<ComboBox
							option='Especificaciones'
							options={['Ver', 'Crear'].map(val => val + ' especificaciones')}
							linkto={[
								'/home/categorizacion/especificaciones',
								'/home/categorizacion/especificaciones/crear-especificaciones',
							]}
							onOptionSelected={handleOptionSelected}
						/>
					)}
				</div>
				<div className='sidebar__bottom'>
					<nav className='sidebar__nav'>
						<Link to='/informacion-personal' className='sidebar__nav-link'>
							Información personal
						</Link>
						<Link to='/seguridad' className='sidebar__nav-link'>
							Seguridad
						</Link>
						<Link to='/' onClick={handleClose} className='sidebar__nav-link'>
							Cerrar sesión
						</Link>
					</nav>
				</div>
			</div>
		</div>
	);
}
