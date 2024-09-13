import { CategoryCategorization } from './Category.interface';
import { SubcategoryCategorization } from './subcategory.interface';
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

export interface CategorizationCreateContextProps {
	id?: string;
	setId: (value: string) => void;
	name: string;
	setName: (value: string) => void;
	description: string;
	setDescription: (value: string) => void;
	rawImage: File | null;
	setRawImage: (value: File | null) => void;
	image: string;
	setImage: (value: string) => void;
	categories: CategoryCategorization[];
	setCategories: (value: CategoryCategorization[]) => void;
	subcategories: SubcategoryCategorization[];
	setSubcategories: (value: SubcategoryCategorization[]) => void;
	createdBy: string;
	setCreatedBy: (value: string) => void;
}
