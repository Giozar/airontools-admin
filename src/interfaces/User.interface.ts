import { UserRole } from './UserRole';

export interface UserDataSend {
	name: string;
	imageUrl: string;
	email: string;
	password?: string;
	role: string;
	createdBy?: string;
	updatedBy?: string;
}

export interface UserDataBackend {
	_id: string;
	email: string;
	name: string;
	role: UserRole;
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
	role: UserRole;
	createdBy?: UserDataFrontend;
	updatedBy?: UserDataFrontend;
}

export interface RegisterResponse {
	token: string;
	user: UserDataBackend;
}

export interface ValidationError {
	message: string[];
}
