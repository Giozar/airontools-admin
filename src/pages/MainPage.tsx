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
							title='Orden de reparación'
							path={location.pathname + '/orden'}
							description='Lista de ordenes de reparación, crear ordenes'
						/>
						<ActionCard
							title='Categorización'
							path={location.pathname + '/categorizacion'}
							description='Lista de familias (con categorias, subcategorias), crear familia (con categorias, subcategorias), especificaciones, crear especificaciones'
						/>
						<ActionCard
							title='Herramientas'
							path={location.pathname + '/herramientas'}
							description='Lista de herramientas, crear herramientas'
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
