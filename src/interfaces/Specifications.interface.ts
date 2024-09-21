import { Categorization } from '@components/specifications/types';
import { CategoryDataToSend } from './Category.interface';
import { FamilyDataToSend } from './Family.interface';
import { SubcategoryDataToSend } from './subcategory.interface';
import { UserDataBackend, UserDataFrontend } from './User.interface';

export interface SpecificationContextProps {
	id?: string;
	name: string;
	description?: string;
	unit?: string;
	families: string[];
	categories: string[];
	subcategories: string[];
	createdBy: string;
	categorizations: Categorization[];

	// Setters
	setId?: (value: string) => void;
	setName: (value: string) => void;
	setDescription?: (value: string) => void;
	setUnit?: (value: string) => void;
	setFamilies: (value: string[]) => void;
	setCategories: (value: string[]) => void;
	setSubcategories: (value: string[]) => void;
	setCreatedBy: (value: string) => void;
	setCategorizations: (value: Categorization[]) => void;
}

// Datos para enviar al backend - PATCH, POST, PUT
export interface SpecDataToSend {
	_id?: string;
	name: string;
	description?: string;
	unit?: string;
	families: string[];
	categories: string[];
	subcategories: string[];
	createdBy: string;
}
// Datos que vienen del backend - GET
export interface SpecDataBackend {
	_id: string;
	name: string;
	description?: string;
	unit?: string;
	families: FamilyDataToSend[];
	categories: CategoryDataToSend[];
	subcategories: SubcategoryDataToSend[];
	createdBy: UserDataBackend;
}
// Datos que se usan en el frontend - Visualización (solo frontend)
export interface SpecDataFrontend {
	id: string;
	name: string;
	description?: string;
	unit?: string;
	families: FamilyDataToSend[];
	categories: CategoryDataToSend[];
	subcategories: SubcategoryDataToSend[];
	createdBy: UserDataFrontend;
}

export interface ProductSpecification {
	specification: string;
	value: string;
}
