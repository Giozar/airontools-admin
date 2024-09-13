import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import '@pages/css/createFamily.css';

export default function EditSubcategories() {
	const {
		subcategoryInstances,
		addSubcategoryInstance,
		removeSubcategoryInstance,
		getSubcategoryInstance,
		updateSubcategoryInstance,
	} = useSubcategoryCreateContext();

	return (
		<div>
			<button
				type='button'
				onClick={() => addSubcategoryInstance(`subcat-${Date.now()}`)}
				className='add'
			>
				Añadir nueva Subcategoria
			</button>
			<ul>
				{Object.keys(subcategoryInstances).map(key => {
					const Subcategory = getSubcategoryInstance(key);
					if (!Subcategory) return null;

					return (
						<li key={key}>
							<h2>Subcategorías</h2>
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
							<button
								type='button'
								onClick={() => removeSubcategoryInstance(key)}
								className='delete'
							>
								Borrar
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
