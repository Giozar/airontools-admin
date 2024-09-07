import { transformUserDataFront } from '@adapters/user.adapter';
import { RoleDataFront } from '@interfaces/Role.interface';
import { UserDataFrontend } from '@interfaces/User.interface';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import {
	clearAuthData,
	decodeToken,
	getToken,
	isTokenValid,
} from './authService';

interface AuthContextType {
	isAuthenticated: boolean;
	user: UserDataFrontend | null;
	role: RoleDataFront | null;
	setAuth: (auth: {
		isAuthenticated: boolean;
		user: UserDataFrontend | null;
	}) => void;
	loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [auth, setAuth] = useState<{
		isAuthenticated: boolean;
		user: UserDataFrontend | null;
	}>({
		isAuthenticated: false,
		user: null,
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = getToken();
		if (token) {
			const decodedToken = decodeToken(token);
			if (decodedToken && isTokenValid(decodedToken)) {
				setAuth({
					isAuthenticated: true,
					user: transformUserDataFront(decodedToken.user),
				});
			} else {
				clearAuthData();
				setAuth({ isAuthenticated: false, user: null });
			}
		} else {
			setAuth({ isAuthenticated: false, user: null });
		}
		setLoading(false);
	}, []);

	const role = auth.user?.role as RoleDataFront;

	return (
		<AuthContext.Provider value={{ ...auth, setAuth, role, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
