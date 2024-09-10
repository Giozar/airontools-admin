import { UserLoginResponse } from '@interfaces/User.interface';
import { jwtDecode } from 'jwt-decode';

export const getToken = (): string | null => localStorage.getItem('token');

export const decodeToken = (token: string): UserLoginResponse | null => {
	try {
		return jwtDecode<UserLoginResponse>(token);
	} catch (error) {
		console.error('Token decoding failed', error);
		localStorage.removeItem('token');
		return null;
	}
};

export const isTokenValid = (decodedToken: UserLoginResponse): boolean => {
	const now = Math.floor(Date.now() / 1000);
	return decodedToken.exp > now;
};

export const clearAuthData = () => {
	localStorage.removeItem('token');
};
