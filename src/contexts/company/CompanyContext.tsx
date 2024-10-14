import { CompanyContextProps } from '@interfaces/Company.interface';
import { createContext, ReactNode, useContext, useState } from 'react';

// Crear el contexto con el tipo adecuado
const CompanyContext = createContext<CompanyContextProps | null>(null);

// Proveedor del contexto de Company
export const CompanyProvider = ({ children }: { children: ReactNode }) => {
	// Estado inicial
	const initialState = {
		name: '',
		createdBy: '',
		updatedBy: undefined as string | undefined,
	};

	// Definir los estados
	const [name, setName] = useState<string>(initialState.name);
	const [createdBy, setCreatedBy] = useState<string>(initialState.createdBy);
	const [updatedBy, setUpdatedBy] = useState<string | undefined>(
		initialState.updatedBy,
	);

	// Función para resetear los valores del contexto a su estado inicial
	const resetCompany = () => {
		setName(initialState.name);
		setCreatedBy(initialState.createdBy);
		setUpdatedBy(initialState.updatedBy);
	};

	return (
		<CompanyContext.Provider
			value={{
				name,
				setName,
				createdBy,
				setCreatedBy,
				updatedBy,
				setUpdatedBy,
				resetCompany,
			}}
		>
			{children}
		</CompanyContext.Provider>
	);
};

// Hook personalizado para usar el contexto de Company
export const useCompanyContext = () => {
	const context = useContext(CompanyContext);
	if (!context) {
		throw new Error(
			'useCompanyContext debe ser usado dentro de un CompanyProvider',
		);
	}
	return context;
};
