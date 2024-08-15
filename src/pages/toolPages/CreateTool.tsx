import SelectInput from '@components/commons/SelectInput';
import TableRow from '@components/commons/TableRow';

import { AuthContext } from '@contexts/AuthContext';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import useMultipleFileUpload from '@hooks/files/useMultipleFileUpload';

import DynamicInputs from '@components/commons/DynamicInputs';
import ErrorMessage from '@components/commons/ErrorMessage';
import ImageUploader from '@components/commons/ImageUploader';
import ManualUploader from '@components/commons/ManualUploader';
import SuccessMessage from '@components/commons/SuccessMessage';
import TextAreaInput from '@components/commons/TextAreaInput';
import TextInput from '@components/commons/TextInput';
import useToolCategorizationEdit from '@hooks/products/useToolCategorizationEdit';
import useSpecs from '@hooks/specifications/useSpecs';
import BasePage from '@layouts/BasePage';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';
import { FormEvent, useContext, useState } from 'react';
import './createtool.css';

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

	const { specificationValues, specifications, handleSpecUpdate } = useSpecs({
		catId: selectedCategory?.id || '',
	});

	// const { videos, addVideo, removeVideo, updateVideo } = useVideos();
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
			// console.log(subcategoryId);
			console.log(specificationValues);
			const createToolData = {
				name: toolName,
				model: toolModel,
				family: selectedFamily?.id,
				category: selectedCategory?.id,
				subcategory: selectedSubcategory?.id,
				characteristics,
				recommendations,
				requeriments,
				includes,
				accessories,
				description: toolDescription,
				specifications: specificationValues,
				videos,
				createdBy,
			};

			// Paso 1: Crear el producto
			const response = await axios.post(
				import.meta.env.VITE_API_URL + '/products',
				createToolData,
			);
			const productId = response.data._id;
			const createdProduct = response.data;
			console.log(createdProduct);
			// Paso 2: Subir imagenes
			const uploadedUrlImages = await handleImageUpload(productId);
			// Paso 3: Actualizar producto con imagenes
			console.log(uploadedUrlImages);
			await axios.patch(
				import.meta.env.VITE_API_URL + '/products/' + productId,
				{ images: uploadedUrlImages },
			);

			// Paso 4: Subir manuales
			const uploadedUrlManuals = await handleManualUpload(productId);
			// Paso 3: Actualizar producto con manuales
			const productUpladedImages = await axios.patch(
				import.meta.env.VITE_API_URL + '/products/' + productId,
				{ manuals: uploadedUrlManuals },
			);

			console.log(productUpladedImages.data);
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
				<div
					className='form-header'
					style={{ justifyContent: 'flex-end', marginTop: '-50px' }}
				>
					<button
						onClick={handleSubmit}
						style={{ border: '0px' }}
						className='save'
					>
						Crear herramienta
					</button>
				</div>
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

				<div className='form-content'>
					<div className='left-column'>
						<TextAreaInput
							id='toolDescription'
							label='Descripción de herramienta'
							placeholder='Descripción general de la herramienta'
							value={toolDescription}
							onChange={e => setToolDescription(e.target.value)}
							rows={5}
						/>
						<div>
							<hr></hr>
							<SelectInput
								id='familiaselect'
								name='Selecciona una familia'
								options={families.map(family => ({
									value: family.id,
									label: family.name,
								}))}
								value={selectedFamily?.name || ''}
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
									value={selectedCategory?.name || ''}
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
									value={selectedSubcategory?.name || ''}
									onChange={handleSubcategoryChange}
								/>
							)}
							<hr></hr>
							<label htmlFor='spec'>Especificaciones</label>
							<table id='spec'>
								<tbody>
									{specifications.map((spec, index) => (
										<TableRow
											key={spec.id} // Ensure unique key for each row
											label={spec.name}
											unit={spec.unit || ''}
											value={specificationValues[index]?.value || ''} // Adjust this if specificationValues doesn't align with specifications
											onValueChange={newValue =>
												handleSpecUpdate(newValue, index)
											}
										/>
									))}
								</tbody>
							</table>
							<hr></hr>
						</div>
						<DynamicInputs
							label='Características'
							onValuesChange={setChar}
							placeholder='Carácteristica'
						/>
						<hr></hr>
						<DynamicInputs
							label='Recomendaciones'
							onValuesChange={setRecommendations}
							placeholder='Recomendación'
						/>
						<hr></hr>
						<DynamicInputs
							label='Requisitos de operación'
							onValuesChange={setRequeriments}
							placeholder='Requisito'
						/>
						<hr></hr>
					</div>

					<div className='right-column'>
						<ImageUploader
							title='Fotos de herramienta'
							filePreviews={filePreviews}
							onFileSelect={handleFileSelect}
							onRemoveFile={handleRemoveFile}
						/>
						<hr></hr>
						<ManualUploader
							title='Manuales de herramienta'
							filePreviews={filePreviews}
							onFileSelect={handleFileSelect}
							onRemoveFile={handleRemoveFile}
						/>
						<hr></hr>
						<DynamicInputs
							label='Videos'
							onValuesChange={setVideos}
							placeholder='URL de video'
						/>
						<hr></hr>
						<DynamicInputs
							label='Extras'
							onValuesChange={setIncludes}
							placeholder='Incuye...'
						/>
						<hr></hr>
						<DynamicInputs
							label='Accesorios opcionales'
							onValuesChange={setAccessories}
							placeholder='Accesorio opcional'
						/>
						<hr></hr>
					</div>
				</div>
			</form>
		</div>
	);
};
function ContentMainPage() {
	return (
		<BasePage title='Crear herramienta'>
			<Atornillador />
		</BasePage>
	);
}

function CreateTool() {
	return <ContentMainPage />;
}

export default CreateTool;
