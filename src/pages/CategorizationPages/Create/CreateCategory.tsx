import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useEditCategorization } from '@hooks/categorizations/useEditCategorization';
import '@pages/css/createFamily.css';

interface createCategoryprops {
	createButton?: boolean;
}
export default function CreateCategories({
	createButton,
}: createCategoryprops) {
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

	return (
		<div className='category'>
			<div>
				<h2>Categorias:</h2>
				<button
					type='button'
					onClick={() => addCategoryInstance(`cat-${Date.now()}`, {})}
					className='save-button'
				>
					Añadir nueva categoria
				</button>
			</div>
			{createButton && hasCategories && (
				<button type='button' onClick={handleCreateCategory} className='save'>
					Crear categorias
				</button>
			)}
			{hasCategories && (
				<ul className='category__container'>
					{Object.keys(categoryInstances).map(key => {
						const category = getCategoryInstance(key);
						if (!category) return null;
						if (category.mode !== 'create') return null;

						return (
							<li key={key}>
								<h2 className='item-header'>
									Nueva categoría
									<button
										type='button'
										onClick={() => removeCategoryInstance(key)}
										className='cancel-button'
									>
										Borrar
									</button>
								</h2>
								<TextInput
									className='item-name'
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
									className='item-description'
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
											: category.image || ''
									}
									setFilePreview={file =>
										updateCategoryInstance(key, { rawImage: file })
									}
								/>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
