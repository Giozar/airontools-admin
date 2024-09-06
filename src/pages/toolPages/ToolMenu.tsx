import { transformProductDataToFrontend } from '@adapters/products.adapter';
import ActionCard from '@components/commons/ActionCard';
import DeletionModal from '@components/commons/DeletionModal';
import TableComponent from '@components/commons/DynamicTable';
import ToolInfoModal from '@components/products/ToolInfoModal';
import EditIcon from '@components/svg/EditIcon';
import EyeIcon from '@components/svg/EyeIcon';
import TrashIcon from '@components/svg/TrashIcon';
import { airontoolsAPI } from '@configs/api.config';

import { AuthContext } from '@contexts/AuthContext';
import useProductManagement from '@hooks/products/useProductManagement';
import {
	ProductDataBackend,
	ProductDataFrontend,
} from '@interfaces/Product.interface';
import '@pages/toolPages/ToolMenu.css';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

function ListOfTools() {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] =
		useState<ProductDataFrontend | null>(null);
	const [products, setProducts] = useState<ProductDataFrontend[]>([]);
	const {
		showDeletionModalFor,
		setShowDeletionModalFor,
		deletionMessage,
		handleEdit,
		handleCloseModal,
		handleDelete,
	} = useProductManagement();

	const authContext = useContext(AuthContext);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get<ProductDataBackend[]>(
					`${airontoolsAPI}/products`,
				);
				setProducts(response.data.map(transformProductDataToFrontend));
				console.log(response.data);
				console.log(response.data.map(transformProductDataToFrontend));
			} catch (error) {
				console.error('Failed to fetch tools:', error);
			}
		};

		fetchProducts();
	}, []);
	const handleCloseModalDeletion = (toolid: string) => {
		setProducts(products.filter(tool => tool.id !== toolid));
		handleCloseModal();
	};
	const tableData = {
		headers: [
			'ID',
			'Nombre',
			'Modelo',
			'Familia',
			'Categoría',
			'Subcategoría',
			'Ver',
			'Editar',
			'Borrar',
		],
		rows: products.map(tool => [
			tool.id,
			tool.name,
			tool.model,
			tool.family.name,
			tool.category.name,
			tool.subcategory.name || '---',
			<button
				className='view'
				onClick={() => {
					setSelectedProduct(tool);
					setModalOpen(true);
				}}
				key='view'
			>
				<EyeIcon />
			</button>,
			<button className='edit' onClick={() => handleEdit(tool)} key='edit'>
				<EditIcon />
			</button>,
			<button
				disabled={authContext?.role?.name !== 'Administrador'} // Deshabilita el botón si el usuario no es Administrador
				className={`delete ${authContext?.role?.name !== 'Administrador' ? 'disabled' : ''}`} // Aplica la clase 'disabled' si el usuario no es Administrador
				onClick={() => {
					if (authContext?.role?.name === 'Administrador') {
						setShowDeletionModalFor(tool.id);
					}
				}}
				key='delete'
			>
				<TrashIcon />
			</button>,
		]),
	};
	return (
		<div className='toollist'>
			<h2 className='listtitle'>Lista de herramientas</h2>
			<input
				type='text'
				placeholder='Buscar herramientas...'
				// value={searchTerm}
				// onChange={e => {
				//   handleSearch(e.target.value);
				//   setSearchTerm(e.target.value);
				// }}
				className='search'
			/>
			<ToolInfoModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				product={selectedProduct}
			/>
			<TableComponent data={tableData} />
			{showDeletionModalFor && (
				<DeletionModal
					id={showDeletionModalFor}
					name={products.find(p => p.id === showDeletionModalFor)?.name || ''}
					onClose={() => handleCloseModal()}
					onCloseDelete={() => handleCloseModalDeletion(showDeletionModalFor)}
					onDelete={() =>
						handleDelete(
							products.find(p => p.id === showDeletionModalFor) || null,
						)
					}
					message={deletionMessage}
				/>
			)}
		</div>
	);
}

export default function ToolMenu() {
	return (
		<>
			<div className='options users'>
				<ActionCard
					title='Crear Herramienta'
					path={location.pathname + '/crear-herramienta'}
				/>
			</div>
			<ListOfTools />
		</>
	);
}
