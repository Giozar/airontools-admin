import ProductMainPage from '@pages/ProductMainPage';
import { categorizationRoutes } from './categorizationRoutes';
import { specificationRoutes } from './specificationRoutes';
import { toolRoutes } from './toolRoutes';

export const productRoutes = () => {
	return [
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
};
export const locura = () => {
	const routes = [];

	// Agregar rutas de especificaciones
	routes.push(...specificationRoutes());

	// Agregar rutas de herramientas
	routes.push(...toolRoutes());

	// Agregar rutas de categorización
	routes.push(...categorizationRoutes());

	return routes;
};

console.log(JSON.stringify(productRoutes()));
