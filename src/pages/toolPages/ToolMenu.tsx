import ActionCard from '@components/ActionCard';
import HeaderTitle from '@components/HeaderTitle';
import CloseIcon from '@components/svg/CloseIcon';
import EditIcon from '@components/svg/EditIcon';
import EyeIcon from '@components/svg/EyeIcon';
import TrashIcon from '@components/svg/TrashIcon';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/toolPages/ToolMenu.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Tool {
	_id: string;
	name: string;
	model: string;
	familyId: string;
	categoryId: string;
	subcategoryId?: string;
	description: string;
	characteristics: string[];
	specifications: Array<{ [key: string]: string }>;
	imagesUrl?: string[];
	manuals?: string[];
	videos?: string[];
	createdBy: string;
}

const Modal = ({
	isOpen,
	onClose,
	product,
}: {
	isOpen: boolean;
	onClose: () => void;
	product: Tool | null;
}) => {
	if (!isOpen) return null;

	return (
		<div className='modal-overlay' onClick={onClose}>
			<div className='modal-content'>
				<button className='modal-close' onClick={onClose}>
					<CloseIcon />
				</button>
				{product && (
					<div>
						<h1>{product.name}</h1>
						<p>
							<strong>Modelo:</strong> {product.model}
						</p>
						<p>
							<strong>Family ID:</strong> {product.familyId}
						</p>
						<p>
							<strong>Category ID:</strong> {product.categoryId}
						</p>
						<p>
							<strong>Subcategory ID:</strong> {product.subcategoryId || '---'}
						</p>
						<p>
							<strong>Descripción:</strong> {product.description}
						</p>

						<div style={{ margin: '20px 0' }}>
							<strong>Características:</strong>
							<ul>
								{product.characteristics.map(char => (
									<li key={char}>{char}</li>
								))}
							</ul>
						</div>

						<div style={{ margin: '20px 0' }}>
							<strong>Especificaciones:</strong>
							<ul>
								{product.specifications.length ? (
									product.specifications.map((spec, index) =>
										Object.entries(spec).map(([key, value]) => (
											<li key={key + index}>
												{key}: {value}
											</li>
										)),
									)
								) : (
									<li>No hay especificaciones disponibles</li>
								)}
							</ul>
						</div>

						<p>
							<strong>Creado por:</strong> {product.createdBy}
						</p>
						<button className='edit'>Editar</button>
					</div>
				)}
			</div>
		</div>
	);
};
function ListOfTools() {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Tool | null>(null);

	const handleOpenModal = (product: Tool) => {
		setSelectedProduct(product);
		console.log(product);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};
	const [products, setProducts] = useState<Tool[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get<Tool[]>(
					import.meta.env.VITE_API_URL + '/products',
				);
				setProducts(response.data);
			} catch (error) {
				console.error('Failed to fetch tools:', error);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div className='toollist'>
			<h2 className='listtitle'>Lista de herramientas</h2>
			<input
				type='text'
				placeholder='Buscar herramientas...'
				// value={searchTerm}
				/* onChange={e => {
					handleSearch(e.target.value);
					setSearchTerm(e.target.value);
				}} */
				className='search'
			/>
			<Modal
				isOpen={modalOpen}
				onClose={handleCloseModal}
				product={selectedProduct}
			/>
			<ul>
				<li className='title'>
					<p>Id</p>
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
					<li key={tool._id}>
						<p>{tool._id}</p>
						<p>{tool.name}</p>
						<p>{tool.model}</p>
						<p>{tool.familyId}</p>
						<p>{tool.categoryId}</p>
						<p>{tool.subcategoryId ? tool.subcategoryId : '---'}</p>

						<button
							className='edit' // onClick={() => handleEdit(user)}
							onClick={() => handleOpenModal(tool)}
						>
							<EyeIcon />
						</button>
						<button
							className='edit' // onClick={() => handleEdit(user)}
						>
							<EditIcon />
						</button>

						<button
							className='delete'
							//	onClick={() => setShowDeletionModalFor(user.id || '')}
						>
							<TrashIcon />
						</button>
						{/* 
						{showDeletionModalFor === user.id && (
							<DeletionModal
								id={user.id}
								name={user.name}
								image={user.imageUrl || ''}
								onClose={() => handleCloseModal()}
								onCloseDelete={() => handleCloseModalDeletion(user.id || '')}
								onDelete={() => handleDelete(user.id || '', user.name)}
								message={deletionMessage}
							/>
						)}
						{showModalFor === user.id && (
							<RoleChangeModal
								userToEdit={user}
								onCloseModal={() => setShowModalFor(null)}
								onUpdateList={handleUpdateList}
							/>
						)}
                            */}
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
