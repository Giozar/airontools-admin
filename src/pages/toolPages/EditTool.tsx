import Editables from '@components/commons/Editables';
import ErrorMessage from '@components/commons/ErrorMessage';
import Info from '@components/commons/Info';
import SelectInput from '@components/commons/SelectInput';
import SuccessMessage from '@components/commons/SuccessMessage';
import TableRow from '@components/commons/TableRow';
import ImageUpdate from '@components/files/ImageUpdate';
import ManualUpdate from '@components/files/ManualUpdate';

import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import useFileManagement from '@hooks/files/useFileManagement';
import useMultipleFileUpload from '@hooks/files/useMultipleFileUpload';
import useToolCategorizationEdit from '@hooks/products/useToolCategorizationEdit';
import useSpecs from '@hooks/specifications/useSpecs';
import { ProductDataFrontend } from '@interfaces/Product.interface';

import BasePage from '@layouts/BasePage';
import { cleanArray } from '@utils/cleanArray.util';
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
		subcatId: selectedSubcategory?.id || toolToEdit.subcategory._id || '',
		initialSpecs: toolToEdit.specifications.map(edit => ({
			specification: edit.specification._id || '',
			value: edit.value,
		})),
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
	const [name, setName] = useState(toolToEdit.name);
	const [description, setDescription] = useState(toolToEdit.description);
	const [model, setModel] = useState(toolToEdit.model);
	const [images, setImages] = useState(toolToEdit.images || []);
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
	const [manuals, setManuals] = useState(toolToEdit.manuals || []);
	const [manualsToDelete, setManualsToDelete] = useState<string[]>([]);
	const [videos, setVideos] = useState(toolToEdit.videos || []);
	const [char, setChar] = useState(toolToEdit.characteristics || []);
	const [recommendations, setRecommendations] = useState<string[]>(
		toolToEdit.recommendations || [],
	);
	const [requeriments, setRequeriments] = useState<string[]>(
		toolToEdit.operationRequirements || [],
	);
	const [includes, setIncludes] = useState<string[]>(
		toolToEdit.includedItems || [],
	);
	const [accessories, setAccessories] = useState<string[]>(
		toolToEdit.optionalAccessories || [],
	);
	const [applications, setApplications] = useState<string[]>(
		toolToEdit.applications || [],
	);
	const { errorLog, showError } = useErrorHandling();
	const { successLog, showSuccess } = useSuccessHandling();

	const handleImageUpload = async (productId: string) => {
		return await handleFileUpload('images', productId, 'images');
	};
	const handleCloseModalDeletionImages = async (image: string) => {
		setImages(images?.filter(img => img !== image));
	};
	useEffect(() => {}, [images, manuals]);
	const handleDeleteImageFor = (imageToDelete: string) => {
		setImagesToDelete(prevImagesToDelete => {
			const updatedImagesToDelete = new Set([
				...prevImagesToDelete,
				imageToDelete,
			]);
			return Array.from(updatedImagesToDelete);
		});
		handleCloseModalDeletionImages(imageToDelete);
	};
	const handleDeleteManualFor = (manualToDelete: string) => {
		setManualsToDelete(prevToDelete => {
			const updatedmanualToDelete = new Set([...prevToDelete, manualToDelete]);
			return Array.from(updatedmanualToDelete);
		});
		handleCloseModalDeletionManuals(manualToDelete);
	};
	const handleManualUpload = async (productId: string) => {
		return await handleFileUpload('manuals', productId, 'manuals');
	};
	const handleCloseModalDeletionManuals = (manual: string) => {
		setManuals(manuals?.filter(man => man !== manual));
	};

	const handleSubmit = async () => {
		try {
			console.log(selectedFamily?.id);
			await axios.patch(import.meta.env.VITE_API_URL + '/products/' + id, {
				_id: id,
				name,
				model,
				characteristics: cleanArray(char),
				description,
				videos: cleanArray(videos),
				family: selectedFamily?.id || toolToEdit.family._id,
				category: selectedCategory?.id || toolToEdit.category._id,
				subcategory: selectedSubcategory?.id || toolToEdit.subcategory._id,
				specifications: specificationValues,
				includedItems: cleanArray(includes),
				optionalAccessories: cleanArray(accessories),
				operationRequirements: cleanArray(requeriments),
				applications: cleanArray(applications),
				recommendations: cleanArray(recommendations),
			});
			const uploadedUrlImages = await handleImageUpload(id);
			const deletePromises = imagesToDelete.map(async image => {
				return await handleDeleteFile(image);
			});
			await Promise.all(deletePromises);
			// Paso 2: subir imagenes
			// Paso 3: Actualizar producto con imagenes
			await axios.patch(import.meta.env.VITE_API_URL + '/products/' + id, {
				images: [...images, ...uploadedUrlImages],
			});

			// Paso 4: Subir manuales
			const uploadedUrlManuals = await handleManualUpload(id || '');
			const deletePromises2 = manualsToDelete.map(async manual => {
				return await handleDeleteFile(manual);
			});
			await Promise.all(deletePromises2);
			// Paso 3: Actualizar producto con manuales

			await axios.patch(import.meta.env.VITE_API_URL + '/products/' + id, {
				manuals: [...manuals, ...uploadedUrlManuals],
			}),
				setImages([...images, ...uploadedUrlImages]);
			setManuals([...manuals, ...uploadedUrlManuals]);
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
								onUpdate={setName}
							/>
							<Editables
								what='Modelo'
								valueOf={model || ''}
								type='input'
								onUpdate={setModel}
							/>
							<Editables
								what='Descripción'
								valueOf={description || ''}
								type='textarea'
								onUpdate={setDescription}
							/>
						</div>
					</div>

					<div className='column'>
						<Info title={'Familia actual'} info={toolToEdit.family.name} />
						<Info title={'Categoria actual'} info={toolToEdit.category.name} />
						<Info
							title={'Subcategoria actual'}
							info={toolToEdit.subcategory.name}
						/>
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
									<>
										<p>{specificationValues[index].specification}</p>
										<TableRow
											key={spec.id}
											label={spec.name}
											unit={spec.unit || ''}
											value={specificationValues[index]?.value || ''}
											onValueChange={newValue =>
												handleSpecUpdate(newValue, index)
											}
										/>
									</>
								))}
							</tbody>
						</table>
					</div>
					<div className='column'>
						<Editables
							what='Características'
							valueOf={char?.join('<br>') || ''}
							type='list'
							onUpdateMany={setChar}
							strlist={char}
						/>
					</div>
					<div className='column'>
						<Editables
							what='Aplicaciones'
							valueOf={(applications || ['']).join('<br>')}
							type='list'
							onUpdateMany={setApplications}
							strlist={applications}
						/>
					</div>
					<div className='column'>
						<Editables
							what='Recomendaciones'
							valueOf={(recommendations || ['']).join('<br>')}
							type='list'
							onUpdateMany={setRecommendations}
							strlist={recommendations}
						/>
					</div>
					<div className='column'>
						<Editables
							what='Requisitos de operación'
							valueOf={(requeriments || ['']).join('<br>')}
							type='list'
							onUpdateMany={setRequeriments}
							strlist={requeriments}
						/>
					</div>
					<div className='column'>
						<Editables
							what='Incluye'
							valueOf={(includes || ['']).join('<br>')}
							type='list'
							onUpdateMany={setIncludes}
							strlist={includes}
						/>
					</div>
					<div className='column'>
						<Editables
							what='Accesorios opcionales'
							valueOf={(accessories || ['']).join('<br>')}
							type='list'
							onUpdateMany={setAccessories}
							strlist={accessories}
						/>
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
						handleDeleteFileFor={handleDeleteImageFor}
						handleCloseModalDeletionImages={handleCloseModalDeletionImages}
					/>
					<ManualUpdate
						manuals={manuals || []}
						filePreviews={filePreviews}
						handleRemoveFile={handleRemoveFile}
						handleFileSelect={handleFileSelect}
						setShowDeletionModalForFile={setShowDeletionModalForFile}
						showDeletionModalForFile={showDeletionModalForFile}
						deletionMessageFile={deletionMessageFile}
						handleCloseModalFile={handleCloseModalFile}
						handleDeleteFileFor={handleDeleteManualFor}
						handleCloseModalDeletionManuals={handleCloseModalDeletionManuals}
					/>

					<div className='column'>
						<Editables
							what='Videos'
							valueOf={(videos || ['']).join('<br>')}
							type='list'
							onUpdateMany={setVideos}
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
