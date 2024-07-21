/* Este adaptador traduce/transforma los datos que vienen de backend a datos que vienen de frontend
Cada vez que haya un cambio en el backend de algun nombre como 'name' se debe de cambiar aquí y no en todo el código
*/

export interface UserDataBackend {
	_id: string;
	imageUrl: string;
	email: string;
	password?: string;
	fullName: string;
	roles: string;
}

export interface UserDataFrontend {
	id?: string;
	imageUrl?: string;
	email: string;
	password?: string;
	name: string;
	roles: string;
}

// el mapeo de los datos de usuario
const userMapping: Record<keyof UserDataBackend, keyof UserDataFrontend> = {
	_id: 'id',
	imageUrl: 'imageUrl',
	email: 'email',
	password: 'password',
	fullName: 'name',
	roles: 'roles',
};
const userMappingBack: Record<keyof UserDataFrontend, keyof UserDataBackend> = {
	id: '_id',
	imageUrl: 'imageUrl',
	email: 'email',
	password: 'password',
	name: 'fullName',
	roles: 'roles',
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
export const transformUserData = (data: UserDataBackend): UserDataFrontend => {
	return transformData<UserDataBackend, UserDataFrontend>(
		data,
		userMapping,
	) as UserDataFrontend;
};

export const transformUserDataBack = (
	data: UserDataFrontend,
): UserDataBackend => {
	return transformData<UserDataFrontend, UserDataBackend>(
		data,
		userMappingBack,
	) as UserDataBackend;
};
