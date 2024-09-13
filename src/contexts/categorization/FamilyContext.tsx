import { FamilyCreateContextProps } from '@interfaces/Family.interface';
import { createContext, ReactNode, useContext, useState } from 'react';

const FamilyCreateContext = createContext<FamilyCreateContextProps | null>(
	null,
);

export const FamilyCreateProvider = ({ children }: { children: ReactNode }) => {
	const [id, setId] = useState<string>('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [rawImage, setRawImage] = useState<File | null>(null);
	const [image, setImage] = useState('');
	const [createdBy, setCreatedBy] = useState<string>('');

	return (
		<FamilyCreateContext.Provider
			value={{
				id,
				setId,
				name,
				setName,
				description,
				setDescription,
				rawImage,
				setRawImage,
				image,
				setImage,
				createdBy,
				setCreatedBy,
			}}
		>
			{children}
		</FamilyCreateContext.Provider>
	);
};

export const useFamilyCreateContext = () => {
	const context = useContext(FamilyCreateContext);
	if (!context) {
		throw new Error(
			'useFamilyCreateContext debe ser usado dentro de un FamilyCreateProvider',
		);
	}
	return context;
};
