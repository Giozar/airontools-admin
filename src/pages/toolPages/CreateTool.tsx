import DynamicInputs from '@components/DynamicInputs';
import ErrorMessage from '@components/ErrorMessage';
import HeaderTitle from '@components/HeaderTitle';
import SuccessMessage from '@components/SuccessMessage';
import TrashIcon from '@components/svg/TrashIcon';
import { AuthContext } from '@contexts/AuthContext';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import useCharacteristics from '@hooks/useCharacteristics';
import useMultipleFileUpload from '@hooks/useMultipleFileUpload';
import useSpecs from '@hooks/useSpecs';
import useToolCategorizationEdit from '@hooks/useToolCategorizationEdit';
import useVideos from '@hooks/useVideos';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import './createtool.css';
/*
const Atornillador = () => {
	const [activeTab, setActiveTab] = useState('caracteristicas');

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<div className='Atorcontainer'>
			<div>
				<div className='product-header'>
					<h2>AIRON TOOLS</h2>
					<h1>ATORNILLADOR TIPO PISTOLA DE CLUTCH POSITIVO</h1>
				</div>
			</div>
			<div className='content'>
				<div className='left-column'>
					<h2>Características</h2>
					<p>
						Este atornillador está construido en aluminio de alta resistencia,
						ideal para el trabajo pesado. Silencioso y compacto, es ideal para
						agilizar y facilitar la colocación de tornillos y pijas,
						especialmente en madera, lámina, o en la aplicación de pijas
						autoperforantes.
					</p>
					<h2>Aplicaciones</h2>
					<ul>
						<li>Colocación de pijas en madera</li>
						<li>Colocación de pijas autoperforantes</li>
						<li>Atornillado en general</li>
					</ul>
					<h2>Recomendaciones</h2>
					<ul>
						<li>Use aire libre de agua.</li>
						<li>Mantenga la presión del aire constante.</li>
						<li>Lubrique de forma continua.</li>
						<li>Evite golpear la herramienta.</li>
						<li>No desarme la herramienta.</li>
						<li>Use la herramienta solo para lo que fue diseñada.</li>
						<li>Limpie y guarde la herramienta en un lugar seco.</li>
					</ul>
					<h2>Requisitos de operación</h2>
					<ul>
						<li>Aire libre de agua</li>
						<li>Presión del aire de 90 PSI.</li>
						<li>Lubricación continua.</li>
						<li>Manguera de 5 mm o mayor en diámetro interior.</li>
						<li>Flujo de aire igual o mayor a 4.7 lt/s.</li>
					</ul>
				</div>
				<div className='right-column'>
					<img
						src='/api/placeholder/300/300'
						alt='ATOR-1'
						className='max-w-full h-auto'
					/>
					<h2>Especificaciones</h2>
					<table>
						<tbody>
							<tr>
								<th>Rango de Torque</th>
								<td>5-13 Nm</td>
							</tr>
							<tr>
								<th>Velocidad</th>
								<td>1,800 rpm</td>
							</tr>
							<tr>
								<th>Tipo de Mecanismo</th>
								<td>Clutch positivo</td>
							</tr>
							<tr>
								<th>Peso</th>
								<td>1.2 Kg</td>
							</tr>
						</tbody>
					</table>
					<h2>Accesorios Opcionales</h2>
					<p>- Sin accesorios</p>
				</div>
			</div>
		</div>
	);
}; */

const Atornillador = () => {
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
		<div className='Atorcontainer'>
			<div>
				<form className='createtoolform' onSubmit={handleSubmit}>
					{successLog.isSuccess && (
						<SuccessMessage message={successLog.message} />
					)}
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
				</form>
			</div>
			<div className='content'>
				<div className='left-column'>
					<label htmlFor='toolDescription'>Descripción de herramienta</label>
					<textarea
						id='toolDescription'
						rows={3}
						placeholder='Descripción general de la herramienta'
						value={toolDescription}
						onChange={e => setToolDescription(e.target.value)}
					/>
					<DynamicInputs label='Características' />
					<DynamicInputs label='Recomendaciones' />
					<DynamicInputs label='Requisitos de operación' />
				</div>
				<div className='right-column'>
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

					<h2>Especificaciones</h2>
					<table>
						<tbody>
							<tr>
								<th>Rango de Torque</th>
								<td>5-13 Nm</td>
							</tr>
							<tr>
								<th>Velocidad</th>
								<td>1,800 rpm</td>
							</tr>
							<tr>
								<th>Tipo de Mecanismo</th>
								<td>Clutch positivo</td>
							</tr>
							<tr>
								<th>Peso</th>
								<td>1.2 Kg</td>
							</tr>
						</tbody>
					</table>
					<label>Incluye:</label>
					<div className='characteristics'>
						{characteristics.map(char => (
							<div key={char.id} className='characteristic-item'>
								<input
									type='text'
									placeholder='(ej: cable,...)'
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
							Añadir extra
						</button>
					</div>

					<label>Accesorios opcionales</label>
					<div className='characteristics'>
						{characteristics.map(char => (
							<div key={char.id} className='characteristic-item'>
								<input
									type='text'
									placeholder='Accesorio'
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
							Añadir accesorio
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
function ContentMainPage() {
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Herramientas' />
				<Atornillador />
			</main>
		</BasePage>
	);
}

function CreateTool() {
	return <ContentMainPage />;
}

export default CreateTool;
