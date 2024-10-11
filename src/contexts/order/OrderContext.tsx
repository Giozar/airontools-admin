import {
	OrderContextProps,
	OrderStatus,
	OrderType,
} from '@interfaces/Order.interface';
import { RepairProduct } from '@interfaces/RepairProduct.interface';
import { createContext, ReactNode, useContext, useState } from 'react';

// Crear el contexto con el tipo adecuado
const OrderContext = createContext<OrderContextProps | null>(null);

// Proveedor del contexto de la orden
export const OrderProvider = ({ children }: { children: ReactNode }) => {
	const [customer, setCustomer] = useState<string>('');
	const [orderType, setOrderType] = useState<OrderType>(OrderType.REPAIR);
	const [authorizationDate, setAuthorizationDate] = useState<Date>(new Date());
	const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
	const [observations, setObservations] = useState<string>('');
	const [images, setImages] = useState<string[]>([]);
	const [imageRaw, setImageRaw] = useState<File | null>(null);
	const [receivedBy, setReceivedBy] = useState<string>('');
	const [deliveryRepresentative, setDeliveryRepresentative] =
		useState<string>('');
	const [orderStatus, setOrderStatus] = useState<OrderStatus>(
		OrderStatus.PENDING,
	);
	const [createdBy, setCreatedBy] = useState<string>('');
	const [updatedBy, setUpdatedBy] = useState<string | undefined>(undefined);
	const initialProducts: RepairProduct[] = Array.from({ length: 9 }, () => ({
		quantity: 1,
		name: '',
		brand: '',
		model: '',
		serialNumber: '',
		description: '',
		observation: '',
		rawImage: null,
	}));
	const [products, setProducts] = useState<RepairProduct[]>(initialProducts);

	return (
		<OrderContext.Provider
			value={{
				customer,
				setCustomer,
				orderType,
				setOrderType,
				authorizationDate,
				setAuthorizationDate,
				deliveryDate,
				setDeliveryDate,
				products,
				setProducts,
				observations,
				setObservations,
				images,
				setImages,
				imageRaw,
				setImageRaw,
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
