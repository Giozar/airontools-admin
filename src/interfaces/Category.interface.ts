import { FamilyDataBackend, FamilyDataFrontend } from './Family.interface';
import { UserDataBackend, UserDataFrontend } from './User.interface';

// Datos para enviar al backend - PATCH, POST, PUT
export interface CategoryDataToSend {
	_id?: string;
	name: string;
	description?: string;
	family: string;
	createdBy: string;
}
// Datos que vienen del backend - GET
export interface CategoryDataBackend {
	_id: string;
	name: string;
	description?: string;
	family: FamilyDataBackend;
	createdBy: UserDataBackend;
}
// Datos que se usan en el frontend - Visualización (solo frontend)
export interface CategoryDataFrontend {
	id: string;
	name: string;
	description?: string;
	family: FamilyDataFrontend;
	createdBy: UserDataFrontend;
}
// DELETE se hace directo con ids