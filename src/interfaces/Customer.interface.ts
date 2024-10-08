export enum CustomerType {
	INDIVIDUAL = 'individual',
	COMPANY = 'company',
}

export interface Address {
	street?: string; // Calle
	city?: string; // Ciudad
	state?: string; // Estado
	postalCode?: string; // Código postal
	country?: string; // País (opcional)
}

export interface Customer {
	customerType: CustomerType; // Tipo de cliente: individuo o empresa
	name: string; // Nombre del cliente
	company?: string; // Relación con la empresa (opcional)
	email?: string; // Correo electrónico del cliente (opcional)
	phoneNumber: string; // Teléfono de contacto (requerido)
	address?: Address; // Dirección del cliente (opcional)
	additionalContacts?: string[]; // Contactos adicionales (opcional)
	createdBy: string; // Creador del registro
	updatedBy?: string; // Actualizador del registro (opcional)
}
