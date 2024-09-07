import ErrorMessage from '@components/commons/ErrorMessage';
import ImageUploader from '@components/commons/ImageUploader';
import ManualUploader from '@components/commons/ManualUploader';
import SuccessMessage from '@components/commons/SuccessMessage';
import TextInput from '@components/commons/TextInput';
import { ProductCategorization } from '@components/products/ProductCategorization';
import SpecificationsSection from '@components/products/SpecificationsSection';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import { DynamicInputSection } from './DynamicInputSection';

const ProductForm = () => {
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
						value={productName}
						placeholder='Herramienta 1'
						onChange={e => setProductName(e.target.value)}
					/>

					<TextInput
						id='productModel'
						label='Modelo de herramienta'
						value={productModel}
						placeholder='---'
						onChange={e => setProductModel(e.target.value)}
					/>
				</div>
				<div>
					<TextAreaInput
						id='productDescription'
						label='Descripción de herramienta'
						placeholder='Descripción general de la herramienta'
						value={productDescription}
						onChange={e => setProductDescription(e.target.value)}
						rows={5}
					/>
				</div>

				<div className='form-content'>
					<div className='left-column'>
						<ProductCategorization
							families={families}
							selectedFamily={selectedFamily}
							handleFamilyChange={handleFamilyChange}
							filteredCategories={filteredCategories}
							selectedCategory={selectedCategory}
							handleCategoryChange={handleCategoryChange}
							filteredSubcategories={filteredSubcategories}
							selectedSubcategory={selectedSubcategory}
							handleSubcategoryChange={handleSubcategoryChange}
						/>
						<SpecificationsSection
							specifications={specifications}
							specificationValues={specificationValues}
							handleSpecUpdate={handleSpecUpdate}
							handleFlagChange={handleFlagChange}
						/>
						<DynamicInputSection
							label='Características'
							onValuesChange={setChar}
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
							onValuesChange={setRequeriments}
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
							onValuesChange={setIncludes}
							placeholder='Incuye...'
						/>
						<DynamicInputSection
							label='Accesorios opcionales'
							onValuesChange={setAccessories}
							placeholder='Accesorio opcional'
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
export default ProductForm;
