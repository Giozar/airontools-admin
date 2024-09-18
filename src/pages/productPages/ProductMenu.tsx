import { transformProductDataToFrontend } from '@adapters/products.adapter';
import ActionCard from '@components/commons/ActionCard';
import DeletionModal from '@components/commons/DeletionModal';
import TableComponent from '@components/commons/DynamicTable';
import ToolInfoModal from '@components/products/ToolInfoModal';
import EditIcon from '@components/svg/EditIcon';
import EyeIcon from '@components/svg/EyeIcon';
import TrashIcon from '@components/svg/TrashIcon';
import { airontoolsAPI } from '@configs/api.config';

import { useAuthContext } from '@contexts/auth/AuthContext';
import useProductManagement from '@hooks/products/useProductManagement';
import {
	ProductDataBackend,
	ProductDataFrontend,
} from '@interfaces/Product.interface';
import '@pages/productPages/ProductMenu.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

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

	const { user } = useAuthContext();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get<ProductDataBackend[]>(
					`${airontoolsAPI}/products`,
				);
				setProducts(response.data.map(transformProductDataToFrontend));
				// console.log(response.data);
				// console.log(response.data.map(transformProductDataToFrontend));
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
				className='table__button table__button--view'
				onClick={() => {
					setSelectedProduct(tool);
					setModalOpen(true);
				}}
				key='view'
			>
				<EyeIcon />
			</button>,
			<button
				className='table__button table__button--edit'
				onClick={() => handleEdit(tool)}
				key='edit'
			>
				<EditIcon />
			</button>,
			user && (
				<button
					disabled={user.role?.name !== 'Administrador'}
					className={`table__button table__button--delete ${user?.role?.name !== 'Administrador' ? 'table__button--disabled' : ''}`}
					onClick={() => {
						if (user?.role?.name === 'Administrador') {
							setShowDeletionModalFor(tool.id);
						}
					}}
					key='delete'
				>
					<TrashIcon />
				</button>
			),
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
