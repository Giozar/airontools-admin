import { CategoryCategorization } from '@interfaces/Category.interface';
import { CategorizationCreateContextProps } from '@interfaces/Family.interface';
import { SubcategoryCategorization } from '@interfaces/subcategory.interface';
import { createContext, ReactNode, useContext, useState } from 'react';

const CategorizationCreateContext =
	createContext<CategorizationCreateContextProps | null>(null);

export const CategorizationCreateProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [id, setId] = useState<string>('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [rawImage, setRawImage] = useState<File | null>(null);
	const [image, setImage] = useState('');
	const [categories, setCategories] = useState<CategoryCategorization[]>([]);
	const [subcategories, setSubcategories] = useState<
		SubcategoryCategorization[]
	>([]);
	const [createdBy, setCreatedBy] = useState<string>('');

	return (
		<CategorizationCreateContext.Provider
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
				categories,
				setCategories,
				subcategories,
				setSubcategories,
				createdBy,
				setCreatedBy,
			}}
		>
			{children}
		</CategorizationCreateContext.Provider>
	);
};

export const useCategorizationCreateContext = () => {
	const context = useContext(CategorizationCreateContext);
	if (!context) {
		throw new Error(
			'useCategorizationCreateContext debe ser usado dentro de un CategorizationCreateProvider',
		);
	}
	return context;
};
