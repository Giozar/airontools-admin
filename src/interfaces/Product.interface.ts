import { CategoryDataToSend } from './Category.interface';
import { FamilyDataToSend } from './Family.interface';
import { SubcategoryDataToSend } from './subcategory.interface';
import { UserDataBackend, UserDataFrontend } from './User.interface';

// Datos para enviar al backend - PATCH, POST, PUT
export interface ProductDataToSend {
	_id?: string;
	name: string;
	model?: string;
	description?: string;
	characteristics?: string[];
	specifications: Array<{ [key: string]: string }>;
	family: string;
	category: string;
	subcategory?: string;
	images?: string[];
	manuals?: string[];
	videos?: string[];
	createdBy: string;
}
// Datos que vienen del backend - GET
export interface ProductDataBackend {
	_id: string;
	name: string;
	model?: string;
	description?: string;
	characteristics?: string[];
	specifications: Array<{ [key: string]: string }>;
	family: FamilyDataToSend;
	category: CategoryDataToSend;
	subcategory: SubcategoryDataToSend;
	images?: string[];
	manuals?: string[];
	videos?: string[];
	createdBy: UserDataBackend;
}
// Datos que se usan en el frontend - Visualización (solo frontend)
export interface ProductDataFrontend {
	id: string;
	name: string;
	model?: string;
	description?: string;
	characteristics?: string[];
	specifications: Array<{ [key: string]: string }>;
	family: FamilyDataToSend;
	category: CategoryDataToSend;
	subcategory: SubcategoryDataToSend;
	images?: string[];
	manuals?: string[];
	videos?: string[];
	createdBy: UserDataFrontend;
}
// DELETE se hace directo con ids