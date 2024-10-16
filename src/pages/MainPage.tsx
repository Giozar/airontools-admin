import ActionCard from '@components/commons/ActionCard';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useLocation } from 'react-router-dom';

export default function ContentMainPage() {
	const { user } = useAuthContext();
	const location = useLocation();
	return (
		<>
			<div className='options'>
				{user?.role?.name === 'Administrador' ? (
					<>
						<ActionCard
							title='Usuarios'
							path={location.pathname + '/usuarios'}
							description='Lista de usuarios, crear usuarios, crear rol'
						/>
						<ActionCard
							title='Productos'
							path={location.pathname + '/productos'}
							description='Menú Categorización, Especificaciones y Herramientas'
						/>
						<ActionCard
							title='Servicios'
							path={location.pathname + '/servicios'}
							description='Menú de ordenes de reparación'
						/>
						<ActionCard title='Monitor' path={location.pathname + '/monitor'} />
					</>
				) : (
					<>
						<ActionCard
							title='Herramientas'
							path={location.pathname + '/herramientas'}
						/>
						<ActionCard
							title='El editor puede ver esto'
							path={location.pathname}
						/>
					</>
				)}
			</div>
		</>
	);
}
