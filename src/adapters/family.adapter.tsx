export interface FamilyBackend {
	_id: string;
	name: string;
	description: string;
	createdBy: string;
	updatedBy?: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface FamilyFrontend {
	id?: string;
	name: string;
	description: string;
	createdBy: string;
	updatedBy?: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

// el mapeo de los datos de usuario
const familyMapping: Record<keyof FamilyBackend, keyof FamilyFrontend> = {
	_id: 'id',
	name: 'name',
	description: 'description',
	createdBy: 'createdBy',
	updatedBy: 'updatedBy',
	createdAt: 'createdAt',
	updatedAt: 'updatedAt',
	__v: '__v',
};
const familyMappingBack: Record<keyof FamilyFrontend, keyof FamilyBackend> = {
	id: '_id',
	name: 'name',
	description: 'description',
	createdBy: 'createdBy',
	updatedBy: 'updatedBy',
	createdAt: 'createdAt',
	updatedAt: 'updatedAt',
	__v: '__v',
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
export const transformFamilyData = (data: FamilyBackend): FamilyFrontend => {
	return transformData<FamilyBackend, FamilyFrontend>(
		data,
		familyMapping,
	) as FamilyFrontend;
};

export const transformFamilyDataBack = (
	data: FamilyFrontend,
): FamilyBackend => {
	return transformData<FamilyFrontend, FamilyBackend>(
		data,
		familyMappingBack,
	) as FamilyBackend;
};
