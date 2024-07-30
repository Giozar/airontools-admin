import { ProductFrontend } from '@adapters/products.adapter';
import axios from 'axios';
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

	const handleEdit = (Product: ProductFrontend) => {
		localStorage.setItem('ProductToEdit', JSON.stringify(Product));
		navigate(location.pathname + `/editar-herramientas`);
	};

	const handleCloseModal = () => {
		setShowDeletionModalFor(null);
		setDeletionMessage(null);
	};
	const handleUpdateList = () => {
		setUpdateListFlag(prevFlag => !prevFlag);
	};
	const handleDelete = async (Productid: string, Productname: string) => {
		try {
			await axios.delete(
				import.meta.env.VITE_API_URL + `/products/${Productid}`,
			);
			setDeletionMessage(
				`El producto ${Productname} (${Productid}) ha sido eliminado correctamente.`,
			);
			console.log(`El producto ${Productid} eliminado correctamente.`);
		} catch (error) {
			setDeletionMessage(`No se ha podido eliminar al producto ${Productid}.`);
			console.error(`Error al eliminar producto ${Productid}:`, error);
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
