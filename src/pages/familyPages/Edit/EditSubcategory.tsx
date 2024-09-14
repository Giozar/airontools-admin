import Modal from '@components/commons/Modal';
import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import { useEditCategorization } from '@hooks/families/useEditCategorization';
import '@pages/css/createFamily.css';
import { useState } from 'react';

export default function EditSubcategories() {
	const {
		subcategoryInstances,
		removeSubcategoryInstance,
		getSubcategoryInstance,
		updateSubcategoryInstance,
	} = useSubcategoryCreateContext();

	const { handleUpdateSubcategory, handleDeleteSubcategory } =
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
		if (id) handleDeleteSubcategory(id);
		removeSubcategoryInstance(key);
		closeModal();
	};

	return (
		<ul>
			{Object.keys(subcategoryInstances).map(key => {
				const Subcategory = getSubcategoryInstance(key);
				if (!Subcategory) return null;

				return (
					<li key={key}>
						<h2>
							Subcategoría
							<button
								type='button'
								onClick={() => openModal(Subcategory.id, key)}
								className='delete'
							>
								Eliminar subcategoria
							</button>
						</h2>
						<TextInput
							id={'Subcategoria' + key}
							label={'Nombre de Subcategoria:'}
							value={Subcategory.name}
							placeholder={'Subcategoria 1'}
							onChange={e =>
								updateSubcategoryInstance(key, { name: e.target.value })
							}
							required={true}
						/>
						<br />
						<TextAreaInput
							id={'description' + key}
							label={'Descripción de Subcategoria:'}
							value={Subcategory.description}
							placeholder={'Introduce la descripción de la Subcategoria...'}
							onChange={e =>
								updateSubcategoryInstance(key, {
									description: e.target.value,
								})
							}
							rows={6}
						/>

						<SingleImageChange
							title={`Imagen de categoria:`}
							filePreview={
								Subcategory.rawImage
									? URL.createObjectURL(Subcategory.rawImage)
									: !Subcategory.imageToDelete
										? Subcategory.image
										: ''
							}
							setFilePreview={file =>
								updateSubcategoryInstance(key, {
									rawImage: file,
								})
							}
							setFileToDelete={bool =>
								updateSubcategoryInstance(key, {
									imageToDelete: bool,
								})
							}
						/>
						<button
							type='button'
							onClick={() => handleUpdateSubcategory(key)}
							className='add'
						>
							Actualizar Subcategoria
						</button>
						<Modal
							isOpen={isModalOpen}
							onClose={closeModal}
							onConfirm={handleConfirm}
							title='Eliminar Subcategoria'
							content='Vas a eliminar esta Subcategoria. ¿Estás seguro de que quieres continuar?'
							cancelText='Cancelar'
							confirmText='Eliminar'
						/>
					</li>
				);
			})}
		</ul>
	);
}
