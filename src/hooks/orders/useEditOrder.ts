import { fileUpload } from '@components/files/helpers/filesUpload.helper';
import { useAlertHelper } from '@contexts/Alert/alert.helper';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useCompanyContext } from '@contexts/company/CompanyContext';
import { useCustomerContext } from '@contexts/customer/CustomerContext';
import { useOrderContext } from '@contexts/order/OrderContext';
import { CustomerType } from '@interfaces/Customer.interface';
import { updateCompanyService } from '@services/companies/companies.service';
import { updateCustomerService } from '@services/customers/customers.service';
import { deleteFileService } from '@services/files/deleteFile.service';
import {
	updateOrderService,
	uploadOrderUrlImagesService,
} from '@services/orders/orders.service';

export default function useEditOrder() {
	const { name: companyName } = useCompanyContext();
	const { name: customerName, phoneNumber } = useCustomerContext();
	const {
		authorizationDate,
		products,
		quoteDeliveryTime,
		deliveryRepresentative,
		company,
		customer,
		receivedBy,
		imageRaw,
		setImageRaw,
		setImages,
		imageRemoved,
		setImageRemoved,
		_id,
		setSuccess,
	} = useOrderContext();
	const { user } = useAuthContext();
	const createdBy = user?.id;
	const { showSuccess, showError } = useAlertHelper();
	const productsObservation = products
		.map(product => `${product.model}: ${product.observation}`)
		.filter(observation => observation !== '')
		.join('. '); // obten las observaciones de los productos

	const editOrder = async (e: Event) => {
		e.preventDefault();
		if (!createdBy) throw new Error('No usuario para crear herramienta');

		try {
			const createdCompany = await updateCompanyService(company || '', {
				name: companyName,
			});
			console.log(createdCompany);
			const createdCustomer = await updateCustomerService(customer || '', {
				customerType: CustomerType.INDIVIDUAL,
				name: customerName,
				phoneNumber,
			});
			console.log(createdCustomer);

			const editedOrder = await updateOrderService(_id, {
				authorizationDate,
				products,
				updatedBy: createdBy,
				receivedBy,
				deliveryRepresentative,
				observations: productsObservation,
				quoteDeliveryTime,
			});
			console.log(editedOrder);

			if (imageRemoved) {
				console.log(imageRemoved);
				await deleteFileService(imageRemoved);
				setImageRemoved('');
				setImages([]);
				await updateOrderService(_id, {
					images: [],
				});
			}

			if (imageRaw) {
				console.log('Subo archivo');
				const imageUrls = await fileUpload({
					type: 'images',
					feature: `orders/${_id}`,
					file: imageRaw,
					setFile: setImageRaw,
					setFileUrl: (url: string) => {
						if (setImages) {
							setImages([url]);
						}
					},
				});
				imageUrls &&
					(await uploadOrderUrlImagesService({
						orderId: _id,
						imageUrls: [imageUrls],
					}));
			}
			setSuccess(true);
			showSuccess('Orden editada con éxito');
		} catch (error) {
			showError('No se pudo editar la orden', error);
		}
	};

	return { editOrder };
}
