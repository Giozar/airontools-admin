export interface Company {
	name: string; // Nombre de la empresa
	industry?: string; // Industria a la que pertenece la empresa
	email?: string; // Correo electrónico de contacto de la empresa
	phoneNumber?: string; // Número de teléfono de la empresa
	website?: string; // Sitio web de la empresa
	addresses?: string[]; // Direcciones de la empresa
	contacts?: string[]; // Contactos adicionales dentro de la empresa
	createdBy: string; // Creador del registro
	updatedBy?: string; // Actualizador del registro
}
