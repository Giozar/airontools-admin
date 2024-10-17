import ServiceMainPage from '@pages/ServiceMainPage';
import { orderRoutes } from './orderRoutes';

export const serviceRoutes = () => [
	{
		path: 'servicios',
		element: <ServiceMainPage />,
	},
	{
		path: 'servicios',
		children: orderRoutes(),
	},
];
