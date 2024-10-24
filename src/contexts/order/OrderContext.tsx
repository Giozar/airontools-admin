import {
	OrderContextProps,
	OrderStatus,
	OrderType,
} from '@interfaces/Order.interface';
import { OrderProduct } from '@interfaces/OrderProduct.interface';
import { createContext, ReactNode, useContext, useState } from 'react';

// Crear el contexto con el tipo adecuado
const OrderContext = createContext<OrderContextProps | null>(null);

// Proveedor del contexto de la orden
export const OrderProvider = ({ children }: { children: ReactNode }) => {
	// Estados iniciales
	const initialProducts: OrderProduct[] = [
		{
			quantity: 1,
			brand: '',
			model: '',
			serialNumber: '',
			description: '',
			observation: '',
			rawImage: null,
			createdBy: '',
		},
	];

	const initialState = {
		_id: '',
		customer: '',
		company: '',
		quoteDeliveryTime: '',
		orderType: OrderType.REPAIR,
		authorizationDate: new Date(),
		deliveryDate: new Date(),
		observations: '',
		imageUrl: '',
		imageRemoved: '',
		imageRaw: null as File | null,
		receivedBy: '',
		deliveryRepresentative: '',
		orderStatus: OrderStatus.PENDING,
		createdBy: '',
		updatedBy: undefined as string | undefined,
		products: initialProducts,
	};

	// Definir los estados
	const [_id, setId] = useState<string>(initialState._id);
	const [customer, setCustomer] = useState<string>(initialState.customer);
	const [company, setCompany] = useState<string>(initialState.company);
	const [quoteDeliveryTime, setQuoteDeliveryTime] = useState<string>(
		initialState.quoteDeliveryTime,
	);
	const [orderType, setOrderType] = useState<OrderType>(initialState.orderType);
	const [authorizationDate, setAuthorizationDate] = useState<Date>(
		initialState.authorizationDate,
	);
	const [deliveryDate, setDeliveryDate] = useState<Date>(
		initialState.deliveryDate,
	);
	const [observations, setObservations] = useState<string>(
		initialState.observations,
	);
	const [imageUrl, setImageUrl] = useState<string>(initialState.imageUrl);
	const [imageRemoved, setImageRemoved] = useState<string>(
		initialState.imageRemoved,
	);
	const [imageRaw, setImageRaw] = useState<File | null>(initialState.imageRaw);
	const [receivedBy, setReceivedBy] = useState<string>(initialState.receivedBy);
	const [deliveryRepresentative, setDeliveryRepresentative] = useState<string>(
		initialState.deliveryRepresentative,
	);
	const [orderStatus, setOrderStatus] = useState<OrderStatus>(
		initialState.orderStatus,
	);
	const [createdBy, setCreatedBy] = useState<string>(initialState.createdBy);
	const [updatedBy, setUpdatedBy] = useState<string | undefined>(
		initialState.updatedBy,
	);
	const [products, setProducts] = useState<OrderProduct[]>(
		initialState.products,
	);

	const [success, setSuccess] = useState(false);

	// Función para resetear los valores del contexto a su estado inicial
	const resetOrder = () => {
		setId(initialState._id);
		setCustomer(initialState.customer);
		setCompany(initialState.company);
		setQuoteDeliveryTime(initialState.quoteDeliveryTime);
		setOrderType(initialState.orderType);
		setAuthorizationDate(initialState.authorizationDate);
		setDeliveryDate(initialState.deliveryDate);
		setObservations(initialState.observations);
		setImageUrl(initialState.imageUrl);
		setImageRaw(initialState.imageRaw);
		setImageRemoved(initialState.imageRemoved);
		setReceivedBy(initialState.receivedBy);
		setDeliveryRepresentative(initialState.deliveryRepresentative);
		setOrderStatus(initialState.orderStatus);
		setCreatedBy(initialState.createdBy);
		setUpdatedBy(initialState.updatedBy);
		setProducts(initialState.products);
		setSuccess(false);
	};

	return (
		<OrderContext.Provider
			value={{
				_id,
				setId,
				customer,
				setCustomer,
				company,
				setCompany,
				orderType,
				setOrderType,
				authorizationDate,
				setAuthorizationDate,
				quoteDeliveryTime,
				setQuoteDeliveryTime,
				deliveryDate,
				setDeliveryDate,
				products,
				setProducts,
				observations,
				setObservations,
				imageUrl,
				setImageUrl,
				imageRaw,
				setImageRaw,
				imageRemoved,
				setImageRemoved,
				receivedBy,
				setReceivedBy,
				deliveryRepresentative,
				setDeliveryRepresentative,
				orderStatus,
				setOrderStatus,
				createdBy,
				setCreatedBy,
				updatedBy,
				setUpdatedBy,
				resetOrder,
				success,
				setSuccess,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};

// Hook personalizado para usar el contexto de la orden
export const useOrderContext = () => {
	const context = useContext(OrderContext);
	if (!context)
		throw new Error(
			'useOrderContext debe ser usado dentro de un OrderProvider',
		);
	return context;
};
