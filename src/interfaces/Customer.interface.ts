// Definición de los tipos que puede tomar el cliente
export enum CustomerType {
	INDIVIDUAL = 'individual',
	COMPANY = 'empresa',
}

export interface Customer {
	_id: string;
	customerType: CustomerType;
	name: string;
	phoneNumber: string;
	company?: string;
	createdBy: string;
	updatedBy: string;
}

export interface CreateCustomer {
	customerType: CustomerType;
	name: string;
	phoneNumber: string;
	company?: string;
	createdBy: string;
}

export interface UpdateCustomer {
	_id: string;
	customerType?: CustomerType;
	name?: string;
	phoneNumber?: string;
	company?: string;
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
	company: string;
	setCompany: (value: string) => void;
	createdBy: string;
	setCreatedBy: (value: string) => void;
	updatedBy?: string;
	setUpdatedBy?: (value: string) => void;
}
