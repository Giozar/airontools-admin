import {
	CategoryCreateContextProps,
	CategoryCreateContextType,
} from '@interfaces/Category.interface';
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';
import { CategoryInstance } from './category.class';
//Esta funcion crea varias instancias de la clase Categoria
// CategoryCreateContext.tsx
const CategoryCreateContext = createContext<CategoryCreateContextType | null>(
	null,
);

export const CategoryCreateProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [categoryInstances, setCategoryInstances] = useState<
		Record<string, CategoryCreateContextProps>
	>({});

	const addCategoryInstance = useCallback(
		(
			key: string,
			id?: string,
			family?: string,
			name?: string,
			description?: string,
			image?: string,
			imageToDelete?: boolean,
			createdBy?: string,
			mode?: 'create' | 'edit',
		) => {
			setCategoryInstances(prevInstances => ({
				...prevInstances,
				[key]: new CategoryInstance(
					id,
					family,
					name,
					description,
					image,
					imageToDelete,
					createdBy,
					mode,
				),
			}));
		},
		[],
	);

	const removeCategoryInstance = useCallback((key: string) => {
		setCategoryInstances(prevInstances => {
			const { [key]: _, ...remaining } = prevInstances;
			return remaining;
		});
	}, []);

	const getCategoryInstance = (key: string) => categoryInstances[key];
	const getAllCategoryInstances = useCallback(
		() => Object.values(categoryInstances),
		[categoryInstances],
	);

	const updateCategoryInstance = useCallback(
		(key: string, update: Partial<CategoryCreateContextProps>) => {
			setCategoryInstances(prevInstances => ({
				...prevInstances,
				[key]: {
					...prevInstances[key],
					...update,
				},
			}));
		},
		[],
	);

	return (
		<CategoryCreateContext.Provider
			value={{
				categoryInstances,
				addCategoryInstance,
				removeCategoryInstance,
				getCategoryInstance,
				updateCategoryInstance,
				getAllCategoryInstances,
			}}
		>
			{children}
		</CategoryCreateContext.Provider>
	);
};

export const useCategoryCreateContext = () => {
	const context = useContext(CategoryCreateContext);
	if (!context) {
		throw new Error(
			'useCategoryCreateContext must be used within a CategoryCreateProvider',
		);
	}
	return context;
};
