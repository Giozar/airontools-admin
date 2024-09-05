import { SpecDataToSend } from './Specifications.interface';

export interface SpecificationFormProps {
	familiesId: string[];
	categoriesId: string[];
	subcategoriesId: string[];
}

export interface SpecificationFormEditProps {
	specToEdit?: SpecDataToSend;
	familiesId: string[];
	categoriesId: string[];
	subcategoriesId: string[];
}
