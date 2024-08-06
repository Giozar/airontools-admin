import {
	CategoryDataBackend,
	CategoryDataFrontend,
	CategoryDataToSend,
} from '@interfaces/Category.interface';
import { transformFamilyDataToFrontend } from './family.adapter';
import { transformUserDataFront } from './user.adapter';

export const transformCategoryDataToFrontend = (
	Category: CategoryDataBackend,
): CategoryDataFrontend => {
	return {
		id: Category._id,
		name: Category.name,
		description: Category.description,
		family: transformFamilyDataToFrontend(Category.family),
		createdBy: transformUserDataFront(Category.createdBy),
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
};
/* export interface CategoryBackend {
	_id: string;
	name: string;
	description: string;
	createdBy: string;
	updatedBy?: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
	path: string;
	Category: string;
}

export interface CategoryFrontend {
	id?: string;
	name: string;
	description: string;
	createdBy: string;
	updatedBy?: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
	path: string;
	Category: string;
}

// el mapeo de los datos de usuario
const categoryMapping: Record<keyof CategoryBackend, keyof CategoryFrontend> = {
	_id: 'id',
	name: 'name',
	description: 'description',
	createdBy: 'createdBy',
	updatedBy: 'updatedBy',
	createdAt: 'createdAt',
	updatedAt: 'updatedAt',
	__v: '__v',
	path: 'path',
	CategoryId: 'CategoryId',
};
const categoryMappingBack: Record<
	keyof CategoryFrontend,
	keyof CategoryBackend
> = {
	id: '_id',
	name: 'name',
	description: 'description',
	createdBy: 'createdBy',
	updatedBy: 'updatedBy',
	createdAt: 'createdAt',
	updatedAt: 'updatedAt',
	__v: '__v',
	path: 'path',
	CategoryId: 'CategoryId',
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
export const transformCategoryData = (
	data: CategoryBackend,
): CategoryFrontend => {
	return transformData<CategoryBackend, CategoryFrontend>(
		data,
		categoryMapping,
	) as CategoryFrontend;
};

export const transformCategoryDataBack = (
	data: CategoryFrontend,
): CategoryBackend => {
	return transformData<CategoryFrontend, CategoryBackend>(
		data,
		categoryMappingBack,
	) as CategoryBackend;
};
*/
