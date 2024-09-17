import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import '@pages/css/createFamily.css';
/**
 * Permite crear nuevas subcategorías y asignarles una categoría específica.
 *
 * Este componente muestra un botón para añadir nuevas subcategorías con la categoría especificada.
 * También muestra una lista de subcategorías en modo 'create', permitiendo la edición del nombre,
 * descripción e imagen de cada subcategoría. Las subcategorías se pueden eliminar con un botón.
 *
 * @param {Object} props - Props del componente.
 * @param {string} props.category - La categoría que se le asignará a la nueva subcategoría.
 *
 * @returns {JSX.Element} - Un componente que permite crear nuevas subcategorías con una categoría específica,
 *   y que muestra una lista de subcategorías en modo 'create' con opciones para editar y eliminar.
 */
export default function CreateSubcategoriesWithCategory({
	category,
}: {
	category: string;
}) {
	const {
		subcategoryInstances,
		addSubcategoryInstance,
		removeSubcategoryInstance,
		getSubcategoryInstance,
		updateSubcategoryInstance,
	} = useSubcategoryCreateContext();

	return (
		<div>
			<div>
				<h2>Subcategorias:</h2>
				<button
					type='button'
					onClick={() => {
						addSubcategoryInstance(`subcat-${Date.now()}`, {
							category,
						});
					}}
					className='save-button'
				>
					Añadir nueva Subcategoria
				</button>
			</div>

			<ul className='subcategory'>
				{Object.keys(subcategoryInstances)
					.filter(key => subcategoryInstances[key].category === category)
					.map(key => {
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
