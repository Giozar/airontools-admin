import { CategoryDataToSend } from './Category.interface';
import { FamilyDataToSend } from './Family.interface';
import { SubcategoryDataToSend } from './subcategory.interface';
import { UserDataBackend, UserDataFrontend } from './User.interface';

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
	updatedBy?: string;
}

export interface Categorization {
	selectedFamily: string;
	selectedCategories: string[];
	selectedSubcategories: string[];
}

export interface SpecificationContextProps {
	specifications: SpecDataToSend[];
	categorizations: Categorization[];
	createdBy: string;
	updatedBy: string;

	setSpecifications: (value: SpecDataToSend[]) => void;
	setCategorizations: (value: Categorization[]) => void;
	setCreatedBy: (value: string) => void;
	setUpdatedBy: (value: string) => void;
	updateFamily: (index: number, newFamilyId: string) => void;
	updateCategories: (index: number, newFamilyId: string[]) => void;
	updateSubcategories: (index: number, newFamilyId: string[]) => void;
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
	updatedBy?: UserDataBackend;
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
	updatedBy?: UserDataFrontend;
}

export interface ProductSpecification {
	specification: string;
	value: string;
}
