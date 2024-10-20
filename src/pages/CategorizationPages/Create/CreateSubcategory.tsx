import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './createSubcategory.css';

interface CreateSubcategoryProps {
	createButton?: boolean;
	init?: boolean;
}

export default function CreateSubcategories({
	createButton,
	init = false,
}: CreateSubcategoryProps) {
	const {
		subcategoryInstances,
		addSubcategoryInstance,
		removeSubcategoryInstance,
		getSubcategoryInstance,
		updateSubcategoryInstance,
	} = useSubcategoryCreateContext();
	const { handleCreateSubcategory } = useEditCategorization();
	const { categoryId } = useParams();
	const SubcategoryAddedRef = useRef(false);
	const hasSubcategories = Object.values(subcategoryInstances).some(
		Subcategory => Subcategory.mode === 'create',
	);

	useEffect(() => {
		if (
			init &&
			!hasSubcategories &&
			!SubcategoryAddedRef.current &&
			categoryId
		) {
			addSubcategoryInstance(`subcat-${Date.now()}`, {
				category: categoryId,
			});
			SubcategoryAddedRef.current = true; // Marca que se añadió una subcategoría
		}
	}, [init, hasSubcategories, addSubcategoryInstance, categoryId]); // Asegúrate de que `category` esté en las dependencias

	// Asegúrate de manejar el caso donde category es null
	if (!categoryId) return null;

	return (
		<div className='create-subcategories'>
			<h2 className='create-subcategories__title'>Subcategorías:</h2>
			{!hasSubcategories && (
				<button
					type='button'
					onClick={() =>
						addSubcategoryInstance(`subcat-${Date.now()}`, {
							category: categoryId,
						})
					}
					className='create-subcategories__add-button'
				>
					Añadir nueva subcategoría
				</button>
			)}
			{hasSubcategories && (
				<ul className='create-subcategories__list'>
					{Object.keys(subcategoryInstances).map(key => {
						const Subcategory = getSubcategoryInstance(key);
						if (!Subcategory || Subcategory.mode !== 'create') return null;

						return (
							<li key={key} className='create-subcategories__item'>
								<h2 className='create-subcategories__item-header'>
									Nueva subcategoría
								</h2>
								<TextInput
									className='create-subcategories__item-name'
									id={'subcategoria' + key}
									label={'Nombre de subcategoría:'}
									value={Subcategory.name}
									placeholder={'subcategoría 1'}
									onChange={e =>
										updateSubcategoryInstance(key, { name: e.target.value })
									}
									required={true}
								/>
								<br />
								<TextAreaInput
									className='create-subcategories__item-description'
									id={'description' + key}
									label={'Descripción de subcategoría:'}
									value={Subcategory.description}
									placeholder={'Introduce la descripción de la subcategoría...'}
									onChange={e =>
										updateSubcategoryInstance(key, {
											description: e.target.value,
										})
									}
									rows={6}
								/>
								<SingleImageChange
									title={`Imagen de subcategoría:`}
									filePreview={
										Subcategory.rawImage
											? URL.createObjectURL(Subcategory.rawImage)
											: Subcategory.image || ''
									}
									setFilePreview={file =>
										updateSubcategoryInstance(key, { rawImage: file })
									}
								/>
								<div className='create-subcategories__button-group'>
									<button
										type='button'
										onClick={() =>
											addSubcategoryInstance(`subcat-${Date.now()}`, {
												category: categoryId,
											})
										}
										className='create-subcategories__add-button'
									>
										Añadir nueva subcategoría
									</button>
									<button
										type='button'
										onClick={() => removeSubcategoryInstance(key)}
										className='create-subcategories__remove-button'
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
							onClick={handleCreateSubcategory}
							className='create-subcategories__save-button'
						>
							Crear subcategoría(s)
						</button>
					)}
				</ul>
			)}
		</div>
	);
}
