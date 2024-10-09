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

export interface CreateOrder {
	customer: string; // ID del cliente relacionado
	orderType: OrderType; // Tipo de orden (en este caso siempre 'repair')
	authorizationDate: Date; // Fecha de autorización
	products: RepairProduct[]; // Lista para id's de productos a reparar
	observations?: string; // Observaciones generales (opcional)
	images?: string[]; // URLs de las imágenes opcionales (opcional)
	receivedBy: string; // ID del empleado que recibe el producto
	deliveryRepresentative: string; // Representante que entrega la herramienta
	orderStatus: OrderStatus; // Estado de la orden
	createdBy: string; // ID del usuario que creó la orden
}

export interface UpdateOrder {
	_id: string; // ID de la orden (requerido para editar)
	customer?: string; // ID del cliente relacionado (opcional para edición)
	orderType?: OrderType; // Tipo de orden (opcional para edición)
	authorizationDate?: Date; // Fecha de autorización (opcional para edición)
	products?: RepairProduct[]; // Lista de productos a reparar (opcional)
	observations?: string; // Observaciones generales (opcional)
	images?: string[]; // URLs de las imágenes (opcional)
	receivedBy?: string; // ID del empleado que recibe el producto (opcional)
	deliveryRepresentative?: string; // Representante que entrega la herramienta (opcional)
	orderStatus?: OrderStatus; // Estado de la orden (opcional)
	updatedBy: string; // ID del usuario que actualizó la orden
}

export interface OrderContextProps {
	_id?: string; // ID de la orden
	customer: string; // ID del cliente relacionado
	setCustomer: (value: string) => void; // Setter para actualizar el cliente
	orderType: OrderType; // Tipo de orden (en este caso siempre 'repair')
	setOrderType: (value: OrderType) => void; // Setter para actualizar el tipo de orden
	authorizationDate: Date; // Fecha de autorización
	setAuthorizationDate: (value: Date) => void; // Setter para actualizar la fecha de autorización
	products: RepairProduct[]; // Lista de productos a reparar
	setProducts: (value: RepairProduct[]) => void; // Setter para actualizar la lista de productos
	observations?: string; // Observaciones generales (opcional)
	setObservations?: (value: string) => void; // Setter para actualizar las observaciones
	images?: string[]; // URLs de las imágenes opcionales
	setImages?: (value: string[]) => void; // Setter para actualizar las imágenes
	receivedBy: string; // ID del empleado que recibe el producto
	setReceivedBy: (value: string) => void; // Setter para actualizar quién recibe
	deliveryRepresentative: string; // Representante que entrega la herramienta
	setDeliveryRepresentative: (value: string) => void; // Setter para actualizar el representante de entrega
	orderStatus: OrderStatus; // Estado de la orden
	setOrderStatus: (value: OrderStatus) => void; // Setter para actualizar el estado de la orden
	createdBy: string; // ID del usuario que creó la orden
	setCreatedBy: (value: string) => void; // Setter para actualizar quién creó la orden
	updatedBy?: string; // ID del usuario que actualizó la orden (opcional)
	setUpdatedBy?: (value: string) => void; // Setter para actualizar quién actualizó la orden
}
