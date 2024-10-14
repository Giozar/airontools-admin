import {
	CustomerContextProps,
	CustomerType,
} from '@interfaces/Customer.interface';
import { createContext, ReactNode, useContext, useState } from 'react';

// Crear el contexto con el tipo adecuado
const CustomerContext = createContext<CustomerContextProps | null>(null);

// Proveedor del contexto de Customer
export const CustomerProvider = ({ children }: { children: ReactNode }) => {
	const [customerType, setCustomerType] = useState<CustomerType>(
		CustomerType.INDIVIDUAL,
	);
	const [name, setName] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [company, setCompany] = useState<string>('');
	const [createdBy, setCreatedBy] = useState<string>('');
	const [updatedBy, setUpdatedBy] = useState<string | undefined>(undefined);

	return (
		<CustomerContext.Provider
			value={{
				customerType,
				setCustomerType,
				name,
				setName,
				phoneNumber,
				setPhoneNumber,
				company,
				setCompany,
				createdBy,
				setCreatedBy,
				updatedBy,
				setUpdatedBy,
			}}
		>
			{children}
		</CustomerContext.Provider>
	);
};

// Hook personalizado para usar el contexto de Customer
export const useCustomerContext = () => {
	const context = useContext(CustomerContext);
	if (!context) {
		throw new Error(
			'useCustomerContext debe ser usado dentro de un CustomerProvider',
		);
	}
	return context;
};
