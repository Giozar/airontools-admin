import DynamicInputs from '@components/commons/DynamicInputs';
import FormHeader from '@components/commons/form/FormHeader';
import ImageUploader from '@components/commons/ImageUploader';
import ManualUploader from '@components/commons/ManualUploader';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import { ProductCategorization } from '@components/products/ProductCategorization';
import SpecificationsSection from '@components/specifications/SpecificationsSection';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import { ChangeEvent, FormEvent } from 'react';
import Corrector from '../commons/Corrector';
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
	handleFlagChange: (flag: boolean) => void;
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
	handleFlagChange,
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
export default ToolForm;
