import { UserDataBackend } from '@adapters/user.adapter';

export interface RegisterResponse {
	token: string;
	user: UserDataBackend;
}

export interface ValidationError {
	message: string[];
}
