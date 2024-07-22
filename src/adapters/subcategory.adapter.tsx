export interface SubcategoryBackend {
	_id: string;
	name: string;
	description: string;
	createdBy: string;
	updatedBy?: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
	path: string;
	familyId: string;
	categoryId: string;
}

export interface SubcategoryFrontend {
	id?: string;
	name: string;
	description: string;
	createdBy: string;
	updatedBy?: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
	path: string;
	familyId: string;
	categoryId: string;
}

// el mapeo de los datos de usuario
const subcategoryMapping: Record<
	keyof SubcategoryBackend,
	keyof SubcategoryFrontend
> = {
	_id: 'id',
	name: 'name',
	description: 'description',
	createdBy: 'createdBy',
	updatedBy: 'updatedBy',
	createdAt: 'createdAt',
	updatedAt: 'updatedAt',
	__v: '__v',
	path: 'path',
	familyId: 'familyId',
	categoryId: 'categoryId',
};
const subcategoryMappingBack: Record<
	keyof SubcategoryFrontend,
	keyof SubcategoryBackend
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
	familyId: 'familyId',
	categoryId: 'categoryId',
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
export const transformSubcategoryData = (
	data: SubcategoryBackend,
): SubcategoryFrontend => {
	return transformData<SubcategoryBackend, SubcategoryFrontend>(
		data,
		subcategoryMapping,
	) as SubcategoryFrontend;
};

export const transformSubategoryDataBack = (
	data: SubcategoryFrontend,
): SubcategoryBackend => {
	return transformData<SubcategoryFrontend, SubcategoryBackend>(
		data,
		subcategoryMappingBack,
	) as SubcategoryBackend;
};
