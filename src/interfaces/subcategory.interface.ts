import { CategoryDataToSend } from './Category.interface';
import { FamilyDataBackend, FamilyDataFrontend } from './Family.interface';
import { UserDataBackend, UserDataFrontend } from './User.interface';

// Datos para enviar al backend - PATCH, POST, PUT
export interface SubcategoryDataToSend {
	_id?: string;
	name?: string;
	description?: string;
	images?: string[];
	family?: string;
	category?: string;
	createdBy?: string;
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
// de aqui me hice bolas xd
export interface SubcategoryClass {
	id?: string;
	family?: string;
	category?: string;
	name?: string;
	description?: string;
	image?: string;
	imageToDelete?: boolean;
	createdBy?: string;
	mode?: 'create' | 'edit';
}

export interface SubcategoryCreateContextProps {
	id: string;
	name: string;
	family: string;
	setFamily: (family: string) => void;
	category: string;
	setCategory: (category: string) => void;
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

export interface SubcategoryCreateContextType {
	subcategoryInstances: Record<string, SubcategoryCreateContextProps>;
	addSubcategoryInstance: (
		key: string,
		{
			id,
			family,
			category,
			name,
			description,
			image,
			imageToDelete,
			createdBy,
			mode,
		}: SubcategoryClass,
	) => void;
	removeSubcategoryInstance: (key: string) => void;
	getSubcategoryInstance: (
		key: string,
	) => SubcategoryCreateContextProps | undefined;
	updateSubcategoryInstance: (
		key: string,
		update: Partial<SubcategoryCreateContextProps>,
	) => void;
	getAllSubcategoryInstances: () => SubcategoryCreateContextProps[];
	removeCreateModeSubcategories: () => void;
	resetSubcategoryInstances: () => void;
}
