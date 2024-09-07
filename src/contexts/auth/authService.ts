import { LoginResponse } from '@interfaces/LoginResponse.interface';
import { jwtDecode } from 'jwt-decode';

export const getToken = (): string | null => localStorage.getItem('token');

export const decodeToken = (token: string): LoginResponse | null => {
	try {
		return jwtDecode<LoginResponse>(token);
	} catch (error) {
		console.error('Token decoding failed', error);
		localStorage.removeItem('token');
		return null;
	}
};

export const isTokenValid = (decodedToken: LoginResponse): boolean => {
	const now = Math.floor(Date.now() / 1000);
	return decodedToken.exp > now;
};

export const clearAuthData = () => {
	localStorage.removeItem('token');
};
