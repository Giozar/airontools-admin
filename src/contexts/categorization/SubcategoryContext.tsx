//Esta funcion crea varias instancias de la clase subcategoria
import {
	SubcategoryClass,
	SubcategoryCreateContextProps,
	SubcategoryCreateContextType,
} from '@interfaces/subcategory.interface';
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';
import { SubcategoryInstance } from './subcategory.class';

const SubcategoryCreateContext =
	createContext<SubcategoryCreateContextType | null>(null);

export const SubcategoryCreateProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [subcategoryInstances, setSubcategoryInstances] = useState<
		Record<string, SubcategoryCreateContextProps>
	>({});

	const addSubcategoryInstance = useCallback(
		(
			key: string,
			{
				id = '',
				family = '',
				category = '',
				name = '',
				description = '',
				image = '',
				imageToDelete = false,
				createdBy = '',
				mode = 'create',
			}: SubcategoryClass = {},
		) => {
			setSubcategoryInstances(prevInstances => ({
				...prevInstances,
				[key]: new SubcategoryInstance(
					id,
					family,
					category,
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

	const removeSubcategoryInstance = useCallback((key: string) => {
		setSubcategoryInstances(prevInstances => {
			const { [key]: _, ...remaining } = prevInstances;
			return remaining;
		});
	}, []);

	const getSubcategoryInstance = (key: string) => subcategoryInstances[key];

	const getAllSubcategoryInstances = useCallback(
		() => Object.values(subcategoryInstances),
		[subcategoryInstances],
	);
	const updateSubcategoryInstance = useCallback(
		(key: string, update: Partial<SubcategoryCreateContextProps>) => {
			setSubcategoryInstances(prevInstances => ({
				...prevInstances,
				[key]: {
					...prevInstances[key],
					...update,
				},
			}));
		},
		[],
	);
	const removeCreateModeSubcategories = useCallback(() => {
		setSubcategoryInstances(prevInstances => {
			return Object.fromEntries(
				Object.entries(prevInstances).filter(
					([_, category]) => category.mode !== 'create',
				),
			);
		});
	}, []);
	return (
		<SubcategoryCreateContext.Provider
			value={{
				subcategoryInstances,
				addSubcategoryInstance,
				removeSubcategoryInstance,
				getSubcategoryInstance,
				updateSubcategoryInstance,
				getAllSubcategoryInstances,
				removeCreateModeSubcategories,
			}}
		>
			{children}
		</SubcategoryCreateContext.Provider>
	);
};

export const useSubcategoryCreateContext = () => {
	const context = useContext(SubcategoryCreateContext);
	if (!context) {
		throw new Error(
			'useSubcategoryCreateContext must be used within a SubcategoryCreateProvider',
		);
	}
	return context;
};
