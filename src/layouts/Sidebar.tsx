/* 
TODO: que tenga un css consistente durante todas las paginas
*/

import ComboBox from '@components/commons/ComboBox';
import BellIcon from '@components/svg/BellIcon';
import { AuthContext } from '@contexts/AuthContext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-absolute-path
import BotIcon from '@components/svg/BotIcon';
import aironLogo from '/Logo-Blanco.png';

const routeMap: {
	'Ver herramientas': string;
	'Crear herramientas': string;
	'Ver usuarios': string;
	'Crear usuarios': string;
	'Crear rol de usuarios': string;
	'Ver especificaciones': string;
	'Crear especificaciones': string;
} = {
	'Ver herramientas': '/home/herramientas',
	'Crear herramientas': '/home/herramientas/crear-herramienta',
	'Ver usuarios': '/home/usuarios',
	'Crear usuarios': '/home/usuarios/crear-usuario',
	'Crear rol de usuarios': '/home/usuarios/crear-rol',
	'Ver especificaciones': '/home/categorizacion/especificaciones',
	'Crear especificaciones':
		'/home/categorizacion/especificaciones/crear-especificaciones',
};
const Sidebar = () => {
	const navigate = useNavigate();
	const authContext = useContext(AuthContext);

	const handleOptionSelected = (selectedOption: string) => {
		console.log('Opción seleccionada:', selectedOption);
		const route = routeMap[selectedOption as keyof typeof routeMap];
		// console.log(route);
		if (route) {
			navigate(route);
		}
	};

	const handleClose = () => {
		authContext?.setAuth({ isAuthenticated: false, user: null });
		localStorage.setItem('token', '');
		// localStorage.setItem('location', '');
		navigate('/');
	};
	return (
		<div className='sidebar'>
			<div className='top'>
				<div className='title'>
					<Link to='/home'>
						<img src={aironLogo} alt='AironTools Logo' />
						<h1>Sistema de gestión de AironTools</h1>
					</Link>
				</div>
				<Link to='/notificaciones'>
					<BellIcon />
					Notificaciones
				</Link>
				{authContext?.user &&
					authContext?.user.role?.name === 'Administrador' && (
						<Link to='/chat-con-asistente'>
							<BotIcon />
							Asistente AironTools
						</Link>
					)}
				<ComboBox
					option='Herramientas'
					options={['Ver', 'Crear'].map(val => val + ' herramientas')}
					onOptionSelected={handleOptionSelected}
				/>
				{authContext?.user &&
					authContext?.user.role?.name === 'Administrador' && (
						<ComboBox
							option='Usuarios'
							options={['Ver', 'Crear', 'Crear rol de'].map(
								val => val + ' usuarios',
							)}
							onOptionSelected={handleOptionSelected}
						/>
					)}
				{authContext?.user &&
					authContext?.user.role?.name === 'Administrador' && (
						<ComboBox
							option='Especificaciones'
							options={['Ver', 'Crear'].map(val => val + ' especificaciones')}
							onOptionSelected={handleOptionSelected}
						/>
					)}
				{/* <ComboBox
					option='Roles'
					options={['Ver', 'Crear', 'Actualizar', 'Eliminar'].map(
						val => val + ' roles',
					)}
					onOptionSelected={handleOptionSelected}
				/> */}
			</div>
			<div className='bottom'>
				<nav>
					<Link to='/informacion-personal'>Información personal</Link>
					<Link to='/seguridad'>Seguridad</Link>
					<Link to='/' onClick={handleClose}>
						Cerrar sesión
					</Link>
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;
