import SelectInput from '@components/commons/SelectInput';
import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import '@pages/css/createFamily.css';

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

	return (
		<div>
			<div>
				<h2>Subcategorias:</h2>
				<button
					type='button'
					onClick={() => addSubcategoryInstance(`subcat-${Date.now()}`, {})}
					className='save-button'
				>
					Añadir nueva Subcategoria
				</button>
			</div>

			<ul className='subcategory'>
				{Object.keys(subcategoryInstances).map(key => {
					const Subcategory = getSubcategoryInstance(key);
					if (!Subcategory) return null;
					if (Subcategory.mode !== 'create') return null;

					return (
						<li key={key}>
							<h2 className='item-header'>
								Nueva Subcategoría
								<button
									type='button'
									onClick={() => removeSubcategoryInstance(key)}
									className='cancel-button'
								>
									Borrar
								</button>
							</h2>
							<SelectInput
								id={`select-${key}`}
								name={`Seleccionar Categoria`}
								options={categoryInstances.map(category => ({
									value: category.name,
									label: category.name,
								}))}
								setValue={value => Subcategory.setCategory(value)}
							/>
							<TextInput
								className='item-name'
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
								className='item-description'
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
								title={`Imagen de Subcategoria:`}
								filePreview={
									Subcategory.rawImage
										? URL.createObjectURL(Subcategory.rawImage)
										: Subcategory.image || ''
								}
								setFilePreview={file =>
									updateSubcategoryInstance(key, { rawImage: file })
								}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
