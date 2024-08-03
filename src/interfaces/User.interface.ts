import { UserRole } from './UserRole';

export interface UserDataBackend {
	_id: string;
	imageUrl: string;
	email: string;
	password?: string;
	fullName: string;
	role: UserRole;
}

export interface UserDataFrontend {
	id?: string;
	imageUrl?: string;
	email?: string;
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
