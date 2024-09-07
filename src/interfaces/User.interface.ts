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
}

export interface UserAuthContext {
	isAuthenticated: boolean;
	user: UserDataFrontend | null;
	role: RoleDataFront | null;
	setAuth: (auth: {
		isAuthenticated: boolean;
		user: UserDataFrontend | null;
	}) => void;
	loading: boolean;
}

export interface RegisterResponse {
	token: string;
	user: UserDataBackend;
}

export interface ValidationError {
	message: string[];
}
