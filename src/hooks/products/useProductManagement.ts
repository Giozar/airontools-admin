import { useAlert } from '@contexts/Alert/AlertContext';
import { ProductDataFrontend } from '@interfaces/Product.interface';
import { deleteProduct } from '@services/products/deleteProduct.service';
import { useLocation, useNavigate } from 'react-router-dom';

const useProductManagement = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { showAlert } = useAlert();
	const handleEdit = (product: ProductDataFrontend) => {
		localStorage.setItem('ProductToEdit', product.id);
		navigate(`${location.pathname}/editar-herramienta`);
	};

	const handleDelete = async (product: ProductDataFrontend | null) => {
		if (!product) return;
		try {
			const message = await deleteProduct(product);
			showAlert(message, 'success');
		} catch (error) {
			showAlert(`Error al eliminar producto ${product.id}`, 'error');
		}
	};

	return {
		handleEdit,
		handleDelete,
	};
};

export default useProductManagement;
