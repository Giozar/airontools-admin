import { AuthContext } from '@apps/App';
import HeaderTitle from '@components/HeaderTitle';
import TrashIcon from '@components/svg/TrashIcon';
import useCharacteristics from '@hooks/useCharacteristics';
import useMultipleFileUpload from '@hooks/useMultipleFileUpload';
import useSpecs from '@hooks/useSpecs';
import useVideos from '@hooks/useVideos';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/toolPages/createtool.css';
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
		filteredCategories,
		filteredSubcategories,
		selectedFamilyId,
		selectedCategoryId,
		selectedSubcategoryId,
		filteredSpecifications,
		specValues,
		handleFamilyChange,
		handleCategoryChange,
		handleSubcategoryChange,
		handleInputChange,
	} = useSpecs();
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

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const uploadedUrls = await handleFileUpload();
			console.log(uploadedUrls);
			const createToolData = {
				name: toolName,
				model: toolModel,
				characteristics: characteristics.map(char => char.value),
				familyId: selectedFamilyId,
				categoryId: selectedCategoryId,
				subcategoryId: selectedSubcategoryId,
				description: toolDescription,
				specifications: Object.keys(specValues).map(key => ({
					[key]: specValues[key],
				})),
				videos: videos.map(video => video.url),
				imagesUrl: uploadedUrls,
				createdBy,
			};
			console.log(createToolData);
			await axios.post(
				import.meta.env.VITE_API_URL + '/products',
				createToolData,
			);
			alert('Herramienta creada con exito!');
		} catch (error) {
			console.error('Error creating tool:', error);
		}
	};

	return (
		<form className='createtoolform' onSubmit={handleSubmit}>
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
				<select onChange={handleFamilyChange}>
					<option value=''>Selecciona una familia</option>
					{families.map(family => (
						<option key={family.id} value={family.id}>
							{family.name}
						</option>
					))}
				</select>

				{filteredCategories.length > 0 && selectedFamilyId && (
					<>
						<label>Categorías:</label>
						<select onChange={handleCategoryChange}>
							<option value=''>Selecciona una categoría</option>
							{filteredCategories.map(category => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</>
				)}

				{filteredSubcategories.length > 0 &&
					selectedFamilyId &&
					selectedCategoryId && (
						<>
							<label>Subcategorías:</label>
							<select onChange={handleSubcategoryChange}>
								<option value=''>Selecciona una subcategoría</option>
								{filteredSubcategories.map(subcategory => (
									<option key={subcategory.id} value={subcategory.id}>
										{subcategory.name}
									</option>
								))}
							</select>
						</>
					)}

				{filteredSpecifications.length > 0 && (
					<>
						<label>Especificaciones</label>
						<div className='specifications'>
							{filteredSpecifications.map(spec => (
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
