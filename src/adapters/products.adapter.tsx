export interface ProductBackend {
	_id: string;
	name: string;
	model: string;
	familyId: string;
	categoryId: string;
	subcategoryId?: string;
	description: string;
	characteristics: string[];
	specifications: Array<{ [key: string]: string }>;
	imagesUrl?: string[];
	manuals?: string[];
	videos?: string[];
	createdBy?: string;
}

export interface ProductFrontend {
	id: string;
	name: string;
	model: string;
	familyId: string;
	categoryId: string;
	subcategoryId?: string;
	description: string;
	characteristics: string[];
	specifications: Array<{ [key: string]: string }>;
	imagesUrl?: string[];
	manuals?: string[];
	videos?: string[];
	createdBy?: string;
}

// el mapeo de los datos de usuario
const ProductMapping: Record<keyof ProductBackend, keyof ProductFrontend> = {
	_id: 'id',
	name: 'name',
	model: 'model',
	familyId: 'familyId',
	categoryId: 'categoryId',
	subcategoryId: 'subcategoryId',
	description: 'description',
	characteristics: 'characteristics',
	imagesUrl: 'imagesUrl',
	manuals: 'manuals',
	videos: 'videos',
	createdBy: 'createdBy',
	specifications: 'specifications',
};
const ProductMappingBack: Record<keyof ProductFrontend, keyof ProductBackend> =
	{
		id: '_id',
		name: 'name',
		model: 'model',
		familyId: 'familyId',
		categoryId: 'categoryId',
		subcategoryId: 'subcategoryId',
		description: 'description',
		characteristics: 'characteristics',
		imagesUrl: 'imagesUrl',
		manuals: 'manuals',
		videos: 'videos',
		createdBy: 'createdBy',
		specifications: 'specifications',
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
export const transformProductData = (data: ProductBackend): ProductFrontend => {
	return transformData<ProductBackend, ProductFrontend>(
		data,
		ProductMapping,
	) as ProductFrontend;
};

export const transformProductDataBack = (
	data: ProductFrontend,
): ProductBackend => {
	return transformData<ProductFrontend, ProductBackend>(
		data,
		ProductMappingBack,
	) as ProductBackend;
};
