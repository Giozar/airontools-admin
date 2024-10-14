export interface Company {
	_id: string;
	name?: string;
	industry?: string;
	email?: string;
	phoneNumber?: string;
	website?: string;
	addresses?: string[];
	contacts?: string[];
	createdBy: string;
	updatedBy: string;
}

export interface CreateCompany {
	name: string;
	industry?: string;
	email?: string;
	phoneNumber?: string;
	website?: string;
	addresses?: string[];
	contacts?: string[];
	createdBy: string;
}

export interface UpdateCompany {
	_id: string;
	name?: string;
	industry?: string;
	email?: string;
	phoneNumber?: string;
	website?: string;
	addresses?: string[];
	contacts?: string[];
	updatedBy: string;
}

export interface CompanyContextProps {
	_id?: string;
	name: string;
	setName: (value: string) => void;
	industry?: string;
	setIndustry?: (value: string) => void;
	email?: string;
	setEmail?: (value: string) => void;
	phoneNumber?: string;
	setPhoneNumber?: (value: string) => void;
	website?: string;
	setWebsite?: (value: string) => void;
	addresses?: string[];
	setAddresses?: (value: string[]) => void;
	contacts?: string[];
	setContacts?: (value: string[]) => void;
	createdBy: string;
	setCreatedBy: (value: string) => void;
	updatedBy?: string;
	setUpdatedBy?: (value: string) => void;
	resetCompany: () => void;
}
