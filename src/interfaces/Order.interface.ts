import { OrderProduct } from '@interfaces/OrderProduct.interface';
import { Company } from './Company.interface';
import { Customer } from './Customer.interface';
import { UserDataBackend } from './User.interface';

export enum OrderType {
	REPAIR = 'Reparación',
}

export enum OrderStatus {
	ENTERED = 'Ingresado',
	UNDER_REVIEW = 'En revisión',
	ACCEPTED = 'Aceptada',
	PENDING = 'Pendiente',
	IN_PROGRESS = 'En progreso',
	IN_PROCESS = 'En proceso',
	ON_HOLD = 'En espera',
	COMPLETED = 'Completado',
	FINALIZED = 'Finalizado',
	DELIVERED = 'Entregado',
	CANCELLED = 'Cancelado',
	REJECTED = 'Rechazado',
}

export interface Order {
	customer: Customer; // ID del cliente
	company?: Company;
	orderType: string; // Tipo de orden
	authorizationDate: string; // Fecha de autorización
	deliveryDate?: Date; //  Fecha de entrega del producto
	quoteDeliveryTime: string; // Tiempo de entrega de la cotización
	products: OrderProduct[]; // Array de productos
	imageUrl: string; // Array de URLs de imágenes
	receivedBy: UserDataBackend; // ID de quien recibió la orden
	deliveryRepresentative: string; // Nombre del representante de entrega
	orderStatus: string; // Estado de la orden
	createdBy: string; // ID de quien creó la orden
	_id: string; // ID de la orden
	createdAt: string; // Fecha de creación
	updatedAt: string; // Fecha de actualización
	__v: number; // Versión
	control: number;
}

export interface OrderPage {
	data: Order[];
	total: number;
	totalPages: number;
	page: number;
}

export interface CreateOrder {
	customer: string; // ID del cliente relacionado
	company?: string;
	orderType: OrderType; // Tipo de orden (en este caso siempre 'repair')
	authorizationDate: Date; // Fecha de autorización
	deliveryDate?: Date; //  Fecha de entrega del producto
	quoteDeliveryTime: string; // Tiempo de entrega de la cotización
	products: OrderProduct[]; // Lista para id's de productos a reparar
	observations?: string; // Observaciones generales (opcional)
	imageUrl?: string; // URLs de las imágenes opcionales (opcional)
	receivedBy: string; // ID del empleado que recibe el producto
	deliveryRepresentative: string; // Representante que entrega la herramienta
	orderStatus: OrderStatus; // Estado de la orden
	createdBy: string; // ID del usuario que creó la orden
}

export interface UpdateOrder {
	_id: string; // ID de la orden (requerido para editar)
	customer?: string; // ID del cliente relacionado (opcional para edición)
	company?: string;
	orderType?: OrderType; // Tipo de orden (opcional para edición)
	authorizationDate?: Date; // Fecha de autorización (opcional para edición)
	deliveryDate?: Date;
	quoteDeliveryTime?: string; // Tiempo de entrega de la cotización
	products?: OrderProduct[]; // Lista de productos a reparar (opcional)
	observations?: string; // Observaciones generales (opcional)
	imageUrl?: string; // URLs de las imágenes (opcional)
	receivedBy?: string; // ID del empleado que recibe el producto (opcional)
	deliveryRepresentative?: string; // Representante que entrega la herramienta (opcional)
	orderStatus?: OrderStatus; // Estado de la orden (opcional)
	updatedBy: string; // ID del usuario que actualizó la orden
}

export interface OrderContextProps {
	_id: string; // ID de la orden
	setId: (value: string) => void;
	customer: string; // ID del cliente relacionado
	setCustomer: (value: string) => void; // Setter para actualizar el cliente
	company?: string;
	setCompany: (value: string) => void;
	orderType: OrderType; // Tipo de orden (en este caso siempre 'repair')
	setOrderType: (value: OrderType) => void; // Setter para actualizar el tipo de orden
	authorizationDate: Date; // Fecha de autorización
	setAuthorizationDate: (value: Date) => void; // Setter para actualizar la fecha de autorización
	deliveryDate: Date; // Fecha de entrega de la cotización
	setDeliveryDate: (value: Date) => void;
	quoteDeliveryTime: string; // Tiempo de entrega de la cotización
	setQuoteDeliveryTime: (value: string) => void;
	products: OrderProduct[]; // Lista de productos a reparar
	setProducts: (value: OrderProduct[]) => void; // Setter para actualizar la lista de productos
	observations: string; // Observaciones generales
	setObservations: (value: string) => void; // Setter para actualizar las observaciones
	imageUrl: string; // URLs de las imágenes opcionales
	setImageUrl: (value: string) => void; // Setter para actualizar las imágenes
	imageRaw: File | null;
	setImageRaw: (value: File | null) => void;
	imageRemoved: string; // URLs de las imágenes opcionales
	setImageRemoved: (value: string) => void; // Setter para actualizar las imágenes
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
	resetOrder: () => void;
	success: boolean;
	setSuccess: (value: boolean) => void;
}
