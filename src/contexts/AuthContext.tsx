import { transformUserDataFront } from '@adapters/user.adapter';
import { LoginResponse } from '@interfaces/LoginResponse.interface';
import { RoleDataFront } from '@interfaces/Role.interface';
import { UserDataFrontend } from '@interfaces/User.interface';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

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
	const [user, setUser] = useState<UserDataFrontend | null>(null);
	const [role, setRole] = useState<RoleDataFront | null>(null);
	const [auth, setAuth] = useState<{
		isAuthenticated: boolean;
		user: UserDataFrontend | null;
	}>({
		isAuthenticated: false,
		user: null,
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const decodedToken = jwtDecode<LoginResponse>(token);
				const now = Math.floor(Date.now() / 1000);
				if (decodedToken.exp > now) {
					setAuth({
						isAuthenticated: true,
						user: transformUserDataFront(decodedToken.user),
					});
				} else {
					localStorage.removeItem('token');
					setAuth({ isAuthenticated: false, user: null });
				}
			} catch (error) {
				console.error('Token decoding failed', error);
				localStorage.removeItem('token');
				setAuth({ isAuthenticated: false, user: null });
			}
		} else {
			setAuth({ isAuthenticated: false, user: null });
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		setUser(auth.user);
		setRole(auth.user?.role as RoleDataFront);
	}, [auth.user]);

	return (
		<AuthContext.Provider value={{ ...auth, setAuth, user, role, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
