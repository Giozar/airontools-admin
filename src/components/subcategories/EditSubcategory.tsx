import { transformSubcategoryDataToBackend } from '@adapters/subcategory.adapter';
import DeletionModal from '@components/commons/DeletionModal';
import Editables from '@components/commons/Editables';
import ErrorMessage from '@components/commons/ErrorMessage';
import ImageUploaderSingle from '@components/commons/ImageUploaderSingle';
import SuccessMessage from '@components/commons/SuccessMessage';
import TrashIcon from '@components/svg/TrashIcon';
import useFetchCounts from '@hooks/common/useFetchCounts';
import useMultipleFileUpload from '@hooks/files/useMultipleFileUpload';
import useSubcategoryDelete from '@hooks/subcategories/useSubcategoryDelete';
import useSubcategoryUpdate from '@hooks/subcategories/useSubcategoryUpdate';
import { SubcategoryDataFrontend } from '@interfaces/subcategory.interface';
import { deleteFileService } from '@services/files/deleteFile.service';
import { useState } from 'react';

interface EditSubcategoryProps {
	subcategories: SubcategoryDataFrontend[];
	setSubcategories: (subcategories: SubcategoryDataFrontend[]) => void;
	update: () => void;
}
function EditSubcategory({
	subcategories,
	setSubcategories,
	update,
}: EditSubcategoryProps) {
	// Actualizar subcategoría
	const { errorLogSubcategory, successLogSubcategory, updateSubcategory } =
		useSubcategoryUpdate();
	// Actualizar archivos de subcategoría
	const { filePreviews, handleFileSelect, handleRemoveFile, handleFileUpload } =
		useMultipleFileUpload();

	// Eliminar subcategoría
	const {
		showDeletionModalFor,
		setShowDeletionModalFor,
		deletionMessage,
		handleCloseModal,
		handleDelete,
	} = useSubcategoryDelete();

	// Manejador de cargar imagen de subcategoría
	const handleImageUploadSubcategory = async (
		subcategoryId: string,
		index: number,
	) => {
		const result = await handleFileUpload(
			'images.subcategory',
			subcategoryId,
			'images.subcategory' + '.' + index,
		);
		return result;
	};

	// Manejador de petición de actualizar subcategoría
	const handleUpdateSubcategory = async (
		subcategory: SubcategoryDataFrontend,
		index: number,
		deleteImage: boolean,
	) => {
		try {
			// console.log(subcategory.images);
			if (deleteImage && subcategory.images)
				if (subcategory.images?.length > 0) {
					await Promise.all(
						subcategory.images.map(img => deleteFileService(img)),
					);
					subcategory.images = [];
				}

			const uploadedUrlImages = await handleImageUploadSubcategory(
				subcategory.id || '',
				index + 1,
			);
			// console.log(uploadedUrlImages);
			await updateSubcategory(
				transformSubcategoryDataToBackend({
					...subcategory,
					images: uploadedUrlImages,
				}),
			);
			update();
		} catch (error) {
			console.error('Error:', error);
		}
	};

	// Atualiza los datos de la subcategoría de manera local en el estado
	const handleSubcategoryNameChange = (
		value: string,
		categoryIndex: number,
	) => {
		const updatedSubcategories = [...subcategories];
		updatedSubcategories[categoryIndex - 1].name = value;
		setSubcategories(updatedSubcategories);
	};

	const handleSubcategoryDescriptionChange = (
		value: string,
		categoryIndex: number,
	) => {
		const updatedSubcategories = [...subcategories];
		updatedSubcategories[categoryIndex - 1].description = value;
		setSubcategories(updatedSubcategories);
	};

	// Se usa el fetch de conteo
	const { numberOfSpecifications, numberOfProducts, loading } = useFetchCounts(
		showDeletionModalFor,
		{
			fetchSpecifications: true,
			fetchProducts: true,
		},
		'BySubcategory',
	);

	const [deleteSubcategoryImageToDelete, setDeleteSubcategoryImageToDelete] =
		useState<string[]>(new Array(subcategories.length).fill(''));

	const handleUpdateArray = (index: number, value: string) => {
		setDeleteSubcategoryImageToDelete(prevArray => {
			const newArray = [...prevArray];
			newArray[index] = value;
			return newArray;
		});
	};

	if (loading) {
		return <div>Cargando...</div>;
	}

	const confirmationInfo = () => {
		console.log(numberOfProducts);
		console.log(subcategories.length);
		let mensaje = '';
		if (numberOfSpecifications && numberOfSpecifications > 0)
			mensaje += `Al borrar esta subcategoria se eliminarán ${numberOfSpecifications} especificaciones`;
		if (numberOfProducts && numberOfProducts > 0)
			mensaje += `. Además se eliminarán ${numberOfProducts} productos, desligar y reclasificar estos productos antes de proceder con la eliminación`;
		return mensaje;
	};
	return (
		<>
			{successLogSubcategory.isSuccess && (
				<SuccessMessage message={successLogSubcategory.message} />
			)}
			{errorLogSubcategory.isError && (
				<ErrorMessage message={errorLogSubcategory.message} />
			)}
			<div id='subcategoriesList' className='categoryedit'>
				{subcategories.map((subcategory, subcategoryIndex) => (
					<div key={subcategoryIndex} className='category'>
						{showDeletionModalFor === subcategory.id && (
							<DeletionModal
								id={subcategory.id}
								name={subcategory.name}
								onClose={() => handleCloseModal()}
								onCloseDelete={update}
								onDelete={() =>
									handleDelete(
										subcategory.id || '',
										subcategory.name,
										subcategory.images || [''],
									)
								}
								message={deletionMessage}
								confirmationInfo={confirmationInfo()}
							/>
						)}
						<button
							className='delete'
							onClick={() => setShowDeletionModalFor(subcategory.id || '')}
						>
							<TrashIcon />
						</button>
						<h2>
							<span>Subcategoría</span> {subcategory.name}{' '}
						</h2>
						<Editables
							what='Nombre'
							valueOf={subcategory.name}
							type='input'
							whichOne={subcategoryIndex + 1}
							onUpdateOne={handleSubcategoryNameChange}
						/>
						<Editables
							what='Descripción'
							valueOf={subcategory.description || ''}
							type='textarea'
							whichOne={subcategoryIndex + 1}
							onUpdateOne={handleSubcategoryDescriptionChange}
						/>
						{subcategory.images &&
							filePreviews &&
							handleFileSelect &&
							handleRemoveFile && (
								<ImageUploaderSingle
									title={`Imagen:`}
									filePreviews={filePreviews}
									onFileSelect={handleFileSelect}
									onRemoveFile={(type, index) => {
										handleRemoveFile(type, index);
										handleUpdateArray(
											subcategoryIndex,
											subcategory.images ? subcategory.images[0] : '',
										);
									}}
									type={'subcategory'}
									index={subcategoryIndex + 1}
									placeholder={
										deleteSubcategoryImageToDelete[subcategoryIndex] ===
										subcategory.images[0]
											? ''
											: subcategory.images[0]
									}
								/>
							)}
						<hr />
						<button
							className='save'
							onClick={() =>
								handleUpdateSubcategory(
									subcategory,
									subcategoryIndex,
									deleteSubcategoryImageToDelete[subcategoryIndex] ===
										(subcategory.images ? subcategory.images[0] : ''),
								)
							}
						>
							Guardar Cambios
						</button>
						<hr />
					</div>
				))}
			</div>
		</>
	);
}
export default EditSubcategory;
