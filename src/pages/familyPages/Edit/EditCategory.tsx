import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useEditCategorization } from '@hooks/families/useEditCategorization';
import '@pages/css/createFamily.css';

export default function EditCategories() {
	const {
		categoryInstances,
		removeCategoryInstance,
		getCategoryInstance,
		updateCategoryInstance,
	} = useCategoryCreateContext();
	const { handleUpdateCategory } = useEditCategorization();
	return (
		<div>
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
									onClick={() => removeCategoryInstance(key)}
									className='delete'
								>
									Borrar
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
										: category.image || ''
								}
								setFilePreview={file =>
									updateCategoryInstance(key, { rawImage: file })
								}
							/>
							<button
								type='button'
								onClick={() => handleUpdateCategory(key)}
								className='add'
							>
								Actualizar Categoria
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
