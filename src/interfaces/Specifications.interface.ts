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
	family: string;
	category: string;
	subcategory: string;
	createdBy: string;
}
// Datos que vienen del backend - GET
export interface SpecDataBackend {
	_id: string;
	name: string;
	description?: string;
	unit?: string;
	family: FamilyDataToSend;
	category: CategoryDataToSend;
	subcategory: SubcategoryDataToSend;
	createdBy: UserDataBackend;
}
// Datos que se usan en el frontend - Visualización (solo frontend)
export interface SpecDataFrontend {
	id: string;
	name: string;
	description?: string;
	unit?: string;
	family: FamilyDataToSend;
	category: CategoryDataToSend;
	subcategory: SubcategoryDataToSend;
	createdBy: UserDataFrontend;
}

export interface ProductSpecification {
	specification: string;
	value: string;
}
