// Definición de los tipos que puede tomar el cliente
export enum CustomerType {
	INDIVIDUAL = 'INDIVIDUAL',
	COMPANY = 'COMPANY',
}

export interface Customer {
	_id: string;
	customerType: CustomerType;
	name: string;
	phoneNumber: string;
	observations: string;
	createdBy: string;
	updatedBy: string;
}

export interface CreateCustomer {
	customerType: CustomerType;
	name: string;
	phoneNumber: string;
	observations?: string;
	createdBy: string;
}

export interface UpdateCustomer {
	_id: string;
	customerType?: CustomerType;
	name?: string;
	phoneNumber?: string;
	observations?: string;
	updatedBy: string;
}

export interface CustomerContextProps {
	_id?: string;
	customerType: CustomerType;
	setCustomerType: (value: CustomerType) => void;
	name: string;
	setName: (value: string) => void;
	phoneNumber: string;
	setPhoneNumber: (value: string) => void;
	observations?: string;
	setObservations?: (value: string) => void;
	createdBy: string;
	setCreatedBy: (value: string) => void;
	updatedBy?: string;
	setUpdatedBy?: (value: string) => void;
}
