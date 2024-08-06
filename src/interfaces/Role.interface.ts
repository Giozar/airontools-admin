import { UserDataBackend, UserDataFrontend } from './User.interface';

export interface Role {
	_id?: string;
	name: string;
	description: string;
	permissions: object;
	createdBy?: string;
	updatedBy?: string;
}

export interface RoleDataSend {
	name: string;
	description: string;
	permissions: object;
	createdBy?: string;
	updatedBy?: string;
}

export interface RoleDataBack {
	_id?: string;
	name: string;
	description: string;
	permissions: object;
	createdBy?: UserDataBackend;
	updatedBy?: UserDataBackend;
}

export interface RoleDataFront {
	id?: string;
	name: string;
	description: string;
	permissions: object;
	createdBy?: UserDataFrontend;
	updatedBy?: UserDataFrontend;
}
