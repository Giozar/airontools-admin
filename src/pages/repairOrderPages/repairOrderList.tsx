import TableComponent from '@components/commons/DynamicTable';
import EditIcon from '@components/svg/EditIcon';
import EyeIcon from '@components/svg/EyeIcon';
import TrashIcon from '@components/svg/TrashIcon';
import RepairOrderForm from './RepairOrderForm';
const orders = [
	{
		id: 'AT4000',
		customer: '605c72f8b3a1d53d88e61c8b',
		orderType: 'repair',
		orderDate: '2024-10-01T10:00:00Z',
		products: [
			{
				productId: '60d21b4667d0d8992e610c85',
				description: 'Pantalla rota',
				quantity: 1,
				price: 150.0,
			},
		],
		observations: 'El cliente menciona que la pantalla dejó de funcionar.',
		images: ['https://example.com/images/screen_broken1.jpg'],
		receivedBy: '605c72f8b3a1d53d88e61c8c',
		responsible: '605c72f8b3a1d53d88e61c8d',
		createdBy: '605c72f8b3a1d53d88e61c8e',
		updatedBy: '605c72f8b3a1d53d88e61c8f',
		createdAt: '2024-10-01T10:00:00Z',
		updatedAt: '2024-10-01T10:00:00Z',
	},
	{
		id: 'AT4001',
		customer: '605c72f8b3a1d53d88e61c8b',
		orderType: 'repair',
		orderDate: '2024-10-02T11:30:00Z',
		products: [
			{
				productId: '60d21b4667d0d8992e610c86',
				description: 'Batería defectuosa',
				quantity: 1,
				price: 50.0,
			},
		],
		observations: 'La batería se descarga rápidamente.',
		images: ['https://example.com/images/battery_defective1.jpg'],
		receivedBy: '605c72f8b3a1d53d88e61c8c',
		responsible: '605c72f8b3a1d53d88e61c8d',
		createdBy: '605c72f8b3a1d53d88e61c8e',
		updatedBy: '605c72f8b3a1d53d88e61c8f',
		createdAt: '2024-10-02T11:30:00Z',
		updatedAt: '2024-10-02T11:30:00Z',
	},
	{
		id: 'AT4002',
		customer: '605c72f8b3a1d53d88e61c8c',
		orderType: 'repair',
		orderDate: '2024-10-03T09:15:00Z',
		products: [
			{
				productId: '60d21b4667d0d8992e610c87',
				description: 'Cámara no funciona',
				quantity: 1,
				price: 100.0,
			},
		],
		observations: 'El cliente indica que la cámara no toma fotos.',
		images: ['https://example.com/images/camera_not_working.jpg'],
		receivedBy: '605c72f8b3a1d53d88e61c8c',
		responsible: '605c72f8b3a1d53d88e61c8d',
		createdBy: '605c72f8b3a1d53d88e61c8e',
		updatedBy: '605c72f8b3a1d53d88e61c8f',
		createdAt: '2024-10-03T09:15:00Z',
		updatedAt: '2024-10-03T09:15:00Z',
	},
];

export default function RepairOrderList() {
	const tableData = {
		headers: [
			'ID',
			'Fecha',
			'Tipo',
			'Cliente',
			'Recibido por',
			'Ver',
			'Editar',
			'Borrar',
		],
		rows: orders.map(order => [
			order.id,
			order.orderDate,
			order.orderType,
			order.customer,
			order.receivedBy,
			<button className='table__button table__button--view' key='view'>
				<EyeIcon />
			</button>,
			<button className='table__button table__button--edit' key='edit'>
				<EditIcon />
			</button>,
			//user && (
			<button
				//	disabled={user.role?.name !== 'Administrador'}
				//	className={`table__button table__button--delete ${user?.role?.name !== 'Administrador' ? 'table__button--disabled' : ''}`}
				//	onClick={() => {
				//	if (user?.role?.name === 'Administrador') {
				//		handleOpenModal(tool);
				//	}
				//}}
				key='delete'
			>
				<TrashIcon />
			</button>,
			//),
		]),
	};
	return (
		<>
			<RepairOrderForm />
			<TableComponent data={tableData} />
		</>
	);
}
