import ActionCard from '@components/commons/ActionCard';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useLocation } from 'react-router-dom';

export default function ProductMainPage() {
	const { user } = useAuthContext();
	const location = useLocation();
	return (
		<>
			<div className='options'>
				{user?.role?.name === 'Administrador' ? (
					<>
						<ActionCard
							title='Categorización'
							path={location.pathname + '/categorizacion'}
							description='Lista de familias (con categorias, subcategorias), crear familia (con categorias, subcategorias), especificaciones, crear especificaciones'
						/>
						<ActionCard
							title='Especificaciones'
							path={location.pathname + '/especificaciones'}
							description='Lista de especificaciones, crear especificación'
						/>
						<ActionCard
							title='Herramientas'
							path={location.pathname + '/herramientas'}
							description='Lista de herramientas, crear herramientas'
						/>
					</>
				) : (
					<>
						<ActionCard
							title='Herramientas'
							path={location.pathname + '/herramientas'}
						/>
					</>
				)}
			</div>
		</>
	);
}
