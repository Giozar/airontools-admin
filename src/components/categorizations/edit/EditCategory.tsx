import '@components/categorizations/css/EditCategories.css';
import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useModal } from '@contexts/Modal/ModalContext';
import { handleOpenModal } from '@handlers/handleOpenModal';
import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';
import { useEffect, useState } from 'react';

export default function EditCategory() {
	const {
		removeCategoryInstance,
		getCategoryInstance,
		updateCategoryInstance,
	} = useCategoryCreateContext();
	const { handleUpdateCategory, handleDeleteCategory } =
		useEditCategorization();
	const { openModal } = useModal();
	const [categoryKey, setCategoryKey] = useState<string | null>(null);

	useEffect(() => {
		const storedKey = localStorage.getItem('categoryToEdit');
		setCategoryKey(storedKey);
	}, []);

	const handleConfirm = (categoryId: string) => {
		handleDeleteCategory(categoryId);
		if (categoryKey) {
			removeCategoryInstance(categoryKey);
		}
	};

	if (!categoryKey) return null;

	const category = getCategoryInstance(categoryKey);
	if (!category || category.mode !== 'edit') return null;

	return (
		<>
			<li className='category-item' key={categoryKey}>
				<div className='category-item__header'>
					<h2 className='category-item__title'>Categoría: {category.name}</h2>
				</div>
				<div className='category__columns'>
					<div className='category__column-left'>
						<TextInput
							id={`Categoria${categoryKey}`}
							label='Nombre de categoría:'
							value={category.name}
							placeholder='categoria 1'
							onChange={e =>
								updateCategoryInstance(categoryKey, { name: e.target.value })
							}
							required
							className='category-item__text-input'
						/>
						<br />
						<TextAreaInput
							id={`description${categoryKey}`}
							label='Descripción de categoría:'
							value={category.description}
							placeholder='Introduce la descripción de la categoría...'
							onChange={e =>
								updateCategoryInstance(categoryKey, {
									description: e.target.value,
								})
							}
							rows={6}
							className='category-item__text-area-input'
						/>
					</div>
					<div className='category__column-right'>
						<SingleImageChange
							title='Imagen de categoría:'
							filePreview={
								category.rawImage
									? URL.createObjectURL(category.rawImage)
									: !category.imageToDelete
										? category.image
										: ''
							}
							setFilePreview={file =>
								updateCategoryInstance(categoryKey, { rawImage: file })
							}
							setFileToDelete={bool =>
								updateCategoryInstance(categoryKey, { imageToDelete: bool })
							}
						/>
					</div>
				</div>
				<div className='category__footer'>
					<button
						type='button'
						onClick={() => handleUpdateCategory(categoryKey)}
						className='category-item__update-button'
					>
						Actualizar Categoría
					</button>
					<button
						type='button'
						onClick={() => {
							handleOpenModal(
								category.id || '',
								'Categoría',
								() => handleConfirm(category.id),
								openModal,
								false,
								true,
								true,
								true,
								'byCategory',
							);
						}}
						className='category-item__delete-button'
					>
						Eliminar categoría
					</button>
				</div>
			</li>
		</>
	);
}
