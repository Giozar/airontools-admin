import '@components/categorizations/css/EditSubcategories.css';
import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import { useModal } from '@contexts/Modal/ModalContext';
import { handleOpenModal } from '@handlers/handleOpenModal';
import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * Componente que permite la edición de una subcategoría específica
 * recuperando la clave de localStorage.
 *
 * @returns {JSX.Element} - Componente que muestra la subcategoría editada.
 */
export default function EditSubcategory() {
	const {
		removeSubcategoryInstance,
		getSubcategoryInstance,
		updateSubcategoryInstance,
	} = useSubcategoryCreateContext();

	const { handleUpdateSubcategory, handleDeleteSubcategory } =
		useEditCategorization();

	const { openModal } = useModal();
	const { subcategoryId } = useParams();
	const navigate = useNavigate();

	const handleConfirm = (subcategoryId: string) => {
		handleDeleteSubcategory(subcategoryId);
		if (subcategoryId) {
			removeSubcategoryInstance(subcategoryId);
			navigate(-1);
		}
	};

	if (!subcategoryId) return null;

	const subcategory = getSubcategoryInstance(subcategoryId);
	if (!subcategory || subcategory.mode !== 'edit') return null;

	return (
		<>
			<li key={subcategoryId} className='subcategory-item'>
				<div className='subcategory-item__header'>
					<h2 className='subcategory-item__title'>
						Subcategoría: {subcategory.name}
					</h2>
				</div>
				<div className='subcategory__columns'>
					<div className='subcategory__column-left'>
						<TextInput
							id={`Subcategoria${subcategoryId}`}
							label='Nombre de Subcategoría:'
							value={subcategory.name}
							placeholder='Subcategoría 1'
							onChange={e =>
								updateSubcategoryInstance(subcategoryId, {
									name: e.target.value,
								})
							}
							required
							className='subcategory-item__text-input'
						/>
						<TextAreaInput
							id={`description${subcategoryId}`}
							label='Descripción de Subcategoría:'
							value={subcategory.description}
							placeholder='Introduce la descripción de la subcategoría...'
							onChange={e =>
								updateSubcategoryInstance(subcategoryId, {
									description: e.target.value,
								})
							}
							className='subcategory-item__text-area-input'
							rows={6}
						/>
					</div>
					<div className='subcategory__column-right'>
						<SingleImageChange
							title='Imagen de subcategoría:'
							filePreview={
								subcategory.rawImage
									? URL.createObjectURL(subcategory.rawImage)
									: !subcategory.imageToDelete
										? subcategory.image
										: ''
							}
							setFilePreview={file =>
								updateSubcategoryInstance(subcategoryId, { rawImage: file })
							}
							setFileToDelete={bool =>
								updateSubcategoryInstance(subcategoryId, {
									imageToDelete: bool,
								})
							}
						/>
					</div>
				</div>
				<div className='subcategory__footer'>
					<button
						type='button'
						onClick={() => handleUpdateSubcategory(subcategoryId)}
						className='subcategory-item__update-button'
					>
						Actualizar Subcategoría
					</button>
					<button
						type='button'
						onClick={() =>
							handleOpenModal(
								subcategory.id || '',
								'Subcategoría',
								() => handleConfirm(subcategory.id),
								openModal,
								false,
								false,
								true,
								true,
								'bySubcategory',
							)
						}
						className='subcategory-item__delete-button'
					>
						Eliminar subcategoría
					</button>
				</div>
			</li>
		</>
	);
}
