import { AuthContext } from '@apps/App';
import HeaderTitle from '@components/HeaderTitle';
import TrashIcon from '@components/svg/TrashIcon';
import useSpecs from '@hooks/useSpecs';
import useVideos from '@hooks/useVideos';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/toolPages/createtool.css';
import uploadFile from '@services/fileUpload/fileUpload.service';
import axios from 'axios';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';

interface Item {
	id: number;
	value: string;
}
/* no hace nada por ahora useManuals en un futuro */
function Manuals() {
	const [manuals, setManuals] = useState<Item[]>([
		{ id: Date.now(), value: '...ejemplo.pdf' },
	]);
	const addManual = () => {
		setManuals([...manuals, { id: Date.now(), value: '' }]);
	};

	const removeManual = (id: number) => {
		setManuals(manuals.filter(item => item.id !== id));
	};

	const updateManual = (id: number, value: string) => {
		setManuals(
			manuals.map(item => (item.id === id ? { ...item, value } : item)),
		);
	};
	return (
		<div className='file-upload'>
			{manuals.map(manual => (
				<div key={manual.id} className='manual-item'>
					<input type='text' value={manual.value} readOnly />
					<button type='button' onClick={() => updateManual(manual.id, '')}>
						Subir manual
					</button>
					<button
						type='button'
						className='delete'
						onClick={() => removeManual(manual.id)}
					>
						<TrashIcon />
					</button>
				</div>
			))}
			<button type='button' className='add' onClick={addManual}>
				Añadir manual
			</button>
		</div>
	);
}

const useCharacteristics = () => {
	const [characteristics, setCharacteristics] = useState<Item[]>([
		{ id: Date.now(), value: '' },
	]);
	const addCharacteristic = () => {
		setCharacteristics([...characteristics, { id: Date.now(), value: '' }]);
	};

	const removeCharacteristic = (id: number) => {
		setCharacteristics(characteristics.filter(item => item.id !== id));
	};

	const updateCharacteristic = (id: number, value: string) => {
		setCharacteristics(
			characteristics.map(item => (item.id === id ? { ...item, value } : item)),
		);
	};

	return {
		characteristics,
		addCharacteristic,
		removeCharacteristic,
		updateCharacteristic,
	};
};

const useMultipleFileUpload = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [filePreviews, setFilePreviews] = useState<string[]>([]);
	const [fileNames, setFileNames] = useState<string[]>([]);
	const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]); // New state for uploaded file URLs

	// Handle file selection
	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const selectedFiles = Array.from(event.target.files);

			// Generate previews and set state
			const previews = selectedFiles.map(file => URL.createObjectURL(file));
			const names = selectedFiles.map(file => file.name);

			setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
			setFilePreviews(prevPreviews => [...prevPreviews, ...previews]);
			setFileNames(prevNames => [...prevNames, ...names]);
		}
	};

	// Handle image removal
	const handleRemoveImage = (index: number) => {
		setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
		setFilePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
		setFileNames(prevNames => prevNames.filter((_, i) => i !== index));
	};

	// Handle file uploads
	const handleFileUpload = async () => {
		const urls: string[] = [];
		for (const file of files) {
			try {
				const url = await uploadFile(file);
				urls.push(url);
			} catch (error) {
				console.error('Failed to upload file:', file.name, error);
			}
		}
		setUploadedFileUrls(urls);
		console.log(urls);
		return urls;
	};

	return {
		files,
		filePreviews,
		fileNames,
		uploadedFileUrls,
		handleFileSelect,
		handleRemoveImage,
		handleFileUpload,
	};
};

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
			// Send the form data
			await axios.post(
				import.meta.env.VITE_API_URL + '/products',
				createToolData,
			);
			console.log('Tool created successfully!');
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
			<Manuals />

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
