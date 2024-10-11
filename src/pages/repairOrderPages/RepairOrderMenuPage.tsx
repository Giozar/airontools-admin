import ActionCard from '@components/commons/ActionCard';
import RepairOrderList from '@components/orders/RepairOrderList';

export default function RepairOrderMenuPage() {
	return (
		<>
			<div className='options users'>
				<ActionCard
					title='Crear Orden'
					path={location.pathname + '/crear-orden'}
				/>
				<ActionCard
					title='Editar Orden'
					path={location.pathname + '/editar-orden'}
				/>
			</div>
			<h2 className='listtitle'>Lista de Ordenes</h2>
			<RepairOrderList />
		</>
	);
}
