import { SpecDataToSend } from './Specifications.interface';

export interface SpecificationFormEditProps {
	specToEdit?: SpecDataToSend;
	familiesId: string[];
	categoriesId: string[];
	subcategoriesId: string[];
}
