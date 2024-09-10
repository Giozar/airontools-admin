import { transformUserDataFront } from '@adapters/user.adapter';
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

const AuthContext = createContext<UserAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<UserDataFrontend | null>(null);
	const [loading, setLoading] = useState(false);
	const [auth, setAuth] = useState(false);

	useEffect(() => {
		setLoading(true);
		const token = getToken();
		if (token) {
			const decodedToken = decodeToken(token);
			if (decodedToken && isTokenValid(decodedToken)) {
				setAuth(true);
				setUser(transformUserDataFront(decodedToken.user));
			} else {
				clearAuthData();
				setAuth(false);
				setUser(null);
			}
		} else {
			setAuth(false);
			setUser(null);
		}
		setLoading(false);
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, setUser, auth, setAuth, loading, setLoading }}
		>
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
