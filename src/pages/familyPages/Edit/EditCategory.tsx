import EditCreateToggle from '@components/commons/EditCreateToggle';
import Modal from '@components/commons/Modal';
import ModalContent from '@components/commons/ModalContent';
import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useEditCategorization } from '@hooks/families/useEditCategorization';
import '@pages/css/createFamily.css';
import { useState } from 'react';
import CreateSubcategoriesWithCategory from '../Create/CreateSubcategory';
import './EditCategory.css';
import EditSubcategories from './EditSubcategory';
/**
 * Muestra y permite la edición de categorías existentes en modo 'edit'.
 *
 * Este componente lista todas las categorías en modo 'edit', permitiendo la actualización del nombre,
 * descripción y imagen de cada categoría. También ofrece la opción de eliminar una categoría, con
 * confirmación a través de un modal. Adicionalmente, muestra subcategorías asociadas a cada categoría
 * y permite crear nuevas subcategorías para cada categoría editada.
 *
 * @returns {JSX.Element} - Un componente que muestra una lista de categorías en modo 'edit' con opciones
 *   para actualizar, eliminar, y gestionar subcategorías relacionadas. Incluye un modal para confirmar
 *   la eliminación de una categoría.
 */
export default function EditCategories() {
	const {
		categoryInstances,
		removeCategoryInstance,
		getCategoryInstance,
		updateCategoryInstance,
	} = useCategoryCreateContext();
	const { handleUpdateCategory, handleDeleteCategory } =
		useEditCategorization();

	const [id, setId] = useState('');
	const [key, setKey] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = (id: string, key: string) => {
		setIsModalOpen(true);
		setId(id);
		setKey(key);
	};
	const closeModal = () => setIsModalOpen(false);

	const handleConfirm = () => {
		if (id) handleDeleteCategory(id);
		removeCategoryInstance(key);
		closeModal();
	};

	const [openSubcategories, setOpenSubcategories] = useState<{
		open: boolean;
		id: string;
	}>({ open: false, id: '' });

	return (
		<>
			<h2 className='category-item__title'>Categorías</h2>

			<ul className='category__container'>
				{Object.keys(categoryInstances).map(key => {
					const category = getCategoryInstance(key);
					if (!category) return null;
					if (category.mode !== 'edit') return null;

					return (
						<li className='category-item' key={key}>
							<div className='category-item__header'>
								<h2 className='category-item__title'>{category.name}</h2>
								<button
									type='button'
									onClick={() => {
										openModal(category.id, key);
									}}
									className='category-item__delete-button'
								>
									Eliminar categoria
								</button>
							</div>
							<div className='category__columns'>
								<div className='category__column-left'>
									<TextInput
										id={'Categoria' + key}
										label={'Nombre de categoria:'}
										value={category.name}
										placeholder={'categoria 1'}
										onChange={e =>
											updateCategoryInstance(key, { name: e.target.value })
										}
										required={true}
										className='category-item__text-input'
										classNameForLabel=''
										classNameForInput='category-item__text-input'
									/>
									<br />
									<TextAreaInput
										id={'description' + key}
										label={'Descripción de categoria:'}
										value={category.description}
										placeholder={'Introduce la descripción de la categoria...'}
										onChange={e =>
											updateCategoryInstance(key, {
												description: e.target.value,
											})
										}
										rows={6}
										className='category-item__text-area-input'
										classNameForLabel=''
										classNameForTextArea=''
									/>
									<button
										type='button'
										onClick={() => handleUpdateCategory(key)}
										className='category-item__update-button'
									>
										Actualizar Categoria
									</button>
								</div>
								<div className='category__column-right'>
									<SingleImageChange
										title={`Imagen de categoria:`}
										filePreview={
											category.rawImage
												? URL.createObjectURL(category.rawImage)
												: !category.imageToDelete
													? category.image
													: ''
										}
										setFilePreview={file =>
											updateCategoryInstance(key, {
												rawImage: file,
											})
										}
										setFileToDelete={bool =>
											updateCategoryInstance(key, {
												imageToDelete: bool,
											})
										}
									/>
								</div>
							</div>

							<button
								type='button'
								className='category-item__edit-button'
								onClick={() =>
									setOpenSubcategories({ open: true, id: category.id })
								}
							>
								Editar subcategorias
							</button>

							<ModalContent
								isOpen={
									openSubcategories.open && openSubcategories.id === category.id
								}
								onClose={() => setOpenSubcategories({ open: false, id: '' })}
								title={`Subcategorías de ${category.name}`}
							>
								<div
									style={{
										overflowY: 'auto',
										maxHeight: '80vh',
									}}
								>
									<EditCreateToggle
										name={'Subcategorías'}
										EditComponent={
											<EditSubcategories desiredCategory={category.id} />
										}
										CreateComponent={
											<CreateSubcategoriesWithCategory category={category.id} />
										}
									/>
								</div>
							</ModalContent>

							<Modal
								isOpen={isModalOpen}
								onClose={closeModal}
								onConfirm={handleConfirm}
								title='Eliminar Categoria'
								content='Vas a eliminar esta Categoria. ¿Estás seguro de que quieres continuar?'
								cancelText='Cancelar'
								confirmText='Eliminar'
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
}
