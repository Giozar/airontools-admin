import { CategoryDataToSend } from './Category.interface';
import { FamilyDataBackend, FamilyDataFrontend } from './Family.interface';
import { UserDataBackend, UserDataFrontend } from './User.interface';

// Datos para enviar al backend - PATCH, POST, PUT
export interface SubcategoryDataToSend {
	_id?: string;
	name: string;
	description?: string;
	images?: string[];
	family: string;
	category: string;
	createdBy: string;
}
// Datos que vienen del backend - GET
export interface SubcategoryDataBackend {
	_id: string;
	name: string;
	description?: string;
	images?: string[];
	family: FamilyDataBackend;
	category: CategoryDataToSend;
	createdBy: UserDataBackend;
}
// Datos que se usan en el frontend - Visualización (solo frontend)
export interface SubcategoryDataFrontend {
	id: string;
	name: string;
	description?: string;
	images?: string[];
	family: FamilyDataFrontend;
	category: CategoryDataToSend;
	createdBy: UserDataFrontend;
}
// DELETE se hace directo con ids

export interface SubcategoryCategorization {
	_id?: string;
	name: string;
	description?: string;
	images?: string[];
	rawImages?: string[];
	family: string;
	category: string;
	createdBy: string;
}
