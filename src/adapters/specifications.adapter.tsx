/* import {
	CategoryDataBackend,
	CategoryDataFrontend,
	CategoryDataToSend,
} from '@interfaces/Category.interface';
import { transformFamilyDataToFrontend } from './family.adapter';
import { transformUserData } from './user.adapter';

export const transformCategoryDataToFrontend = (
	Category: CategoryDataBackend,
): CategoryDataFrontend => {
	return {
		id: Category._id,
		name: Category.name,
		description: Category.description,
		family: transformFamilyDataToFrontend(Category.family),
		createdBy: transformUserData(Category.createdBy),
	};
};

export const transformCategoryDataToBackend = (
	Category: CategoryDataFrontend,
): CategoryDataToSend => {
	return {
		_id: Category.id,
		name: Category.name,
		description: Category.description,
		family: Category.family.id,
		createdBy: Category.createdBy.id,
	};
}; */
export interface SpecsBackend {
	_id: string;
	name: string;
	description: string;
	unit: string;
	createdBy?: string;
	updatedBy?: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
	path: string;
	familyId: string;
	categoryId: string;
	subcategoryId: string;
}

export interface SpecsFrontend {
	id: string;
	name: string;
	description: string;
	unit: string;
	createdBy?: string;
	updatedBy?: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
	path: string;
	familyId: string;
	categoryId: string;
	subcategoryId: string;
}

// el mapeo de los datos de usuario
const SpecsMapping: Record<keyof SpecsBackend, keyof SpecsFrontend> = {
	_id: 'id',
	name: 'name',
	description: 'description',
	unit: 'unit',
	createdBy: 'createdBy',
	updatedBy: 'updatedBy',
	createdAt: 'createdAt',
	updatedAt: 'updatedAt',
	__v: '__v',
	path: 'path',
	familyId: 'familyId',
	categoryId: 'categoryId',
	subcategoryId: 'subcategoryId',
};
const SpecsMappingBack: Record<keyof SpecsFrontend, keyof SpecsBackend> = {
	id: '_id',
	name: 'name',
	description: 'description',
	unit: 'unit',
	createdBy: 'createdBy',
	updatedBy: 'updatedBy',
	createdAt: 'createdAt',
	updatedAt: 'updatedAt',
	__v: '__v',
	path: 'path',
	familyId: 'familyId',
	categoryId: 'categoryId',
	subcategoryId: 'subcategoryId',
};

// Transform data generico, este se podra usar para transformar otros datos que vengan del backend
const transformData = <T extends object, U extends object>(
	data: T,
	mapping: Record<keyof T, keyof U>,
): Partial<U> => {
	const transformedData = {} as Partial<U>;

	(Object.keys(data) as Array<keyof T>).forEach(key => {
		const mappedKey = mapping[key];
		if (mappedKey) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			transformedData[mappedKey] = data[key] as any;
		} else {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(transformedData as any)[key] = data[key]; // Conserva claves no mapeadas
		}
	});

	return transformedData;
};

// Funcion especifica para transformar datos de usuario
export const transformSpecsData = (data: SpecsBackend): SpecsFrontend => {
	return transformData<SpecsBackend, SpecsFrontend>(
		data,
		SpecsMapping,
	) as SpecsFrontend;
};

export const transformSpecsDataBack = (data: SpecsFrontend): SpecsBackend => {
	return transformData<SpecsFrontend, SpecsBackend>(
		data,
		SpecsMappingBack,
	) as SpecsBackend;
};
