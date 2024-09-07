import { transformUserDataFront } from '@adapters/user.adapter';
import { RoleDataFront } from '@interfaces/Role.interface';
import { UserAuthContext, UserDataFrontend } from '@interfaces/User.interface';
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import {
	clearAuthData,
	decodeToken,
	getToken,
	isTokenValid,
} from './authService';

export const AuthContext = createContext<UserAuthContext | undefined>(
	undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuthContext debe ser usado dentro de un AuthContext');
	}
	return context;
};
