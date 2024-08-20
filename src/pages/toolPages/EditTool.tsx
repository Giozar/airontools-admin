import DeletionModal from '@components/commons/DeletionModal';
import Editables from '@components/commons/Editables';
import ErrorMessage from '@components/commons/ErrorMessage';
import SelectInput from '@components/commons/SelectInput';
import SuccessMessage from '@components/commons/SuccessMessage';
import TableRow from '@components/commons/TableRow';
import ImageUpdate from '@components/files/ImageUpdate';

import TrashIcon from '@components/svg/TrashIcon';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import useFileManagement from '@hooks/files/useFileManagement';
import useMultipleFileUpload from '@hooks/files/useMultipleFileUpload';
import useToolCategorizationEdit from '@hooks/products/useToolCategorizationEdit';
import useSpecs from '@hooks/specifications/useSpecs';
import { ProductDataFrontend } from '@interfaces/Product.interface';

import BasePage from '@layouts/BasePage';
import axios from 'axios';
import { useEffect, useState } from 'react';

function EditToolForm({ toolToEdit }: { toolToEdit: ProductDataFrontend }) {
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
		catId: selectedCategory?.id || toolToEdit.category._id || '',
	});
	const { filePreviews, handleFileSelect, handleRemoveFile, handleFileUpload } =
		useMultipleFileUpload();
	const {
		setShowDeletionModalForFile,
		showDeletionModalForFile,
		deletionMessageFile,
		handleCloseModalFile,
		handleDelete: handleDeleteFile,
	} = useFileManagement();
	const id = toolToEdit.id;
	console.log(toolToEdit);
	const [name, setName] = useState(toolToEdit.name);
	const [description, setDescription] = useState(toolToEdit.description);
	const [model, setModel] = useState(toolToEdit.model);
	const [images, setImages] = useState(toolToEdit.images);
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
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
		return await handleFileUpload('images', productId, 'images');
	};
	const handleCloseModalDeletionImages = async (image: string) => {
		setImages(images?.filter(img => img !== image));
	};
	useEffect(() => {}, [images]);
	const handleDeleteFileFor = (imageToDelete: string) => {
		console.log(imageToDelete);
		setImagesToDelete(prevImagesToDelete => {
			const updatedImagesToDelete = new Set([
				...prevImagesToDelete,
				imageToDelete,
			]);
			return Array.from(updatedImagesToDelete);
		});
		handleCloseModalDeletionImages(imageToDelete);
	};
	const handleManualUpload = async (productId: string) => {
		return await handleFileUpload('manuals', productId, 'manuals');
	};
	const handleCloseModalDeletionManuals = (manual: string) => {
		if (manuals?.length === 1)
			setManuals([]); // Por alguna razon hay un bug aqui que necesita esta condicion
		else setManuals(manuals?.filter(man => man !== manual));
	};
	const handleSubmit = async () => {
		try {
			await axios.patch(import.meta.env.VITE_API_URL + '/products/' + id, {
				_id: id,
				name,
				model,
				characteristics: char,
				family: selectedFamily?.id,
				category: selectedCategory?.id,
				subcategory: selectedSubcategory?.id,
				description,
				videos,
				specifications: specificationValues,
			});
			const uploadedUrlImages = await handleImageUpload(id);
			const deletePromises = imagesToDelete.map(async image => {
				return await handleDeleteFile(image);
			});
			const deletedFiles = await Promise.all(deletePromises);
			// Paso 2: subir imagenes
			// Paso 3: Actualizar producto con imagenes
			await axios.patch(import.meta.env.VITE_API_URL + '/products/' + id, {
				images: deletedFiles
					? [...deletedFiles, ...uploadedUrlImages]
					: [...(images || ['']), ...uploadedUrlImages],
			});

			// Paso 4: Subir manuales
			const uploadedUrlManuals = await handleManualUpload(id || '');
			// Paso 3: Actualizar producto con manuales
			console.log(
				await axios.patch(import.meta.env.VITE_API_URL + '/products/' + id, {
					manuals: manuals
						? [...manuals, ...uploadedUrlManuals]
						: uploadedUrlManuals,
				}),
			);
			showSuccess('Herramienta actualizada con éxito');
		} catch (error) {
			showError('No se pudo actualizar la herramienta');
			console.error(error);
		}
	};
	console.log(toolToEdit.specifications);
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
							{/* <TextInput
								id='nombre'
								label='Nombre de herramienta'
								value={name}
								placeholder='Herramienta 1'
								onChange={e => setName(e.target.value)}
							/> */}
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
						<p>
							<strong>Familia actual: </strong>
							{toolToEdit.family.name}
						</p>
						<p>
							<strong>Categoria actual: </strong>
							{toolToEdit.category.name}
						</p>
						<p>
							<strong>Subcategoria actual: </strong>
							{toolToEdit.subcategory.name}
						</p>
						<br></br>
						<h4>Cambiar categorización y especificaciones:</h4>
						<br></br>
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

					<div className='column'>
						<label htmlFor='spec'>Especificaciones</label>
						<table id='spec'>
							<tbody>
								{specifications.map((spec, index) => (
									<TableRow
										key={spec.id} // Ensure unique key for each row
										label={spec.name}
										unit={spec.unit || ''}
										value={
											specificationValues[index]?.value ||
											toolToEdit.specifications[index]?.value ||
											''
										} // Adjust this if specificationValues doesn't align with specifications
										onValueChange={newValue =>
											handleSpecUpdate(newValue, index)
										}
									/>
								))}
							</tbody>
						</table>
					</div>

					<ImageUpdate
						images={images || []}
						filePreviews={filePreviews}
						handleRemoveFile={handleRemoveFile}
						handleFileSelect={handleFileSelect}
						setShowDeletionModalForFile={setShowDeletionModalForFile}
						showDeletionModalForFile={showDeletionModalForFile}
						deletionMessageFile={deletionMessageFile}
						handleCloseModalFile={handleCloseModalFile}
						handleDeleteFileFor={handleDeleteFileFor}
						handleCloseModalDeletionImages={handleCloseModalDeletionImages}
					/>

					<div className='column'>
						<p>Manuales:</p>
						<div className='image-upload'>
							{manuals?.map(preview => (
								<div key={preview} className='image-preview'>
									{showDeletionModalForFile === preview && (
										<DeletionModal
											id={preview}
											name={preview}
											onClose={() => handleCloseModalFile()}
											onCloseDelete={() =>
												handleCloseModalDeletionManuals(preview)
											}
											onDelete={() => handleDeleteFile(preview)}
											message={deletionMessageFile}
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
										onClick={() => setShowDeletionModalForFile(preview)}
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
							<p>Manuales nuevos:</p>
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
						<p>Videos:</p>
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
		<BasePage title='Editar Herramienta'>
			<EditToolForm toolToEdit={state} />
		</BasePage>
	);
}

function EditTool() {
	return <ContentMainPage />;
}

export default EditTool;
