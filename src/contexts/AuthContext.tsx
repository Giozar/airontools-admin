import { UserDataFrontend } from '@adapters/user.adapter';
import React, { createContext, ReactNode, useState } from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	user: UserDataFrontend | null;
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
	const [auth, setAuth] = useState<{
		isAuthenticated: boolean;
		user: UserDataFrontend | null;
	}>({
		isAuthenticated: false,
		user: null,
	});

	return (
		<AuthContext.Provider value={{ ...auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};
