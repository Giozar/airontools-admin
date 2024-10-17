import { SpecificationProvider } from '@contexts/specification/SpecificationContext';
import CreateSpecification from '@pages/specificationsPages/CreateSpecification';
import EditSpecification from '@pages/specificationsPages/EditSpecification';
import ListOfSpecs from '@pages/specificationsPages/ListOfSpecs';

export const specificationRoutes = () => [
	{
		path: 'especificaciones',
		element: <ListOfSpecs />,
	},
	{
		path: 'especificaciones',
		children: createEditSpecificationRoutes(),
	},
];

export const createEditSpecificationRoutes = () => [
	{
		path: 'crear-especificaciones',
		element: (
			<SpecificationProvider>
				<CreateSpecification />
			</SpecificationProvider>
		),
	},
	{
		path: 'editar-especificacion',
		element: (
			<SpecificationProvider>
				<EditSpecification />
			</SpecificationProvider>
		),
	},
];
