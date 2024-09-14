import Modal from '@components/commons/Modal';
import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useEditCategorization } from '@hooks/families/useEditCategorization';
import '@pages/css/createFamily.css';
import { useState } from 'react';

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

	return (
		<ul>
			{Object.keys(categoryInstances).map(key => {
				const category = getCategoryInstance(key);
				if (!category) return null; // Asegúrate de retornar algo válido

				return (
					<li key={key}>
						<h2>
							Categoría
							<button
								type='button'
								onClick={() => {
									openModal(category.id, key);
								}}
								className='delete'
							>
								Eliminar categoria
							</button>
						</h2>
						<TextInput
							id={'Categoria' + key}
							label={'Nombre de categoria:'}
							value={category.name}
							placeholder={'categoria 1'}
							onChange={e =>
								updateCategoryInstance(key, { name: e.target.value })
							}
							required={true}
						/>
						<br />
						<TextAreaInput
							id={'description' + key}
							label={'Descripción de categoria:'}
							value={category.description}
							placeholder={'Introduce la descripción de la categoria...'}
							onChange={e =>
								updateCategoryInstance(key, { description: e.target.value })
							}
							rows={6}
						/>

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
						<button
							type='button'
							onClick={() => handleUpdateCategory(key)}
							className='add'
						>
							Actualizar Categoria
						</button>

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
	);
}
