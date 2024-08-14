import { ProductDataFrontend } from '@interfaces/Product.interface';
import { deleteProduct } from '@services/products/deleteProduct.service';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useProductManagement = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [deletionMessage, setDeletionMessage] = useState<string | null>(null);
	const [showDeletionModalFor, setShowDeletionModalFor] = useState<
		string | null
	>(null);
	const [showModalFor, setShowModalFor] = useState<string | null>(null);
	const [updateListFlag, setUpdateListFlag] = useState<boolean>(false);

	const handleEdit = (product: ProductDataFrontend) => {
		localStorage.setItem('ProductToEdit', JSON.stringify(product));
		navigate(`${location.pathname}/editar-herramienta`);
	};

	const handleCloseModal = () => {
		setShowDeletionModalFor(null);
		setDeletionMessage(null);
	};

	const handleUpdateList = () => {
		setUpdateListFlag(prevFlag => !prevFlag);
	};

	const handleDelete = async (product: ProductDataFrontend | null) => {
		if (!product) return;
		try {
			const message = await deleteProduct(product);
			setDeletionMessage(message);
			console.log(message);
		} catch (error) {
			setDeletionMessage(`Error al eliminar producto ${product.id}`);
			console.error(`Error al eliminar producto ${product.id}:`, error);
		}
	};

	return {
		showDeletionModalFor,
		setShowDeletionModalFor,
		showModalFor,
		setShowModalFor,
		deletionMessage,
		handleEdit,
		handleCloseModal,
		handleDelete,
		handleUpdateList,
		updateListFlag,
	};
};

export default useProductManagement;
