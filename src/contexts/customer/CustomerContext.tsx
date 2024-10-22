import {
	CustomerContextProps,
	CustomerType,
} from '@interfaces/Customer.interface';
import { createContext, ReactNode, useContext, useState } from 'react';

// Crear el contexto con el tipo adecuado
const CustomerContext = createContext<CustomerContextProps | null>(null);

// Proveedor del contexto de Customer
export const CustomerProvider = ({ children }: { children: ReactNode }) => {
	// Estado inicial
	const initialState = {
		customerType: CustomerType.COMPANY,
		name: '',
		phoneNumber: '',
		company: '',
		createdBy: '',
		updatedBy: undefined as string | undefined,
	};

	// Definir los estados
	const [customerType, setCustomerType] = useState<CustomerType>(
		initialState.customerType,
	);
	const [name, setName] = useState<string>(initialState.name);
	const [phoneNumber, setPhoneNumber] = useState<string>(
		initialState.phoneNumber,
	);
	const [company, setCompany] = useState<string>(initialState.company);
	const [createdBy, setCreatedBy] = useState<string>(initialState.createdBy);
	const [updatedBy, setUpdatedBy] = useState<string | undefined>(
		initialState.updatedBy,
	);

	// Función para resetear los valores del contexto a su estado inicial
	const resetCustomer = () => {
		setCustomerType(initialState.customerType);
		setName(initialState.name);
		setPhoneNumber(initialState.phoneNumber);
		setCompany(initialState.company);
		setCreatedBy(initialState.createdBy);
		setUpdatedBy(initialState.updatedBy);
	};

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
				resetCustomer,
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
