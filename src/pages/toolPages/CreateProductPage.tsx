import { AuthContext } from '@contexts/AuthContext';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import useMultipleFileUpload from '@hooks/files/useMultipleFileUpload';

import ErrorMessage from '@components/commons/ErrorMessage';
import SuccessMessage from '@components/commons/SuccessMessage';
import { airontoolsAPI } from '@configs/api.config';
import useToolCategorizationEdit from '@hooks/products/useToolCategorizationEdit';
import { cleanArray } from '@utils/cleanArray.util';
import { errorHandler } from '@utils/errorHandler.util';
import { filterEmptySpecifications } from '@utils/filterEmptySpecifications.util';
import axios from 'axios';
import { FormEvent, useContext, useState } from 'react';
import ToolForm from '../../components/products/ProductForm';
import './CreateProductPage.css';

const Atornillador = () => {
	const [toolName, setToolName] = useState<string>('');
	const [toolModel, setToolModel] = useState<string>('');
	const [toolDescription, setToolDescription] = useState<string>('');
	const authContext = useContext(AuthContext);
	const createdBy = authContext?.user?.id || 'user';
	const [characteristics, setChar] = useState<string[]>([]);
	const [recommendations, setRecommendations] = useState<string[]>([]);
	const [requeriments, setRequeriments] = useState<string[]>([]);
	const [includes, setIncludes] = useState<string[]>([]);
	const [accessories, setAccessories] = useState<string[]>([]);

	const [applications, setApplications] = useState<string[]>([]);
	const [videos, setVideos] = useState<string[]>([]);
	const {
		families,
		selectedFamily,
		selectedCategory,
		selectedSubcategory,
		filteredCategories,
		filteredSubcategories,
		handleFamilyChange,
		handleCategoryChange,
		handleSubcategoryChange,
	} = useToolCategorizationEdit();

	const { filePreviews, handleFileSelect, handleRemoveFile, handleFileUpload } =
		useMultipleFileUpload();

	const handleImageUpload = async (productId: string) => {
		return await handleFileUpload('images', productId, 'images');
	};

	const handleManualUpload = async (productId: string) => {
		return await handleFileUpload('manuals', productId, 'manuals');
	};

	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const createToolData = {
				name: toolName,
				model: toolModel,
				family: selectedFamily?.id,
				category: selectedCategory?.id,
				subcategory: selectedSubcategory?.id,
				description: toolDescription,
				characteristics: cleanArray(characteristics),
				includedItems: cleanArray(includes),
				optionalAccessories: cleanArray(accessories),
				operationRequirements: cleanArray(requeriments),
				applications: cleanArray(applications),
				recommendations: cleanArray(recommendations),
				specifications: filterEmptySpecifications(specificationValues),
				videos: cleanArray(videos),
				createdBy,
			};
			//console.log(createToolData);
			//console.log(createToolData.specifications);

			// Paso 1: Crear el producto
			const response = await axios.post(
				airontoolsAPI + '/products',
				createToolData,
			);
			const productId = response.data._id;
			const createdProduct = response.data;
			console.log(createdProduct);
			// Paso 2: Subir imagenes
			const uploadedUrlImages = await handleImageUpload(productId);
			// Paso 3: Actualizar producto con imagenes
			console.log(uploadedUrlImages);
			await axios.patch(airontoolsAPI + '/products/' + productId, {
				images: uploadedUrlImages,
			});

			// Paso 4: Subir manuales
			const uploadedUrlManuals = await handleManualUpload(productId);
			// Paso 3: Actualizar producto con manuales
			const productUploadedImages = await axios.patch(
				airontoolsAPI + '/products/' + productId,
				{ manuals: uploadedUrlManuals },
			);

			console.log(productUploadedImages.data);
			/* falta decir si fallo alguna subida de imagenes o manuales... */
			showSuccess('Herramienta creada con éxito');
		} catch (error) {
			errorHandler(error, showError);
		}
	};
	return (
		<div className='createtoolform'>
			<form className='toolform' onSubmit={handleSubmit}>
				{successLog.isSuccess && (
					<SuccessMessage message={successLog.message} />
				)}

				{errorLog.isError && <ErrorMessage message={errorLog.message} />}
				<ToolForm
					action='Crear herramienta'
					handleSubmit={handleSubmit}
					toolName={toolName}
					setToolName={setToolName}
					toolModel={toolModel}
					setToolModel={setToolModel}
					toolDescription={toolDescription}
					setToolDescription={setToolDescription}
					families={families}
					selectedFamily={selectedFamily || null}
					handleFamilyChange={handleFamilyChange}
					filteredCategories={filteredCategories}
					selectedCategory={selectedCategory || null}
					handleCategoryChange={handleCategoryChange}
					filteredSubcategories={filteredSubcategories}
					selectedSubcategory={selectedSubcategory || null}
					handleSubcategoryChange={handleSubcategoryChange}
					setChar={setChar}
					setApplications={setApplications}
					setRecommendations={setRecommendations}
					setRequeriments={setRequeriments}
					setVideos={setVideos}
					setIncludes={setIncludes}
					setAccessories={setAccessories}
					filePreviews={filePreviews}
					handleFileSelect={handleFileSelect}
					handleRemoveFile={handleRemoveFile}
					handleFlagChange={handleFlagChange}
				/>
			</form>
		</div>
	);
};

export default function CreateTool() {
	return <Atornillador />;
}
