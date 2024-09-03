import {
	SpecDataBackend,
	SpecDataFrontend,
	SpecDataToSend,
} from '@interfaces/Specifications.interface';
import { transformUserDataFront } from './user.adapter';

export const transformSpecDataToFrontend = (
	Spec: SpecDataBackend,
): SpecDataFrontend => {
	return {
		id: Spec._id,
		name: Spec.name,
		description: Spec.description,
		unit: Spec.unit,
		families: Spec.families,
		categories: Spec.categories,
		subcategories: Spec.subcategories,
		createdBy: transformUserDataFront(Spec.createdBy),
	};
};

export const transformSpecDataToBackend = (
	Spec: SpecDataFrontend,
): SpecDataToSend => {
	return {
		_id: Spec.id,
		name: Spec.name,
		description: Spec.description,
		unit: Spec.unit,
		families: Spec.families.map(family => family._id || ''),
		categories: Spec.categories.map(category => category._id || ''),
		subcategories: Spec.subcategories.map(subcategory => subcategory._id || ''),
		createdBy: Spec.createdBy.id,
	};
};

/*
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
	SpecId: string;
	subSpecId: string;
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
	SpecId: string;
	subSpecId: string;
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
	SpecId: 'SpecId',
	subSpecId: 'subSpecId',
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
	SpecId: 'SpecId',
	subSpecId: 'subSpecId',
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
*/
