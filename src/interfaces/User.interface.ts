import { RoleDataBack, RoleDataFront } from './Role.interface';

export interface UserDataSend {
	name: string;
	imageUrl: string;
	email: string;
	password?: string;
	role?: string;
	createdBy?: string;
	updatedBy?: string;
}

export interface UserDataBackend {
	_id: string;
	email: string;
	name: string;
	role: RoleDataBack;
	imageUrl: string;
	password?: string;
	createdBy?: UserDataBackend;
	updatedBy?: UserDataBackend;
}

export interface UserDataFrontend {
	id: string;
	name: string;
	email: string;
	imageUrl: string;
	password?: string;
	role?: RoleDataFront | null;
	createdBy?: UserDataFrontend;
	updatedBy?: UserDataFrontend;
	createdAt?: string;
	updatedAt?: string;
}

export interface UserAuthContext {
	user: UserDataFrontend | null;
	setUser: (value: UserDataFrontend | null) => void;
	auth: boolean;
	setAuth: (value: boolean) => void;
	loading: boolean;
	setLoading: (value: boolean) => void;
}

export interface RegisterResponse {
	token: string;
	user: UserDataBackend;
}

export interface ValidationError {
	message: string[];
}

export interface UserLoginResponse {
	token: string;
	user: UserDataBackend;
	exp: number;
	iat: number;
}
