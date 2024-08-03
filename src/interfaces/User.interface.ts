import { UserRole } from './UserRole';

export interface sendingUserData {
	name: string;
	imageUrl: string;
	email: string;
	password?: string;
	role: string;
	createdBy: string;
}

export interface UserDataBackend {
	_id: string;
	imageUrl: string;
	email: string;
	password?: string;
	fullName: string;
	role: UserRole;
}

export interface UserDataFrontend {
	id: string;
	imageUrl: string;
	email: string;
	password?: string;
	name: string;
	role: UserRole;
}

export interface RegisterResponse {
	token: string;
	user: UserDataBackend;
}

export interface ValidationError {
	message: string[];
}
