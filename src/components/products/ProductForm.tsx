import { DynamicInputSection } from '@components/commons/DynamicInputSection';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import ImagesInput from '@components/files/ImagesInput';
import ManualsInput from '@components/files/ManualsInput';
import { ProductCategorization } from '@components/products/ProductCategorization';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import SpecificationsSection from './SpecificationsSection';

interface ProductFormProps {
	actionName: string;
	action: (e: any) => Promise<void>;
}

/**
 * Ejecuta una acción al enviar el formulario de producto.
 *
 * @param {string} actionName - Nombre de la acción a ejecutar, por ejemplo, "crear" o "editar".
 * @param {(e: any) => Promise<ProductDataFrontend | undefined>} action - Función asíncrona que se ejecutará al enviar el formulario. Recibe un evento como argumento y devuelve un `ProductDataFrontend` o `undefined`.
 * @returns {void} No devuelve ningún valor.
 */
const ProductForm = ({ actionName, action }: ProductFormProps) => {
	const {
		name,
		setName,
		model,
		setModel,
		description,
		setDescription,
		images,
		setImages,
		imagesRaw,
		setImagesRaw,
		manuals,
		setManuals,
		manualsRaw,
		setManualsRaw,
		setCharacteristics,
		setApplications,
		setRecommendations,
		setOperationRequirements,
		setVideos,
		setIncludedItems,
		setOptionalAccessories,
		family,
		category,
		subcategory,
	} = useProductCreateContext();
	return (
		<div className='createproductform'>
			<form className='productform'>
				<div className='form-header'>
					<TextInput
						id='productName'
						label='Nombre de herramienta'
						value={name}
						placeholder='Herramienta 1'
						onChange={e => setName(e.target.value)}
					/>

					<TextInput
						id='productModel'
						label='Modelo de herramienta'
						value={model}
						placeholder='---'
						onChange={e => setModel(e.target.value)}
					/>
				</div>
				<div>
					<TextAreaInput
						id='productDescription'
						label='Descripción de herramienta'
						placeholder='Descripción general de la herramienta'
						value={description}
						onChange={e => setDescription(e.target.value)}
						rows={5}
					/>
				</div>

				<div className='form-content'>
					<div className='left-column'>
						<ProductCategorization />
						<SpecificationsSection
							familyId={family}
							categoryId={category}
							subcategoryId={subcategory}
						/>
						<DynamicInputSection
							label='Características'
							onValuesChange={setCharacteristics}
							placeholder='Carácteristica'
						/>
						<DynamicInputSection
							label='Aplicaciones'
							onValuesChange={setApplications}
							placeholder='Aplicación'
						/>
						<DynamicInputSection
							label='Recomendaciones'
							onValuesChange={setRecommendations}
							placeholder='Recomendación'
						/>
						<DynamicInputSection
							label='Requisitos de operación'
							onValuesChange={setOperationRequirements}
							placeholder='Requisito'
						/>
					</div>

					<div className='right-column'>
						<ImagesInput
							title='Fotos de herramienta'
							files={imagesRaw}
							setFiles={setImagesRaw}
							urls={images}
							setUrls={setImages}
						/>
						<ManualsInput
							title='Manuales de herramienta'
							files={manualsRaw}
							setFiles={setManualsRaw}
							urls={manuals}
							setUrls={setManuals}
						/>
						<DynamicInputSection
							label='Videos'
							onValuesChange={setVideos}
							placeholder='URL de video'
						/>
						<DynamicInputSection
							label='Extras'
							onValuesChange={setIncludedItems}
							placeholder='Incuye...'
						/>
						<DynamicInputSection
							label='Accesorios opcionales'
							onValuesChange={setOptionalAccessories}
							placeholder='Accesorio opcional'
						/>
					</div>
				</div>
				<button onClick={action}>{actionName}</button>
			</form>
		</div>
	);
};
export default ProductForm;
