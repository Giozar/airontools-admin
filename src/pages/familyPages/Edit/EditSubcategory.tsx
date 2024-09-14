import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import { useEditCategorization } from '@hooks/families/useEditCategorization';
import '@pages/css/createFamily.css';

export default function EditSubcategories() {
	const {
		subcategoryInstances,
		removeSubcategoryInstance,
		getSubcategoryInstance,
		updateSubcategoryInstance,
	} = useSubcategoryCreateContext();

	const { handleUpdateSubcategory } = useEditCategorization();
	return (
		<div>
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
									onClick={() => removeSubcategoryInstance(key)}
									className='delete'
								>
									Borrar
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
						</li>
					);
				})}
			</ul>
		</div>
	);
}
