import { UserDataBackend } from './User.interface';

export interface LoginResponse {
	token: string;
	user: UserDataBackend;
	exp: number;
	iat: number;
}
