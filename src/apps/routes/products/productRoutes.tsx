import ProductMainPage from '@pages/ProductMainPage';
import { categorizationRoutes } from './categorizationRoutes';
import { specificationRoutes } from './specificationRoutes';
import { toolRoutes } from './toolRoutes';

export const productRoutes = () => [
	{
		path: 'productos',
		element: <ProductMainPage />,
	},
	{
		path: 'productos',
		children: [
			...specificationRoutes(),
			...toolRoutes(),
			...categorizationRoutes(),
		],
	},
];
