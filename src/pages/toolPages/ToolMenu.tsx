import {
	ProductBackend,
	ProductFrontend,
	transformProductData,
} from '@adapters/products.adapter';
import ActionCard from '@components/ActionCard';
import DeletionModal from '@components/DeletionModal';
import HeaderTitle from '@components/HeaderTitle';
import EditIcon from '@components/svg/EditIcon';
import EyeIcon from '@components/svg/EyeIcon';
import TrashIcon from '@components/svg/TrashIcon';
import ToolInfoModal from '@components/ToolInfoModal';
import useProductManagement from '@hooks/useProductManagement';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/toolPages/ToolMenu.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ListOfTools() {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] =
		useState<ProductFrontend | null>(null);
	const [products, setProducts] = useState<ProductFrontend[]>([]);
	const {
		showDeletionModalFor,
		setShowDeletionModalFor,
		deletionMessage,
		handleEdit,
		handleCloseModal,
		handleDelete,
	} = useProductManagement();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get<ProductBackend[]>(
					`${import.meta.env.VITE_API_URL}/products`,
				);
				setProducts(response.data.map(transformProductData));
				console.log(response.data);
				console.log(response.data.map(transformProductData));
			} catch (error) {
				console.error('Failed to fetch tools:', error);
			}
		};

		fetchProducts();
	}, []);
	console.log(products);
	const handleCloseModalDeletion = (toolid: string) => {
		setProducts(products.filter(tool => tool.id !== toolid));
		handleCloseModal();
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
			<ul>
				<li className='title'>
					<p>ID</p>
					<p>Nombre</p>
					<p>Modelo</p>
					<p>Familia</p>
					<p>Categoría</p>
					<p>Subcategoría</p>
					<p>Ver</p>
					<p>Editar</p>
					<p>Borrar</p>
				</li>
				{products.map(tool => (
					<li key={tool.id}>
						<p>{tool.id}</p>
						<p>{tool.name}</p>
						<p>{tool.model}</p>
						<p>{tool.familyId}</p>
						<p>{tool.categoryId}</p>
						<p>{tool.subcategoryId || '---'}</p>

						<button
							className='view'
							onClick={() => {
								setSelectedProduct(tool);
								setModalOpen(true);
							}}
						>
							<EyeIcon />
						</button>

						<button className='edit' onClick={() => handleEdit(tool)}>
							<EditIcon />
						</button>

						<button
							className='delete'
							onClick={() => setShowDeletionModalFor(tool.id)}
						>
							<TrashIcon />
						</button>

						{showDeletionModalFor === tool.id && (
							<DeletionModal
								id={tool.id}
								name={tool.name}
								onClose={() => handleCloseModal()}
								onCloseDelete={() => handleCloseModalDeletion(tool.id)}
								onDelete={() => handleDelete(tool.id, tool.name)}
								message={deletionMessage}
							/>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
function ContentMainPage() {
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Herramientas' />
				<div className='options users'>
					<ActionCard
						title='Crear Herramienta'
						path={location.pathname + '/crear-herramienta'}
					/>
				</div>
				<ListOfTools />
			</main>
		</BasePage>
	);
}

function ToolMenu() {
	return <ContentMainPage />;
}

export default ToolMenu;
