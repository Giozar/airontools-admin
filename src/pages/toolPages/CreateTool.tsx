import { AuthContext } from '@apps/App';
import Editables from '@components/Editables';
import ErrorMessage from '@components/ErrorMessage';
import HeaderTitle from '@components/HeaderTitle';
import SuccessMessage from '@components/SuccessMessage';
import TrashIcon from '@components/svg/TrashIcon';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import useCharacteristics from '@hooks/useCharacteristics';
import useMultipleFileUpload from '@hooks/useMultipleFileUpload';
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
	const createdBy = authContext?.user?.name || 'user';
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
	const { specifications, handleInputChange, specValues } = useSpecs({
		catId: categoryId,
	});
	const { videos, addVideo, removeVideo, updateVideo } = useVideos();
	const {
		filePreviews,
		handleFileSelect,
		handleRemoveImage,
		handleFileUpload,
	} = useMultipleFileUpload();

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
			const uploadedUrls = await handleFileUpload();
			const createToolData = {
				name: toolName,
				model: toolModel,
				characteristics: characteristics.map(char => char.value),
				familyId,
				categoryId,
				subcategoryId,
				description: toolDescription,
				specifications: Object.keys(specValues).map(key => ({
					[key]: specValues[key],
				})),
				videos: videos.map(video => video.url),
				imagesUrl: uploadedUrls,
				createdBy,
			};
			await axios.post(
				import.meta.env.VITE_API_URL + '/products',
				createToolData,
			);
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
				{filePreviews.map((preview, index) => (
					<div key={index} className='image-preview'>
						<img
							src={preview}
							alt={`preview-${index}`}
							className='image-placeholder'
						/>
						<button onClick={() => handleRemoveImage(index)} className='delete'>
							<TrashIcon />
						</button>
					</div>
				))}
				<div className='image-placeholder add-image'>
					<label htmlFor='file-input'>Subir imagen +</label>
					<input
						type='file'
						id='file-input'
						multiple
						accept='image/*'
						onChange={handleFileSelect}
						style={{ display: 'none' }}
					/>
				</div>
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

			<div className='selectfamily'>
				<label>Familia:</label>
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
							{specifications.map(spec => (
								<div key={spec.id}>
									<label htmlFor={spec.id}>{spec.name}</label>
									<div className='input-container'>
										<input
											type='text'
											id={spec.id}
											required
											value={specValues[spec.id || ''] || ''}
											onChange={(e: ChangeEvent<HTMLInputElement>) =>
												handleInputChange(spec.id || '', e.target.value)
											}
										/>
										<span>{spec.unit}</span>
									</div>
								</div>
							))}
						</div>
					</>
				)}
			</div>

			<label>Manuales</label>

			<label>Videos</label>
			<div className='file-upload'>
				{videos.map(video => (
					<div key={video.id}>
						<input
							type='text'
							placeholder='Enter video URL'
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
			<button type='submit'>Crear herramienta</button>
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
