import { RepairProduct } from './RepairProduct.interface';

export enum OrderStatus {
	PENDING = 'pending',
	IN_PROGRESS = 'in_progress',
	COMPLETED = 'completed',
	CANCELLED = 'cancelled',
}

export enum OrderType {
	REPAIR = 'repair',
}

export interface Order {
	_id?: string; // ID de la orden
	customer: string; // ID del cliente relacionado
	orderType: OrderType; // Tipo de orden (en este caso siempre 'repair')
	authorizationDate: Date; // Fecha de autorización
	products: RepairProduct[]; // Lista para id's de productos a reparar
	observations?: string; // Observaciones generales
	images?: string[]; // URLs de las imágenes opcionales
	receivedBy: string; // ID del empleado que recibe el producto
	deliveryRepresentative: string; // Representante que entrega la herramienta
	orderStatus: OrderStatus; // Estado de la orden
	createdBy: string; // ID del usuario que creó la orden
	updatedBy?: string; // ID del usuario que actualizó la orden (opcional)
}
