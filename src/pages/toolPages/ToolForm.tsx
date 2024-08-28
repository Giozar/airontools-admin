import DynamicInputs from '@components/commons/DynamicInputs';
import FormHeader from '@components/commons/form/FormHeader';
import ImageUploader from '@components/commons/ImageUploader';
import ManualUploader from '@components/commons/ManualUploader';
import QuickCreateSpecification from '@components/commons/QuickCreateSpecification';
import SelectInput from '@components/commons/SelectInput';
import TableRow from '@components/commons/TableRow';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import { ChangeEvent, FormEvent } from 'react';
import Corrector from './corrector';
interface ToolInfoProps {
	toolName: string;
	toolModel: string;
	setToolName: (value: string) => void;
	setToolModel: (value: string) => void;
	toolDescription: string;
	setToolDescription: (value: string) => void;
}

const ToolInfo = ({
	toolName,
	toolModel,
	setToolName,
	setToolModel,
	toolDescription,
	setToolDescription,
}: ToolInfoProps) => {
	return (
		<>
			<div className='form-header'>
				<TextInput
					id='toolName'
					label='Nombre de herramienta'
					value={toolName}
					placeholder='Herramienta 1'
					onChange={e => setToolName(e.target.value)}
				/>

				<TextInput
					id='toolModel'
					label='Modelo de herramienta'
					value={toolModel}
					placeholder='---'
					onChange={e => setToolModel(e.target.value)}
				/>
			</div>
			<div>
				<TextAreaInput
					id='toolDescription'
					label='Descripción de herramienta'
					placeholder='Descripción general de la herramienta'
					value={toolDescription}
					onChange={e => setToolDescription(e.target.value)}
					rows={5}
				/>
				<Corrector textoinicial={toolDescription} />
			</div>
		</>
	);
};
interface ToolCategorizationProps {
	families: { id: string; name: string }[];
	selectedFamily: { id: string; name: string } | null;
	handleFamilyChange: (value: string) => void;
	filteredCategories: { id: string; name: string }[];
	selectedCategory: { id: string; name: string } | null;
	handleCategoryChange: (value: string) => void;
	filteredSubcategories: { id: string; name: string }[];
	selectedSubcategory: { id: string; name: string } | null;
	handleSubcategoryChange: (value: string) => void;
}

const ToolCategorization = ({
	families,
	handleFamilyChange,
	filteredCategories,
	handleCategoryChange,
	filteredSubcategories,
	handleSubcategoryChange,
}: ToolCategorizationProps) => {
	return (
		<>
			<div>
				<SelectInput
					id='familiaselect'
					name='Selecciona una familia'
					options={families.map(family => ({
						value: family.id,
						label: family.name,
					}))}
					onChange={handleFamilyChange}
				/>
				{filteredCategories.length > 0 && (
					<SelectInput
						id='catselect'
						name='Selecciona una categoría'
						options={filteredCategories.map(category => ({
							value: category.id,
							label: category.name,
						}))}
						onChange={handleCategoryChange}
					/>
				)}
				{filteredSubcategories.length > 0 && (
					<SelectInput
						id='subcatselect'
						name='Selecciona una subcategoría'
						options={filteredSubcategories.map(subcategory => ({
							value: subcategory.id,
							label: subcategory.name,
						}))}
						onChange={handleSubcategoryChange}
					/>
				)}
			</div>
		</>
	);
};
interface SpecificationsSectionProps {
	specifications: SpecDataToSend[];
	specificationValues: { specification: string; value: string }[];
	handleSpecUpdate: (newValue: string, index: number) => void;
}

const SpecificationsSection = ({
	specifications,
	specificationValues,
	handleSpecUpdate,
}: SpecificationsSectionProps) => {
	return (
		<>
			{specifications.length > 0 && (
				<div style={{ marginBottom: '100px' }}>
					<label htmlFor='spec'>Especificaciones</label>
					<table id='spec'>
						<tbody>
							{specifications.map((spec, index) => (
								<TableRow
									key={spec._id}
									label={spec.name}
									unit={spec.unit || ''}
									value={specificationValues[index]?.value || ''}
									onValueChange={newValue => handleSpecUpdate(newValue, index)}
								/>
							))}
						</tbody>
					</table>
					<p style={{ marginTop: '20px' }}>Nuevas especificaciones:</p>
					<QuickCreateSpecification
						name={'Especificación'}
						familyId={specifications[0].family}
						categoryId={specifications[0].category}
						subcategoryId={specifications[0].subcategory}
					/>
				</div>
			)}
		</>
	);
};
interface DynamicInputSectionProps {
	label: string;
	onValuesChange: (values: string[]) => void;
	placeholder: string;
}

const DynamicInputSection = ({
	label,
	onValuesChange,
	placeholder,
}: DynamicInputSectionProps) => {
	return (
		<div>
			<DynamicInputs
				label={label}
				onValuesChange={onValuesChange}
				placeholder={placeholder}
			/>
		</div>
	);
};

interface ToolFormProps {
	action: string;
	handleSubmit: (e: FormEvent) => Promise<void>;
	toolName: string;
	setToolName: (value: string) => void;
	toolModel: string;
	setToolModel: (value: string) => void;
	toolDescription: string;
	setToolDescription: (value: string) => void;
	families: { id: string; name: string }[];
	selectedFamily: { id: string; name: string } | null;
	handleFamilyChange: (value: string) => void;
	filteredCategories: { id: string; name: string }[];
	selectedCategory: { id: string; name: string } | null;
	handleCategoryChange: (value: string) => void;
	filteredSubcategories: { id: string; name: string }[];
	selectedSubcategory: { id: string; name: string } | null;
	handleSubcategoryChange: (value: string) => void;
	specifications: SpecDataToSend[];
	specificationValues: { specification: string; value: string }[];
	handleSpecUpdate: (newValue: string, index: number) => void;
	setChar: (chars: string[]) => void;
	setApplications: (applications: string[]) => void;
	setRecommendations: (recommendations: string[]) => void;
	setRequeriments: (requeriments: string[]) => void;
	setVideos: (videos: string[]) => void;
	setIncludes: (includes: string[]) => void;
	setAccessories: (accessories: string[]) => void;
	filePreviews: {
		[key: string]: string[];
	};
	handleFileSelect: (
		event: ChangeEvent<HTMLInputElement>,
		type: string,
	) => void;
	handleRemoveFile: (type: string, index: number) => void;
}

const ToolForm = ({
	action,
	handleSubmit,
	toolName,
	setToolName,
	toolModel,
	setToolModel,
	toolDescription,
	setToolDescription,
	families,
	selectedFamily,
	handleFamilyChange,
	filteredCategories,
	selectedCategory,
	handleCategoryChange,
	filteredSubcategories,
	selectedSubcategory,
	handleSubcategoryChange,
	specifications,
	specificationValues,
	handleSpecUpdate,
	setChar,
	setApplications,
	setRecommendations,
	setRequeriments,
	setVideos,
	setIncludes,
	setAccessories,
	filePreviews,
	handleFileSelect,
	handleRemoveFile,
}: ToolFormProps) => {
	return (
		<>
			<FormHeader action={action} onSubmit={handleSubmit} />
			<ToolInfo
				toolName={toolName}
				toolModel={toolModel}
				setToolName={setToolName}
				setToolModel={setToolModel}
				toolDescription={toolDescription}
				setToolDescription={setToolDescription}
			/>

			<div className='form-content'>
				<div className='left-column'>
					<ToolCategorization
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
export default ToolForm;
