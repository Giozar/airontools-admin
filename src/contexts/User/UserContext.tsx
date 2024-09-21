import { UserContextProps } from '@interfaces/UserFormData.interface';
import { createContext, ReactNode, useContext, useState } from 'react';

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [rawImage, setRawImage] = useState<File | null>(null);
	const [role, setRole] = useState('');
	const [createdBy, setCreatedBy] = useState('');
	const [password, setPassword] = useState('');

	return (
		<UserContext.Provider
			value={{
				id,
				setId,
				name,
				setName,
				email,
				setEmail,
				imageUrl,
				setImageUrl,
				rawImage,
				setRawImage,
				role,
				setRole,
				createdBy,
				setCreatedBy,
				password,
				setPassword,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUserContext debe ser usado dentro de un UserProvider');
	}
	return context;
};
