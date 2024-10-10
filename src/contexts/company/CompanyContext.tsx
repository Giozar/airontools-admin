import { CompanyContextProps } from '@interfaces/Company.interface';
import { createContext, ReactNode, useContext, useState } from 'react';

// Crear el contexto con el tipo adecuado
const CompanyContext = createContext<CompanyContextProps | null>(null);

// Proveedor del contexto de Company
export const CompanyProvider = ({ children }: { children: ReactNode }) => {
	const [name, setName] = useState<string>('');
	const [createdBy, setCreatedBy] = useState<string>('');
	const [updatedBy, setUpdatedBy] = useState<string | undefined>(undefined);

	return (
		<CompanyContext.Provider
			value={{
				name,
				setName,
				createdBy,
				setCreatedBy,
				updatedBy,
				setUpdatedBy,
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
