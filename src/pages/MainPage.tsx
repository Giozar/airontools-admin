import ActionCard from '@components/commons/ActionCard';
import { AuthContext } from '@contexts/AuthContext';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
	const authContext = useContext(AuthContext);
	const location = useLocation();
	return (
		<>
			<div className='options'>
				{authContext?.role?.name === 'Administrador' ? (
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
