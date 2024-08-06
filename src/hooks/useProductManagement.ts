import { ProductDataFrontend } from '@interfaces/Product.interface';
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

	const handleEdit = (Product: ProductDataFrontend) => {
		localStorage.setItem('ProductToEdit', JSON.stringify(Product));
		navigate(location.pathname + `/editar-herramienta`);
	};

	const handleCloseModal = () => {
		setShowDeletionModalFor(null);
		setDeletionMessage(null);
	};
	const handleUpdateList = () => {
		setUpdateListFlag(prevFlag => !prevFlag);
	};
	const handleDelete = async (Product: ProductDataFrontend) => {
		try {
			const hola = await Promise.all(
				(Product.images || [])
					.concat(Product.manuals || [])
					.map(item => axios.delete(item)),
			);
			console.log(hola);
			await axios.delete(
				import.meta.env.VITE_API_URL + `/products/${Product.id}`,
			);
			setDeletionMessage(
				`El producto ${Product.name} (${Product.id}) ha sido eliminado correctamente.`,
			);
			console.log(`El producto ${Product.id} eliminado correctamente.`);
		} catch (error) {
			setDeletionMessage(`No se ha podido eliminar al producto ${Product.id}.`);
			console.error(`Error al eliminar producto ${Product.id}:`, error);
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
