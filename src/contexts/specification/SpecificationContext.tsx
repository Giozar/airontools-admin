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
	const [families, setFamilies] = useState<string[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [subcategories, setSubcategories] = useState<string[]>([]);
	const [createdBy, setCreatedBy] = useState<string>('');
	const [updatedBy, setUpdatedBy] = useState<string>('');

	// Proveemos los valores actuales y sus setters
	return (
		<SpecificationContext.Provider
			value={{
				specifications,
				categorizations,
				families,
				categories,
				subcategories,
				createdBy,
				updatedBy,
				setSpecifications,
				setCategorizations,
				setFamilies,
				setCategories,
				setSubcategories,
				setCreatedBy,
				setUpdatedBy,
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
