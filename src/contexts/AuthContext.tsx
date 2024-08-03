import { UserDataFrontend } from '@interfaces/User.interface';
import { UserRole } from '@interfaces/UserRole';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	user: UserDataFrontend | null;
	role: UserRole | null;
	setAuth: (auth: {
		isAuthenticated: boolean;
		user: UserDataFrontend | null;
	}) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<UserDataFrontend | null>(null);
	const [role, setRole] = useState<UserRole | null>(null);
	const [auth, setAuth] = useState<{
		isAuthenticated: boolean;
		user: UserDataFrontend | null;
	}>({
		isAuthenticated: false,
		user: null,
	});

	useEffect(() => {
		setUser(auth.user);
		setRole(auth.user?.role as UserRole);
	}, [auth.isAuthenticated]);

	return (
		<AuthContext.Provider value={{ ...auth, setAuth, user, role }}>
			{children}
		</AuthContext.Provider>
	);
};
