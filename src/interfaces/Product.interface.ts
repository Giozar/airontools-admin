import { CategoryDataToSend } from './Category.interface';
import { FamilyDataToSend } from './Family.interface';
import {
	ProductSpecification,
	SpecDataToSend,
} from './Specifications.interface';
import { SubcategoryDataToSend } from './subcategory.interface';
import { UserDataBackend, UserDataFrontend } from './User.interface';

// Datos para enviar al backend - PATCH, POST, PUT
export interface ProductDataToSend {
	_id?: string;
	name: string;
	model?: string;
	description?: string;
	characteristics?: string[];
	specifications: ProductSpecification[];
	family: string;
	category: string;
	subcategory?: string;
	includedItems?: string[];
	optionalAccessories?: string[];
	operationRequirements?: string[];
	applications?: string[];
	recommendations?: string[];
	images?: string[];
	manuals?: string[];
	videos?: string[];
	createdBy: string;
}

export interface ProductCreateContextProps {
	id?: string;
	setId: (value: string) => void;
	name: string;
	setName: (value: string) => void;
	model: string;
	setModel: (value: string) => void;
	description: string;
	setDescription: (value: string) => void;
	characteristics: string[];
	setCharacteristics: (value: string[]) => void;
	specifications: ProductSpecification[];
	setSpecifications: (value: ProductSpecification[]) => void;
	family: string;
	setFamily: (value: string) => void;
	category: string;
	setCategory: (value: string) => void;
	subcategory: string;
	setSubcategory: (value: string) => void;
	includedItems: string[];
	setIncludedItems: (value: string[]) => void;
	optionalAccessories: string[];
	setOptionalAccessories: (value: string[]) => void;
	operationRequirements: string[];
	setOperationRequirements: (value: string[]) => void;
	applications: string[];
	setApplications: (value: string[]) => void;
	recommendations: string[];
	setRecommendations: (value: string[]) => void;
	images: string[];
	setImages: (value: string[]) => void;
	manuals: string[];
	setManuals: (value: string[]) => void;
	videos: string[];
	setVideos: (value: string[]) => void;
	createdBy: string;
	setCreatedBy: (value: string) => void;
}
// Datos que vienen del backend - GET
export interface ProductDataBackend {
	_id: string;
	name: string;
	model?: string;
	description?: string;
	characteristics?: string[];
	specifications: [
		{ _id: string; specification: SpecDataToSend; value: string },
	];
	family: FamilyDataToSend;
	category: CategoryDataToSend;
	subcategory: SubcategoryDataToSend;
	includedItems?: string[];
	optionalAccessories?: string[];
	operationRequirements?: string[];
	applications?: string[];
	recommendations?: string[];
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
	specifications: [
		{ _id: string; specification: SpecDataToSend; value: string },
	];
	family: FamilyDataToSend;
	category: CategoryDataToSend;
	subcategory: SubcategoryDataToSend;
	includedItems?: string[];
	optionalAccessories?: string[];
	operationRequirements?: string[];
	applications?: string[];
	recommendations?: string[];
	images?: string[];
	manuals?: string[];
	videos?: string[];
	createdBy: UserDataFrontend;
}
// DELETE se hace directo con ids
