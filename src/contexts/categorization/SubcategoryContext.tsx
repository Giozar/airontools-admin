//Esta funcion crea varias instancias de la clase subcategoria
import {
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

	const addSubcategoryInstance = useCallback((key: string) => {
		setSubcategoryInstances(prevInstances => ({
			...prevInstances,
			[key]: new SubcategoryInstance(),
		}));
	}, []);

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

	return (
		<SubcategoryCreateContext.Provider
			value={{
				subcategoryInstances,
				addSubcategoryInstance,
				removeSubcategoryInstance,
				getSubcategoryInstance,
				updateSubcategoryInstance,
				getAllSubcategoryInstances,
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
