import DeletionModal from '@components/DeletionModal';
import Editables from '@components/Editables';
import ErrorMessage from '@components/ErrorMessage';
import HeaderTitle from '@components/HeaderTitle';
import SuccessMessage from '@components/SuccessMessage';
import TrashIcon from '@components/svg/TrashIcon';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import useFileManagement from '@hooks/useFileManagement';
import useMultipleFileUpload from '@hooks/useMultipleFileUpload';
import useSpecs from '@hooks/useSpecs';
import useToolCategorizationEdit from '@hooks/useToolCategorizationEdit';
import { ProductDataFrontend } from '@interfaces/Product.interface';

import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import axios from 'axios';
import { useEffect, useState } from 'react';

function EditToolForm({ toolToEdit }: { toolToEdit: ProductDataFrontend }) {
	const {
		families,
		familyId,
		filteredCategories,
		categoryId,
		filteredSubcategories,
		subcategoryId,
		familyName,
		categoryName,
		subcategoryName,
		handleFamilyIdUpdate,
		handleCategoryIdUpdate,
		handleSubcategoryIdUpdate,
	} = useToolCategorizationEdit({
		initialFamilyId: toolToEdit.family._id || '',
		initialCategoryId: toolToEdit.category._id || '',
		initialSubcategoryId: toolToEdit.subcategory._id || '',
	});
	console.log(toolToEdit.family._id);
	const { specs, specifications, findKeyInSpecs, handleSpecUpdate } = useSpecs({
		catId: categoryId,
		initialSpecs: toolToEdit.specifications,
	});
	const { filePreviews, handleFileSelect, handleRemoveFile, handleFileUpload } =
		useMultipleFileUpload();
	const {
		showDeletionModalFor,
		setShowDeletionModalFor,
		deletionMessage,
		handleCloseModal,
		handleDelete,
	} = useFileManagement();

	const id = toolToEdit.id;
	console.log(toolToEdit.id);
	const [name, setName] = useState(toolToEdit.name);
	const [description, setDescription] = useState(toolToEdit.description);
	const [model, setModel] = useState(toolToEdit.model);
	const [images, setImages] = useState(toolToEdit.images);
	const [manuals, setManuals] = useState(toolToEdit.manuals);
	const [videos, setVideos] = useState(toolToEdit.videos);
	const [char, setChar] = useState(toolToEdit.characteristics);

	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();

	const handleNameUpdate = (newValue: string) => {
		setName(newValue);
	};

	const handleDescriptionUpdate = (newValue: string) => {
		setDescription(newValue);
	};
	const handleModelUpdate = (newValue: string) => {
		setModel(newValue);
	};

	const handleUpdateChar = (newValues: string[]) => {
		setChar(newValues);
	};
	const handleUpdateVideos = (newValues: string[]) => {
		setVideos(newValues);
	};
	const handleImageUpload = async (productId: string) => {
		return await handleFileUpload('/images/' + productId, 'images');
	};

	const handleManualUpload = async (productId: string) => {
		return await handleFileUpload('/manuals/' + productId, 'manuals');
	};
	const handleCloseModalDeletionImages = (image: string) => {
		setImages(images?.filter(img => img !== image));
	};
	const handleCloseModalDeletionManuals = (manual: string) => {
		setManuals(manuals?.filter(man => man !== manual));
	};
	const handleSubmit = async () => {
		try {
			console.log(subcategoryId);
			await axios.patch(import.meta.env.VITE_API_URL + '/products/' + id, {
				_id: id,
				name,
				model,
				characteristics: char,
				family: familyId,
				category: categoryId,
				subcategory: subcategoryId || '',
				description,
				videos,
				specifications: specs || toolToEdit.specifications,
			});
			// Paso 2: subir imagenes
			const uploadedUrlImages = await handleImageUpload(id || '');
			// Paso 3: Actualizar producto con imagenes
			await axios.patch(import.meta.env.VITE_API_URL + '/products/' + id, {
				images: images ? [...images, ...uploadedUrlImages] : uploadedUrlImages,
			});

			// Paso 4: Subir manuales
			const uploadedUrlManuals = await handleManualUpload(id || '');
			// Paso 3: Actualizar producto con manuales
			await axios.patch(import.meta.env.VITE_API_URL + '/products/' + id, {
				manuals: manuals
					? [...manuals, ...uploadedUrlManuals]
					: uploadedUrlManuals,
			});
			showSuccess('Herramienta actualizada con éxito');
		} catch (error) {
			showError('No se pudo actualizar la herramienta');
			console.error(error);
		}
	};

	return (
		<>
			{successLog.isSuccess && <SuccessMessage message={successLog.message} />}
			{errorLog.isError && <ErrorMessage message={errorLog.message} />}
			<div className='editspecification'>
				<div className='familyedit'>
					<div className='titulo'>
						<h2>
							<span>Editando la herramienta</span> {name}
						</h2>
						<button onClick={handleSubmit} className='save'>
							Guardar Cambios
						</button>
					</div>

					<div className='column'>
						<div className='familycontent'>
							<Editables
								what='Nombre'
								valueOf={name}
								type='input'
								onUpdate={handleNameUpdate}
							/>
							<Editables
								what='Modelo'
								valueOf={model || ''}
								type='input'
								onUpdate={handleModelUpdate}
							/>
							<Editables
								what='Descripción'
								valueOf={description || ''}
								type='textarea'
								onUpdate={handleDescriptionUpdate}
							/>
							<Editables
								what='Características'
								valueOf={char?.join('<br>') || ''}
								type='list'
								onUpdateMany={handleUpdateChar}
								strlist={char}
							/>
						</div>
					</div>
					<div className='column'>
						<div className='familycontent'>
							{familyName}
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
						</div>
					</div>
					<div className='column'>
						<div className='familycontent'>
							<p>Especificaciones: </p>
							{specifications &&
								specifications.map((spec, index) => (
									<div key={spec.id}>
										{handleSpecUpdate && (
											<Editables
												what={spec.name}
												valueOf={findKeyInSpecs(spec.id) || 'N/A'}
												unit={spec.unit}
												type='input'
												whichOne={index + 1}
												onUpdateOne={handleSpecUpdate}
											/>
										)}
										<p></p>
									</div>
								))}
						</div>
					</div>

					<div className='column'>
						<p> Imágenes: </p>
						<div className='image-upload'>
							{images &&
								images.map((preview, index) => (
									<div key={index} className='image-preview'>
										{showDeletionModalFor === preview && (
											<DeletionModal
												id={preview}
												name={preview}
												image={preview}
												onClose={() => handleCloseModal()}
												onCloseDelete={() =>
													handleCloseModalDeletionImages(preview)
												}
												onDelete={() => handleDelete(preview, '')}
												message={deletionMessage}
											/>
										)}
										<img
											src={preview}
											alt={`preview-${index}`}
											className='image-placeholder'
										/>
										<button
											// borra la imagen del servidor?
											onClick={() => setShowDeletionModalFor(preview)}
											// deberia de poder borrar del servidor y aqui solo cambiar la lista (borrar el string de la imagen)
											className='delete'
										>
											<TrashIcon />
										</button>
									</div>
								))}
							<br></br>
							<p>Imagenes nuevas: </p>
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
						</div>
					</div>
					<div className='column'>
						<p>Manuales:</p>
						<div className='image-upload'>
							{manuals?.map(preview => (
								<div key={preview} className='image-preview'>
									{showDeletionModalFor === preview && (
										<DeletionModal
											id={preview}
											name={preview}
											image={preview}
											onClose={() => handleCloseModal()}
											onCloseDelete={() =>
												handleCloseModalDeletionManuals(preview)
											}
											onDelete={() => handleDelete(preview, '')}
											message={deletionMessage}
										/>
									)}
									<embed
										src={preview}
										width='150'
										height='100'
										className='image-placeholder'
									/>
									<button
										className='delete'
										onClick={() => setShowDeletionModalFor(preview)}
									>
										<TrashIcon />
									</button>

									<div className='buttons'>
										<a href={preview} target='_blank' rel='noopener noreferrer'>
											Ver documento completo
										</a>
									</div>
								</div>
							))}
							<br></br>
							<p>Manuales nuevos: </p>
							{filePreviews.manuals?.map((preview, index) => (
								<div key={index} className='image-preview'>
									<embed
										src={preview}
										width='250'
										height='200'
										className='image-placeholder'
									></embed>

									<button
										onClick={() => handleRemoveFile('manuals', index)}
										className='delete'
										type='button'
									>
										<TrashIcon />
									</button>
								</div>
							))}
							<div className='image-placeholder add-image'>
								<label htmlFor='manual-input'>Subir Manual +</label>
								<input
									type='file'
									id='manual-input'
									multiple
									accept='.pdf, .doc, .docx'
									onChange={event => handleFileSelect(event, 'manuals')}
									style={{ display: 'none' }}
								/>
							</div>
						</div>
					</div>

					<div className='column'>
						<p> Videos: </p>
						<Editables
							what='Videos'
							valueOf={(videos || ['']).join('<br>')}
							type='list'
							onUpdateMany={handleUpdateVideos}
							strlist={videos}
						/>
					</div>
					<div className='titulo'>
						<button onClick={handleSubmit} className='save'>
							Guardar Cambios
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

function ContentMainPage() {
	const initialState = {
		spec: { _id: 'N/A', name: 'Desconocido' },
	};

	const [state] = useState(() => {
		const savedState = localStorage.getItem('ProductToEdit');
		return savedState ? JSON.parse(savedState) : initialState;
	});

	useEffect(() => {
		localStorage.setItem('ProductToEdit', JSON.stringify(state));
	}, [state]);
	return (
		<BasePage>
			<HeaderApp />
			<main>
				{state.id}
				<HeaderTitle title='Editar Herramienta' />
				<EditToolForm toolToEdit={state} />
			</main>
		</BasePage>
	);
}

function EditTool() {
	return <ContentMainPage />;
}

export default EditTool;
