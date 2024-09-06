import ImageUploader from '@components/commons/ImageUploader';
import ManualUploader from '@components/commons/ManualUploader';
import { ProductCategorization } from '@components/products/ProductCategorization';
import SpecificationsSection from '@components/products/SpecificationsSection';
import { DynamicInputSection } from './DynamicInputSection';

const ProductForm = () => {
	return (
		<>
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
		</>
	);
};
export default ProductForm;
