import { DynamicInputSection } from '@components/commons/DynamicInputSection';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import ImagesInput from '@components/files/ImagesInput';
import ManualsInput from '@components/files/ManualsInput';
import { ProductCategorization } from '@components/products/ProductCategorization';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import { ProductDataFrontend } from '@interfaces/Product.interface';
import { useEffect } from 'react';
import SpecificationsSection from './SpecificationsSection';

interface ProductFormProps {
	actionName: string;
	action: (e: any) => Promise<void>;
	initialData?: Partial<ProductDataFrontend>; // Datos iniciales opcionales para edición
}

/**
 * Ejecuta una acción al enviar el formulario de producto.
 *
 * @param {string} actionName - Nombre de la acción a ejecutar, por ejemplo, "crear" o "editar".
 * @param {(e: any) => Promise<ProductDataFrontend | undefined>} action - Función asíncrona que se ejecutará al enviar el formulario. Recibe un evento como argumento y devuelve un `ProductDataFrontend` o `undefined`.
 * @param {Partial<ProductDataFrontend>} initalData - Datos del producto para editar (Opcional)
 * @returns {void} No devuelve ningún valor.
 */
const ProductForm = ({ actionName, action, initialData }: ProductFormProps) => {
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
		setFamily,
		category,
		setCategory,
		subcategory,
		setSubcategory,
	} = useProductCreateContext();

	// Use initialData to prefill form values if available
	useEffect(() => {
		if (initialData) {
			setName(initialData.name || '');
			setModel(initialData.model || '');
			setDescription(initialData.description || '');
			setImages(initialData.images || []);
			setManuals(initialData.manuals || []);
			setCharacteristics(initialData.characteristics || []);
			setApplications(initialData.applications || []);
			setRecommendations(initialData.recommendations || []);
			setOperationRequirements(initialData.operationRequirements || []);
			setVideos(initialData.videos || []);
			setIncludedItems(initialData.includedItems || []);
			setOptionalAccessories(initialData.optionalAccessories || []);
			setFamily(initialData.family?._id || '');
			setCategory(initialData.category?._id || '');
			setSubcategory(initialData.subcategory?._id || '');
		}
	}, [initialData]);
	return (
		<div className='createproductform'>
			<form onSubmit={action} className='productform'>
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
				<button type='submit'>{actionName}</button>
			</form>
		</div>
	);
};
export default ProductForm;
