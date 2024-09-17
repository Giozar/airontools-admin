import { FamilyDataBackend, FamilyDataFrontend } from './Family.interface';
import { UserDataBackend, UserDataFrontend } from './User.interface';

// Datos para enviar al backend - PATCH, POST, PUT
export interface CategoryDataToSend {
	_id?: string;
	name?: string;
	description?: string;
	images?: string[];
	family?: string;
	createdBy?: string;
}
// Datos que vienen del backend - GET
export interface CategoryDataBackend {
	_id: string;
	name: string;
	description?: string;
	images?: string[];
	family: FamilyDataBackend;
	createdBy: UserDataBackend;
}
// Datos que se usan en el frontend - Visualización (solo frontend)
export interface CategoryDataFrontend {
	id: string;
	name: string;
	description?: string;
	images?: string[];
	family: FamilyDataFrontend;
	createdBy: UserDataFrontend;
}
// DELETE se hace directo con ids

/*Para el contexto */
export interface CategoryCreateContextProps {
	id: string;
	name: string;
	family: string;
	setFamily: (family: string) => void;
	description: string;
	rawImage: File | null;
	image: string;
	imageToDelete: boolean;
	createdBy: string;
	mode: 'create' | 'edit';
	setId: (id: string) => void;
	setName: (name: string) => void;
	setDescription: (description: string) => void;
	setRawImage: (file: File | null) => void;
	setImage: (image: string) => void;
	setImageToDelete: (image: boolean) => void;
	setCreatedBy: (createdBy: string) => void;
	setMode: (mode: 'create' | 'edit') => void;
}

export interface CategoryCreateContextType {
	categoryInstances: Record<string, CategoryCreateContextProps>;
	addCategoryInstance: (key: string) => void;
	removeCategoryInstance: (key: string) => void;
	getCategoryInstance: (key: string) => CategoryCreateContextProps | undefined;
	updateCategoryInstance: (
		key: string,
		update: Partial<CategoryCreateContextProps>,
	) => void;
	getAllCategoryInstances: () => CategoryCreateContextProps[];
}
