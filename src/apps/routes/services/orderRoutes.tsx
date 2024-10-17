import { CompanyProvider } from '@contexts/company/CompanyContext';
import { CustomerProvider } from '@contexts/customer/CustomerContext';
import { OrderProvider } from '@contexts/order/OrderContext';
import { OtherProductProvider } from '@contexts/otherProduct/OtherProductContext';
import { RepairProductProvider } from '@contexts/repairProduct/RepairProductContext';
import EditOrderRedirect from '@pages/Redirects/EditOrderRedirect';
import CreateRepairOrderPage from '@pages/repairOrderPages/CreateRepairOrderPage';
import EditRepairOrderPage from '@pages/repairOrderPages/EditRepairOrderPage';
import RepairOrderMenuPage from '@pages/repairOrderPages/RepairOrderMenuPage';

export const createEditOrderRoutes = () => [
	{
		path: 'crear-orden',
		element: (
			<OrderProvider>
				<CompanyProvider>
					<OtherProductProvider>
						<RepairProductProvider>
							<CustomerProvider>
								<CreateRepairOrderPage />
							</CustomerProvider>
						</RepairProductProvider>
					</OtherProductProvider>
				</CompanyProvider>
			</OrderProvider>
		),
	},
	{
		path: 'editar-orden',
		element: <EditOrderRedirect />,
	},
	{
		path: 'editar-orden',
		children: [
			{
				path: ':orderId',
				element: (
					<OrderProvider>
						<CompanyProvider>
							<OtherProductProvider>
								<RepairProductProvider>
									<CustomerProvider>
										<EditRepairOrderPage />
									</CustomerProvider>
								</RepairProductProvider>
							</OtherProductProvider>
						</CompanyProvider>
					</OrderProvider>
				),
			},
		],
	},
];

export const orderRoutes = () => [
	{
		path: 'ver-orden',
		element: (
			<OrderProvider>
				<RepairOrderMenuPage />
			</OrderProvider>
		),
	},
	{
		path: 'crear-orden',
		element: (
			<OrderProvider>
				<CompanyProvider>
					<OtherProductProvider>
						<RepairProductProvider>
							<CustomerProvider>
								<CreateRepairOrderPage />
							</CustomerProvider>
						</RepairProductProvider>
					</OtherProductProvider>
				</CompanyProvider>
			</OrderProvider>
		),
	},
	{
		path: 'ver-orden',
		children: createEditOrderRoutes(),
	},
];
