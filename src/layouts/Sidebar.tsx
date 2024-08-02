/* 
TODO: que tenga un css consistente durante todas las paginas
*/

import ComboBox from '@components/ComboBox';
import BellIcon from '@components/svg/BellIcon';
import { AuthContext } from '@contexts/AuthContext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-absolute-path
import aironLogo from '/Logo-Blanco.png';

function Sidebar() {
	const navigate = useNavigate();
	const authContext = useContext(AuthContext);

	const handleOptionSelected = (selectedOption: string) => {
		console.log('opcion seleccionada:', selectedOption);
	};
	const handleClose = () => {
		authContext?.setAuth({ isAuthenticated: false, user: null });
		localStorage.setItem('token', '');
		localStorage.setItem('location', '');
		navigate('/login');
	};
	return (
		<div className='sidebar'>
			<div className='top'>
				<div className='title'>
					<img src={aironLogo} alt='AironTools Logo' />
					<h1>Administrador AironTools</h1>
				</div>
				<a href='#'>
					<BellIcon />
					Notificaciones
				</a>
				<ComboBox
					option='Herramientas'
					options={['Ver', 'Crear', 'Actualizar', 'Eliminar'].map(
						val => val + ' Herramientas',
					)}
					onOptionSelected={handleOptionSelected}
				/>
				<ComboBox
					option='Empleados'
					options={['Ver', 'Crear', 'Actualizar', 'Eliminar'].map(
						val => val + ' Empleados',
					)}
					onOptionSelected={handleOptionSelected}
				/>
				<ComboBox
					option='Especificaciones'
					options={['Ver', 'Crear', 'Actualizar', 'Eliminar'].map(
						val => val + ' Especificaciones',
					)}
					onOptionSelected={handleOptionSelected}
				/>
				<ComboBox
					option='Roles'
					options={['Ver', 'Crear', 'Actualizar', 'Eliminar'].map(
						val => val + ' Roles',
					)}
					onOptionSelected={handleOptionSelected}
				/>
			</div>
			<div className='bottom'>
				<nav>
					<a href='#'>Información personal</a>
					<a href='#'>Seguridad</a>
					<Link to='/login' onClick={handleClose}>
						Cerrar sesión
					</Link>
				</nav>
			</div>
		</div>
	);
}

export default Sidebar;
