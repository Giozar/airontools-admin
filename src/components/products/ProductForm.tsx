import DynamicInputs from '@components/commons/DynamicInputs';
import SelectInput from '@components/commons/SelectInput';
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
 * @param {Partial<ProductDataFrontend>} initalData - Datos del producto para editar (Opcional)
 * @returns {void} No devuelve ningún valor.
 */

const ProductForm = ({ actionName, action, initialData }: ProductFormProps) => {
	const {
		setId,
		name,
		setName,
		model,
		setModel,
		brand,
		setBrand,
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
		characteristics,
		setCharacteristics,
		applications,
		setApplications,
		recommendations,
		setRecommendations,
		operationRequirements,
		setOperationRequirements,
		videos,
		setVideos,
		includedItems,
		setIncludedItems,
		optionalAccessories,
		setOptionalAccessories,
		setFamily,
		setCategory,
		setSubcategory,
		setSpecifications,
		setCreatedBy,
		imagesRemoved,
		setImagesRemoved,
		manualsRemoved,
		setManualsRemoved,
	} = useProductCreateContext();

	// Use initialData to prefill form values if available
	useEffect(() => {
		if (initialData) {
			setId(initialData.id || '');
			setName(initialData.name || '');
			setModel(initialData.model || '');
			setBrand(initialData.brand || '');
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
			setSpecifications(
				initialData.specifications?.map(specProd => ({
					specification: specProd.specification._id || '',
					value: specProd.value,
				})) || [],
			);
			setCategory(initialData.category?._id || '');
			setSubcategory(initialData.subcategory?._id || '');
			setCreatedBy(initialData.createdBy?.id || '');
			setBrand(initialData.brand || 'Airon Tools');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialData]);

	// Por defecto siempre la marca será Airon Tools
	useEffect(() => {
		setBrand('Airon Tools');
	}, []);

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
						placeholder='H-1'
						onChange={e => setModel(e.target.value)}
					/>
					<SelectInput
						id='marca'
						options={[
							{ value: 'Airon Tools', label: 'Airon Tools' },
							{ value: 'Airex', label: 'Airex' },
						]}
						value={brand}
						setValue={setBrand}
						key={'Marca-herramienta'}
						name='Marca de la herramienta'
						defaultOptionIndex={0}
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
						<SpecificationsSection />
						<DynamicInputs
							label='Características'
							setValues={setCharacteristics}
							placeholder='Carácteristica'
							values={characteristics}
						/>
						<DynamicInputs
							label='Aplicaciones'
							setValues={setApplications}
							placeholder='Aplicación'
							values={applications}
						/>
						<DynamicInputs
							label='Recomendaciones'
							setValues={setRecommendations}
							placeholder='Recomendación'
							values={recommendations}
						/>
						<DynamicInputs
							label='Requisitos de operación'
							setValues={setOperationRequirements}
							placeholder='Requisito'
							values={operationRequirements}
						/>
					</div>

					<div className='right-column'>
						<ImagesInput
							title='Fotos de herramienta'
							files={imagesRaw}
							setFiles={setImagesRaw}
							urls={images}
							setUrls={setImages}
							urlsRemoved={imagesRemoved}
							setUrlsRemoved={setImagesRemoved}
						/>
						<ManualsInput
							title='Manuales de herramienta'
							files={manualsRaw}
							setFiles={setManualsRaw}
							urls={manuals}
							setUrls={setManuals}
							urlsRemoved={manualsRemoved}
							setUrlsRemoved={setManualsRemoved}
						/>
						<DynamicInputs
							label='Videos'
							setValues={setVideos}
							placeholder='URL de video'
							values={videos}
						/>
						<DynamicInputs
							label='Artículos incluidos'
							setValues={setIncludedItems}
							placeholder='Incuye...'
							values={includedItems}
						/>
						<DynamicInputs
							label='Accesorios opcionales'
							setValues={setOptionalAccessories}
							placeholder='Accesorio opcional'
							values={optionalAccessories}
						/>
					</div>
				</div>
				<button type='submit'>{actionName}</button>
			</form>
		</div>
	);
};
export default ProductForm;
