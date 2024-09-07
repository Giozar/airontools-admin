import ErrorMessage from '@components/commons/ErrorMessage';
import SuccessMessage from '@components/commons/SuccessMessage';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { ProductCategorization } from '@components/products/ProductCategorization';
import { useProductCreateContext } from '@contexts/product/ProductContext';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { DynamicInputSection } from '../commons/DynamicInputSection';

const ProductForm = () => {
	const {
		name,
		setName,
		model,
		setModel,
		description,
		setDescription,
		images,
		setImages,
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
	} = useProductCreateContext();
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();
	return (
		<div className='createproductform'>
			<form className='productform'>
				{successLog.isSuccess && (
					<SuccessMessage message={successLog.message} />
				)}
				{errorLog.isError && <ErrorMessage message={errorLog.message} />}

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
						{/* <SpecificationsSection
							specifications={specifications}
							specificationValues={specificationValues}
							handleSpecUpdate={handleSpecUpdate}
							handleFlagChange={handleFlagChange}
						/> */}
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
						{/* <ImageUploader
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
						/> */}
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
			</form>
		</div>
	);
};
export default ProductForm;
