import SingleImageChange from '@components/commons/SingleImageChange';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import '@pages/css/createFamily.css';
/**
 * Permite la creación y gestión de categorías asociadas a una familia específica.
 *
 * Este componente muestra una interfaz para añadir nuevas categorías relacionadas con una familia.
 * Incluye un formulario para ingresar el nombre, la descripción y la imagen de cada categoría.
 * Las categorías se pueden eliminar y se muestran sólo aquellas que están en modo de creación.
 *
 * @param {Object} props - Props del componente.
 * @param {string} props.family - El identificador de la familia a la que se asignarán las nuevas categorías.
 *
 * @returns {JSX.Element} - Un componente que muestra un formulario para añadir nuevas categorías y
 *   una lista de categorías en modo de creación, con opciones para actualizar la información y eliminar categorías.
 */
export default function CreateCategoriesWithFamily({
	family,
}: {
	family: string;
}) {
	const {
		categoryInstances,
		addCategoryInstance,
		removeCategoryInstance,
		getCategoryInstance,
		updateCategoryInstance,
	} = useCategoryCreateContext();

	return (
		<div>
			<div>
				<h2>Categorias:</h2>
				<button
					type='button'
					onClick={() => addCategoryInstance(`cat-${Date.now()}`, { family })}
					className='save-button'
				>
					Añadir nueva categoria
				</button>
			</div>

			<ul className='category'>
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
		</div>
	);
}
