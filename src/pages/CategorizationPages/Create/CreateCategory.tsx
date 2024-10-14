import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';
import { useEffect, useRef } from 'react';
import './createCategory.css';

interface CreateCategoryProps {
	createButton?: boolean;
	init?: boolean;
}

export default function CreateCategories({
	createButton,
	init = false,
}: CreateCategoryProps) {
	const {
		categoryInstances,
		addCategoryInstance,
		removeCategoryInstance,
		getCategoryInstance,
		updateCategoryInstance,
	} = useCategoryCreateContext();

	const { handleCreateCategory } = useEditCategorization();
	const hasCategories = Object.values(categoryInstances).some(
		category => category.mode === 'create',
	);
	const categoryAddedRef = useRef(false);
	useEffect(() => {
		if (init && !hasCategories && !categoryAddedRef.current) {
			addCategoryInstance(`cat-${Date.now()}`, {});
			categoryAddedRef.current = true;
		}
	}, [init, hasCategories]);

	return (
		<div className='create-categories'>
			<h2 className='create-categories__title'>Categorías:</h2>
			{!hasCategories && (
				<button
					type='button'
					onClick={() => addCategoryInstance(`cat-${Date.now()}`, {})}
					className='create-categories__add-button'
				>
					Añadir nueva categoría
				</button>
			)}
			{hasCategories && (
				<ul className='create-categories__list'>
					{Object.keys(categoryInstances).map(key => {
						const category = getCategoryInstance(key);
						if (!category || category.mode !== 'create') return null;

						return (
							<li key={key} className='create-categories__item'>
								<h2 className='create-categories__item-header'>
									Nueva categoría
								</h2>
								<TextInput
									className='create-categories__item-name'
									id={'Categoria' + key}
									label={'Nombre de categoría:'}
									value={category.name}
									placeholder={'categoría 1'}
									onChange={e =>
										updateCategoryInstance(key, { name: e.target.value })
									}
									required={true}
								/>
								<br />
								<TextAreaInput
									className='create-categories__item-description'
									id={'description' + key}
									label={'Descripción de categoría:'}
									value={category.description}
									placeholder={'Introduce la descripción de la categoría...'}
									onChange={e =>
										updateCategoryInstance(key, { description: e.target.value })
									}
									rows={6}
								/>
								<SingleImageChange
									title={`Imagen de categoría:`}
									filePreview={
										category.rawImage
											? URL.createObjectURL(category.rawImage)
											: category.image || ''
									}
									setFilePreview={file =>
										updateCategoryInstance(key, { rawImage: file })
									}
								/>
								<div className='create-categories__button-group'>
									<button
										type='button'
										onClick={() => addCategoryInstance(`cat-${Date.now()}`, {})}
										className='create-categories__add-button'
									>
										Añadir nueva categoría
									</button>
									<button
										type='button'
										onClick={() => removeCategoryInstance(key)}
										className='create-categories__remove-button'
									>
										Borrar
									</button>
								</div>
							</li>
						);
					})}
					{createButton && (
						<button
							type='button'
							onClick={handleCreateCategory}
							className='create-categories__save-button'
						>
							Crear categoría(s)
						</button>
					)}
				</ul>
			)}
		</div>
	);
}
