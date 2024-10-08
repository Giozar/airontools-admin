import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import { useModal } from '@contexts/Modal/ModalContext';
import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';
import { handleOpenModal } from '../../../handlers/handleOpenModal';
import './EditSubcategories.css';
/**
 * Filtra y muestra las subcategorías del contexto que tienen el modo de edición y pertenecen a la categoría deseada.
 *
 * Esta función obtiene todas las subcategorías del contexto y las filtra para mostrar solo aquellas
 * que tienen el `mode` igual a `'edit'` y pertenecen a la `desiredCategory` especificada. Además, proporciona
 * una interfaz para actualizar o eliminar subcategorías. La eliminación de una subcategoría requiere confirmación
 * a través de un modal.
 *
 * @param {Object} props - Props del componente.
 * @param {string} props.desiredCategory - La categoría por la cual filtrar la lista de subcategorías.
 *
 * @returns {JSX.Element} - Un componente que muestra la lista de subcategorías filtradas junto con la opción
 *   de editar o eliminar cada una. Incluye un modal para confirmar la eliminación de una subcategoría.
 */
export default function EditSubcategories({
	desiredCategory,
}: {
	desiredCategory: string;
}) {
	const {
		subcategoryInstances,
		removeSubcategoryInstance,
		getSubcategoryInstance,
		updateSubcategoryInstance,
	} = useSubcategoryCreateContext();

	const { handleUpdateSubcategory, handleDeleteSubcategory } =
		useEditCategorization();

	const { openModal } = useModal();
	const handleConfirm = (subcategoryId: string, key: string) => {
		handleDeleteSubcategory(subcategoryId);
		removeSubcategoryInstance(key);
	};

	return (
		<>
			<h2 className='subcategory-item__title'>Editar Subcategorías</h2>

			<ul className='subcategory__container'>
				{Object.keys(subcategoryInstances).map(key => {
					const Subcategory = getSubcategoryInstance(key);
					if (!Subcategory) return null;
					if (Subcategory.mode !== 'edit') return null;
					if (Subcategory.category !== desiredCategory) return null;

					return (
						<li key={key} className='subcategory-item'>
							<div className='subcategory-item__header'>
								<h2 className='subcategory-item__title'>{Subcategory.name}</h2>
								<button
									type='button'
									onClick={() =>
										handleOpenModal(
											Subcategory.id || '',
											'Subcategoría',
											() => handleConfirm(Subcategory.id, key),
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
									Eliminar subcategoria
								</button>
							</div>
							<div className='subcategory__columns'>
								<div className='subcategory__column-left'>
									<TextInput
										id={'Subcategoria' + key}
										label={'Nombre de Subcategoria:'}
										value={Subcategory.name}
										placeholder={'Subcategoria 1'}
										onChange={e =>
											updateSubcategoryInstance(key, { name: e.target.value })
										}
										required={true}
										className='subcategory-item__text-input'
									/>
									<TextAreaInput
										id={'description' + key}
										label={'Descripción de Subcategoria:'}
										value={Subcategory.description}
										placeholder={
											'Introduce la descripción de la Subcategoria...'
										}
										onChange={e =>
											updateSubcategoryInstance(key, {
												description: e.target.value,
											})
										}
										className='subcategory-item__text-area-input'
										rows={6}
									/>
									<button
										type='button'
										onClick={() => handleUpdateSubcategory(key)}
										className='subcategory-item__update-button'
									>
										Actualizar Subcategoria
									</button>
								</div>
								<div className='subcategory__column-right'>
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
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</>
	);
}
