import {
	Categorization,
	SpecDataToSend,
	SpecificationContextProps,
} from '@interfaces/Specifications.interface';
import { createContext, ReactNode, useContext, useState } from 'react';

// Creamos el contexto
const SpecificationContext = createContext<SpecificationContextProps | null>(
	null,
);

export const SpecificationProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	// Estados para cada una de las propiedades del contexto
	const [specifications, setSpecifications] = useState<SpecDataToSend[]>([]);
	const [categorizations, setCategorizations] = useState<Categorization[]>([]);
	const [createdBy, setCreatedBy] = useState<string>('');
	const [updatedBy, setUpdatedBy] = useState<string>('');
	// Funciones Helper
	const updateFamily = (index: number, newFamilyId: string) => {
		setCategorizations(prev => {
			const updatedCategorizations = [...prev];
			updatedCategorizations[index].selectedFamily = newFamilyId;
			return updatedCategorizations;
		});
	};

	const updateCategories = (index: number, newCategoryIds: string[]) => {
		setCategorizations(prev => {
			const updatedCategorizations = [...prev];
			updatedCategorizations[index].selectedCategories = newCategoryIds;
			return updatedCategorizations;
		});
	};

	const updateSubcategories = (index: number, newSubcategoryIds: string[]) => {
		setCategorizations(prev => {
			const updatedCategorizations = [...prev];
			updatedCategorizations[index].selectedSubcategories = newSubcategoryIds;
			return updatedCategorizations;
		});
	};

	// Proveemos los valores actuales y sus setters
	return (
		<SpecificationContext.Provider
			value={{
				specifications,
				categorizations,
				createdBy,
				updatedBy,
				setSpecifications,
				setCategorizations,
				setCreatedBy,
				setUpdatedBy,
				updateFamily,
				updateCategories,
				updateSubcategories,
			}}
		>
			{children}
		</SpecificationContext.Provider>
	);
};

// Hook personalizado para usar el contexto de Specification
export const useSpecificationContext = () => {
	const context = useContext(SpecificationContext);
	if (!context) {
		throw new Error(
			'useSpecificationContext debe ser usado dentro de un SpecificationProvider',
		);
	}
	return context;
};
