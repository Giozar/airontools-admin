import SelectInput from '@components/commons/SelectInput';
import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import { useEffect, useState } from 'react';
import './createSubcategory.css';

export default function CreateSubcategoriesWithSelect() {
	const {
		subcategoryInstances,
		addSubcategoryInstance,
		removeSubcategoryInstance,
		getSubcategoryInstance,
		updateSubcategoryInstance,
	} = useSubcategoryCreateContext();
	const { getAllCategoryInstances } = useCategoryCreateContext();
	const categoryInstances = getAllCategoryInstances();
	const [cat, setCat] = useState('');
	useEffect(() => {}, [cat]);
	const hasSubcategories = Object.values(subcategoryInstances).some(
		Subcategory => Subcategory.mode === 'create',
	);
	return (
		<div className='create-subcategories'>
			<h2 className='create-subcategories__title'>Subcategorías:</h2>
			{!hasSubcategories && (
				<button
					type='button'
					onClick={() => addSubcategoryInstance(`subcat-${Date.now()}`, {})}
					className='create-subcategories__add-button'
				>
					Añadir nueva subcategoría
				</button>
			)}
			<ul className='create-subcategories__list'>
				{Object.keys(subcategoryInstances).map(key => {
					const Subcategory = getSubcategoryInstance(key);
					if (!Subcategory || Subcategory.mode !== 'create') return null;

					return (
						<li key={key} className='create-subcategories__item'>
							<h2 className='create-subcategories__item-header'>
								Nueva subcategoría
							</h2>
							<SelectInput
								id={`select-${key}`}
								name={`Seleccionar Categoria`}
								options={categoryInstances.map(category => ({
									value: category.name,
									label: category.name,
								}))}
								value={Subcategory.category}
								setValue={value => {
									Subcategory.setCategory(value);
									setCat(value);
								}}
							/>
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
										addSubcategoryInstance(`subcat-${Date.now()}`, {})
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
			</ul>
		</div>
	);
}
