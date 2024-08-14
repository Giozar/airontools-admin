import { UserDataBackend, UserDataFrontend } from './User.interface';

// Datos para enviar al backend - PATCH, POST, PUT
export interface FamilyDataToSend {
	_id?: string;
	name: string;
	description?: string;
	path: string;
	images: string[];
	createdBy: string;
}
// Datos que vienen del backend - GET
export interface FamilyDataBackend {
	_id: string;
	name: string;
	path: string;
	description?: string;
	images: string[];
	createdBy: UserDataBackend;
}
// Datos que se usan en el frontend - Visualización (solo frontend)
export interface FamilyDataFrontend {
	id: string;
	name: string;
	path: string;
	description?: string;
	images: string[];
	createdBy: UserDataFrontend;
}
// DELETE se hace directo con ids
