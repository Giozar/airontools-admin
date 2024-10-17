import { ProductCreateProvider } from '@contexts/product/ProductContext';
import CreateProductPage from '@pages/productPages/CreateProductPage';
import EditProductPage from '@pages/productPages/EditProductPage';
import ToolMenu from '@pages/productPages/ProductMenu';

export const toolRoutes = () => [
	{
		path: 'herramientas',
		element: <ToolMenu />,
	},

	{
		path: 'herramientas',

		children: createEditToolRoutes(),
	},
];

export const createEditToolRoutes = () => [
	{
		path: 'crear-herramienta',
		element: (
			<ProductCreateProvider>
				<CreateProductPage />
			</ProductCreateProvider>
		),
	},
	{
		path: 'editar-herramienta',
		element: (
			<ProductCreateProvider>
				<EditProductPage />
			</ProductCreateProvider>
		),
	},
];
