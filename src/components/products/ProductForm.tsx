import { DynamicInputSection } from '@components/commons/DynamicInputSection';
import ImageUploader from '@components/commons/ImageUploader';
import ManualUploader from '@components/commons/ManualUploader';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { ProductCategorization } from '@components/products/ProductCategorization';
import { airontoolsAPI } from '@configs/api.config';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import useMultipleFileUpload from '@hooks/files/useMultipleFileUpload';
import { ProductDataFrontend } from '@interfaces/Product.interface';
import axios from 'axios';
import SpecificationsSection from './SpecificationsSection';

interface ProductFormProps {
	actionName: string;
	callback: (e: any) => Promise<ProductDataFrontend | undefined>;
}

/**
 * Ejecuta una acción al enviar el formulario de producto.
 *
 * @param {string} actionName - Nombre de la acción a ejecutar, por ejemplo, "crear" o "editar".
 * @param {(e: any) => Promise<ProductDataFrontend | undefined>} callback - Función asíncrona que se ejecutará al enviar el formulario. Recibe un evento como argumento y devuelve un `ProductDataFrontend` o `undefined`.
 * @returns {void} No devuelve ningún valor.
 */
const ProductForm = ({ actionName, callback }: ProductFormProps) => {
	const {
		name,
		setName,
		model,
		setModel,
		description,
		setDescription,
		// images,
		// setImages,
		// manuals,
		// setManuals,
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
	const { filePreviews, handleFileSelect, handleRemoveFile, handleFileUpload } =
		useMultipleFileUpload();

	const handleImageUpload = async (productId: string) => {
		return await handleFileUpload('images', productId, 'images');
	};

	const handleManualUpload = async (productId: string) => {
		return await handleFileUpload('manuals', productId, 'manuals');
	};
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
						<ImageUploader
							title='Fotos de herramienta'
							filePreviews={filePreviews}
							onFileSelect={handleFileSelect}
							onRemoveFile={handleRemoveFile}
						/>
						<ManualUploader
							title='Manuales de herramienta'
							filePreviews={filePreviews}
							onFileSelect={handleFileSelect}
							onRemoveFile={handleRemoveFile}
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
				<button
					onClick={async e => {
						try {
							const product = await callback(e);
							// Si se creo el producto
							if (product) {
								// Se suben las imágenes
								const uploadedUrlImages = await handleImageUpload(product.id);
								// Se guardan las imágenes dentro del producto
								await axios.patch(airontoolsAPI + '/products/' + product.id, {
									images: uploadedUrlImages,
								});

								// Sesuben los manuales
								const uploadedUrlManuals = await handleManualUpload(product.id);
								// Se guardan los manuales dentro del producto
								await axios.patch(airontoolsAPI + '/products/' + product.id, {
									manuals: uploadedUrlManuals,
								});
							}
						} catch (error) {
							console.error(error);
							// console.log('No se pudo subir la imagen', error);
						}
					}}
				>
					{actionName}
				</button>
			</form>
		</div>
	);
};
export default ProductForm;