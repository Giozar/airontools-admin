import Editables from '@components/Editables';
import ErrorMessage from '@components/ErrorMessage';
import HeaderTitle from '@components/HeaderTitle';
import SuccessMessage from '@components/SuccessMessage';
import TrashIcon from '@components/svg/TrashIcon';
import { AuthContext } from '@contexts/AuthContext';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import useMultipleFileUpload from '@hooks/files/useMultipleFileUpload';
import useCharacteristics from '@hooks/useCharacteristics';
import useSpecs from '@hooks/useSpecs';
import useToolCategorizationEdit from '@hooks/useToolCategorizationEdit';
import useVideos from '@hooks/useVideos';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/toolPages/createtool.css';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';

function ToolForm() {
	const [toolName, setToolName] = useState<string>('Herramienta 1');
	const [toolModel, setToolModel] = useState<string>('');
	const [toolDescription, setToolDescription] = useState<string>('');
	const authContext = useContext(AuthContext);
	const createdBy = authContext?.user?.id || 'user';
	const {
		characteristics,
		addCharacteristic,
		removeCharacteristic,
		updateCharacteristic,
	} = useCharacteristics();
	const {
		families,
		familyId,
		filteredCategories,
		categoryId,
		filteredSubcategories,
		subcategoryId,
		handleFamilyIdUpdate,
		handleCategoryIdUpdate,
		handleSubcategoryIdUpdate,
		familyName,
		categoryName,
		subcategoryName,
	} = useToolCategorizationEdit({
		initialFamilyId: '',
		initialCategoryId: '',
		initialSubcategoryId: '',
	});
	const { specs, specifications, findKeyInSpecs, handleSpecUpdate } = useSpecs({
		catId: categoryId,
	});
	const { videos, addVideo, removeVideo, updateVideo } = useVideos();
	const { filePreviews, handleFileSelect, handleRemoveFile, handleFileUpload } =
		useMultipleFileUpload();

	const handleImageUpload = async (productId: string) => {
		return await handleFileUpload('images', productId, 'images');
	};

	const handleManualUpload = async (productId: string) => {
		return await handleFileUpload('manuals', productId, 'manuals');
	};

	const handleUrlChange = (
		id: number,
		event: ChangeEvent<HTMLInputElement>,
	) => {
		updateVideo(id, event.target.value);
	};
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			console.log(subcategoryId);
			console.log(specs);
			const createToolData = {
				name: toolName,
				model: toolModel,
				characteristics: characteristics.map(char => char.value),
				family: familyId,
				category: categoryId,
				subcategory: subcategoryId,
				description: toolDescription,
				specifications: specs,
				videos: videos.map(video => video.url),
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
		<form className='createtoolform' onSubmit={handleSubmit}>
			{successLog.isSuccess && <SuccessMessage message={successLog.message} />}
			{errorLog.isError && <ErrorMessage message={errorLog.message} />}

			<div className='toolinfo'>
				<div>
					<label htmlFor='toolName'>Nombre de herramienta</label>
					<input
						type='text'
						id='toolName'
						value={toolName}
						onChange={e => setToolName(e.target.value)}
					/>
				</div>

				<div>
					<label htmlFor='toolModel'>Modelo de herramienta</label>
					<input
						type='text'
						id='toolModel'
						placeholder='----'
						value={toolModel}
						onChange={e => setToolModel(e.target.value)}
					/>
				</div>
			</div>

			<label>Fotos de herramienta</label>
			<div className='image-upload'>
				<div className='image-placeholder add-image'>
					<label htmlFor='file-input'>Subir imagen +</label>
					<input
						type='file'
						id='file-input'
						multiple
						accept='image/*'
						onChange={event => handleFileSelect(event, 'images')}
						style={{ display: 'none' }}
					/>
				</div>
				{filePreviews.images?.map((preview, index) => (
					<div key={index} className='image-preview'>
						<img
							src={preview}
							alt={`preview-${index}`}
							className='image-placeholder'
						/>
						<button
							onClick={() => handleRemoveFile('images', index)}
							className='delete'
							type='button'
						>
							<TrashIcon />
						</button>
					</div>
				))}
			</div>

			<label htmlFor='toolDescription'>Descripción de herramienta</label>
			<textarea
				id='toolDescription'
				rows={3}
				placeholder='Descripción general de la herramienta'
				value={toolDescription}
				onChange={e => setToolDescription(e.target.value)}
			/>

			<label>Características</label>
			<div className='characteristics'>
				{characteristics.map(char => (
					<div key={char.id} className='characteristic-item'>
						<input
							type='text'
							placeholder='Característica'
							value={char.value}
							onChange={e => updateCharacteristic(char.id, e.target.value)}
						/>
						<button
							type='button'
							className='delete'
							onClick={() => removeCharacteristic(char.id)}
						>
							<TrashIcon />
						</button>
					</div>
				))}
				<button type='button' className='add' onClick={addCharacteristic}>
					Añadir característica
				</button>
			</div>

			<div className='toolinfo'>
				<div>
					<label>Manuales</label>
					<div className='file-upload'>
						<div className='file-upload'>
							<label htmlFor='manual-input' className='add'>
								Añadir manual
							</label>
							<input
								type='file'
								id='manual-input'
								multiple
								accept='.pdf, .doc, .docx'
								onChange={event => handleFileSelect(event, 'manuals')}
								style={{ display: 'none' }}
							/>
						</div>
						{filePreviews.manuals?.map((preview, index) => (
							<div key={index} className='image-preview'>
								<embed
									src={preview}
									width='250'
									height='200'
									className='image-placeholder'
								/>
								<button
									onClick={() => handleRemoveFile('manuals', index)}
									className='delete'
									type='button'
								>
									<TrashIcon />
								</button>
							</div>
						))}
					</div>
				</div>

				<div>
					<label>Videos</label>
					<div className='file-upload'>
						{videos.map(video => (
							<div key={video.id}>
								<input
									type='text'
									placeholder='URL del video'
									value={video.url}
									onChange={event => handleUrlChange(video.id, event)}
								/>
								{video.url && (
									<a href={video.url} target='_blank' rel='noopener noreferrer'>
										Ver Video
									</a>
								)}
								<button
									type='button'
									onClick={() => removeVideo(video.id)}
									className='delete'
								>
									<TrashIcon />
								</button>
							</div>
						))}
						<button type='button' className='add' onClick={addVideo}>
							Añadir video
						</button>
					</div>
				</div>
			</div>

			<div className='selectfamily'>
				<label>Categorización:</label>
				<Editables
					what='Familia'
					valueOf={familyName}
					type='select'
					onUpdate={handleFamilyIdUpdate}
					list={families.map(item => ({
						id: item.id || 'error',
						name: item.name || 'error',
					}))}
				/>

				<Editables
					what='Categoría'
					valueOf={categoryName}
					type='select'
					onUpdate={handleCategoryIdUpdate}
					list={filteredCategories.map(item => ({
						id: item.id || 'error',
						name: item.name || 'error',
					}))}
				/>

				<Editables
					what='Subcategoría'
					valueOf={subcategoryName}
					type='select'
					onUpdate={handleSubcategoryIdUpdate}
					list={filteredSubcategories.map(item => ({
						id: item.id || 'error',
						name: item.name || 'error',
					}))}
				/>

				{specifications.length > 0 && (
					<>
						<label>Especificaciones</label>
						<div className='specifications'>
							{specifications.map((spec, index) => (
								<div key={spec.id}>
									<label htmlFor={spec.id}>{spec.name}</label>
									<div className='input-container'>
										<input
											type='text'
											id={spec.id}
											required
											value={findKeyInSpecs(spec.id) || ''}
											onChange={e => handleSpecUpdate(e.target.value, index)}
										/>
										<span>{spec.unit}</span>
									</div>
								</div>
							))}
						</div>
						{/* specifications.length > 0 && (
							<>
								<label>Especificaciones</label>
								<div className='specifications'>
									{specifications.map(spec => (
										<div key={spec.id}>
											<label htmlFor={spec.id}>{spec.name}</label>
											<div className='input-container'>
												<input
													type='text'
													id={spec.id}
													required
													value={specValues[spec.id || ''] || ''}
													onChange={e =>
														handleInputChange(spec.id || '', e.target.value)
													}
												/>
												<span>{spec.unit}</span>
											</div>
										</div>
									))}
								</div>
							</>
						) */}
					</>
				)}
			</div>

			<button type='submit' className='save'>
				Crear herramienta
			</button>
		</form>
	);
}

function ContentMainPage() {
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Herramientas' />
				<ToolForm />
			</main>
		</BasePage>
	);
}

function CreateTool() {
	return <ContentMainPage />;
}

export default CreateTool;
