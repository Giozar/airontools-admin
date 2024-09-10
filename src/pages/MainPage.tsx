import ActionCard from '@components/commons/ActionCard';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useLocation } from 'react-router-dom';

function ContentMainPage() {
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
						/>
						<ActionCard
							title='Categorización'
							path={location.pathname + '/categorizacion'}
						/>
						<ActionCard
							title='Herramientas'
							path={location.pathname + '/herramientas'}
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
