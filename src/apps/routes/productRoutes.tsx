import { categorizationRoutes } from './categorizationRoutes';
import { specificationRoutes } from './specificationRoutes';
import { toolRoutes } from './toolRoutes';

export const productRoutes = () => {
	return [...specificationRoutes(), ...toolRoutes(), ...categorizationRoutes()];
};
