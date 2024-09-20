import { CategoryDataFrontend } from './Category.interface';
import { SubcategoryDataFrontend } from './subcategory.interface';
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
	categories: CategoryDataFrontend[];
	subcategories: SubcategoryDataFrontend[];
}
// Datos que se usan en el frontend - Visualización (solo frontend)
export interface FamilyDataFrontend {
	id: string;
	name: string;
	path: string;
	description?: string;
	images: string[];
	createdBy: UserDataFrontend;
	categories: CategoryDataFrontend[];
	subcategories: SubcategoryDataFrontend[];
}
// DELETE se hace directo con ids

export interface FamilyCreateContextProps {
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
	imageToDelete?: boolean;
	setImageToDelete?: (value: boolean) => void;
	createdBy: string;
	setCreatedBy: (value: string) => void;
}
