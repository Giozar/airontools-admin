import ActionCard from '@components/commons/ActionCard';
import TableComponent from '@components/commons/DynamicTable';
import ProductInfoModal from '@components/products/ProductInfoModal';
import Searchbar from '@components/search/Searchbar';
import EditIcon from '@components/svg/EditIcon';
import EyeIcon from '@components/svg/EyeIcon';
import PDFIcon from '@components/svg/PDFIcon';
import TrashIcon from '@components/svg/TrashIcon';
import { airontoolsAPI } from '@configs/api.config';

import { useAuthContext } from '@contexts/auth/AuthContext';
import { useModal } from '@contexts/Modal/ModalContext';
import useProductManagement from '@hooks/products/useProductManagement';
import useProducts from '@hooks/products/useProducts';
import useDebounce from '@hooks/search/useDebounce';
import { ProductDataFrontend } from '@interfaces/Product.interface';
import '@pages/productPages/ProductMenu.css';
import { useEffect, useState } from 'react';

function ListOfTools() {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] =
		useState<ProductDataFrontend | null>(null);
	const { handleEdit, handleDelete } = useProductManagement();
	const { openModal } = useModal();
	const { user } = useAuthContext();

	const [searchTerm, setSearchTerm] = useState<string>('');
	const { fetchProducts, products } = useProducts();
	const { debouncedFetch } = useDebounce(fetchProducts, 300);

	useEffect(() => {
		debouncedFetch(searchTerm);
	}, [searchTerm, debouncedFetch]);

	const handleOpenModal = (product: ProductDataFrontend) => {
		openModal(
			'Eliminar Producto',
			`Vas a eliminar el producto ${product.name}. ¿Estás seguro de que quieres continuar? `,
			() => {
				handleDelete(product);
			},
			false,
			false,
		);
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
			'PDF',
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
			<a
				key={'pdf'}
				target='_blank'
				href={`${airontoolsAPI}/basic-reports/product/${tool.id}`}
				rel='noreferrer'
			>
				<PDFIcon />
			</a>,
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
							handleOpenModal(tool);
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
			<Searchbar searchValue={searchTerm} onSearchChange={setSearchTerm} />
			<ProductInfoModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				product={selectedProduct}
			/>
			<TableComponent data={tableData} />
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
