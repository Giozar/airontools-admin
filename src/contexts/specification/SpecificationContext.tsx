import { Categorization } from '@components/specifications/types';
import { SpecificationContextProps } from '@interfaces/Specifications.interface';
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
	const [id, setId] = useState<string | undefined>(undefined);
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string | undefined>(undefined);
	const [unit, setUnit] = useState<string | undefined>(undefined);
	const [families, setFamilies] = useState<string[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [subcategories, setSubcategories] = useState<string[]>([]);
	const [createdBy, setCreatedBy] = useState<string>('');
	const [categorizations, setCategorizations] = useState<Categorization[]>([]);

	// Proveemos los valores actuales y sus setters
	return (
		<SpecificationContext.Provider
			value={{
				id,
				name,
				description,
				unit,
				families,
				categories,
				subcategories,
				createdBy,
				categorizations,
				setId,
				setName,
				setDescription,
				setUnit,
				setFamilies,
				setCategories,
				setSubcategories,
				setCreatedBy,
				setCategorizations,
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
