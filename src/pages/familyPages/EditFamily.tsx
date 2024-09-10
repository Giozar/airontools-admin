import DeletionModal from '@components/commons/DeletionModal';
import TrashIcon from '@components/svg/TrashIcon';
import { useAuthContext } from '@contexts/auth/AuthContext';

import useFamilyManagement from '@hooks/families/useFamilyManagement';
import useFamilyUpdate from '@hooks/families/useFamilyUpdate';
import '@pages/css/editFamily.css';

import { FamilyDataFrontend } from '@interfaces/Family.interface';
import { useEffect, useState } from 'react';

import { transformFamilyDataToBackend } from '@adapters/family.adapter';
import CreateCategory from '@components/categories/CreateCategory';
import EditCategory from '@components/categories/EditCategory';
import Editables from '@components/commons/Editables';
import ErrorMessage from '@components/commons/ErrorMessage';
import ImageUploaderSingle from '@components/commons/ImageUploaderSingle';
import SuccessMessage from '@components/commons/SuccessMessage';
import useFetchCounts from '@hooks/common/useFetchCounts';
import useMultipleFileUpload from '@hooks/files/useMultipleFileUpload';
import { useNavigate } from 'react-router-dom';
interface EditFamilyFormProps {
	familyToEdit: FamilyDataFrontend;
}

function EditFamilyForm({ familyToEdit }: EditFamilyFormProps) {
	// Datos recuperados y que se pueden modificar
	const [name, setName] = useState(familyToEdit.name);
	const [description, setDescription] = useState(familyToEdit.description);
	const familyId = familyToEdit.id || '';
	const { user } = useAuthContext();
	const createdBy = user?.id || 'user';
	const [images, setImages] = useState(familyToEdit.images);
	const [deleteImage, setDeleteImage] = useState(false);
	const { errorLogFamily, successLogFamily, updateFamily } = useFamilyUpdate();
	const {
		showDeletionModalFor,
		setShowDeletionModalFor,
		deletionMessage,
		handleCloseModal,
		handleDelete,
	} = useFamilyManagement();

	const [update, setUpdate] = useState(false);
	const {
		filePreviews,
		handleFileSelect,
		handleRemoveFile,
		handleFileUpload,
		handleDeleteFile,
	} = useMultipleFileUpload();

	const updateCategoryList = () => {
		setUpdate(!update);
	};

	const handleNameUpdate = (newValue: string) => {
		setName(newValue);
	};

	const handleDescriptionUpdate = (newValue: string) => {
		setDescription(newValue);
	};
	const navigate = useNavigate();
	const handleCloseModalDeletion = () => {
		navigate('/home/categorizacion');
	};
	const handleImageUpload = async (familyId: string) => {
		return await handleFileUpload('images.family', familyId, 'images.family');
	};

	useEffect(() => {}, [images]); // para que se actualicen las imagenes
	const handleUpdateFamily = async () => {
		try {
			const uploadedUrlImages = await handleImageUpload(familyId);
			if (deleteImage) {
				const deletePromises = images?.map(async image => {
					return await handleDeleteFile(image);
				});
				const deletedFiles = await Promise.all(deletePromises);
				console.log(deletedFiles);
				setImages([]);
			}
			console.log(uploadedUrlImages);
			console.log(images);
			await updateFamily(
				transformFamilyDataToBackend({
					...familyToEdit,
					name,
					description,
					images:
						deleteImage || uploadedUrlImages.length > 0
							? uploadedUrlImages
							: images,
				}),
			);
			setImages(
				deleteImage || uploadedUrlImages.length > 0
					? uploadedUrlImages
					: images,
			);
			localStorage.setItem(
				'familyToEdit',
				JSON.stringify({
					family: {
						...familyToEdit,
						name,
						description,
						images:
							deleteImage || uploadedUrlImages.length > 0
								? uploadedUrlImages
								: images,
					},
				}),
			);
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const {
		numberOfCategories,
		numberOfSubcategories,
		numberOfSpecifications,
		numberOfProducts,
		loading,
	} = useFetchCounts(familyId, {
		fetchCategories: true,
		fetchSubcategories: true,
		fetchSpecifications: true,
		fetchProducts: true,
	});

	if (loading) {
		return <div>Cargando...</div>;
	}
	const confirmationInfo = () => {
		let mensaje = '';
		if (numberOfCategories && numberOfCategories > 0)
			mensaje += `Al borrar esta familia se eliminarán ${numberOfCategories} categorías`;
		if (numberOfSubcategories && numberOfSubcategories > 0)
			mensaje += `, ${numberOfSubcategories} subcategorías`;
		if (numberOfSpecifications && numberOfSpecifications > 0)
			mensaje += ` y ${numberOfSpecifications} especificaciones`;
		if (numberOfProducts && numberOfProducts > 0)
			mensaje += `. Además se eliminarán ${numberOfProducts} productos, desligar y reclasificar estos productos antes de proceder con la eliminación`;
		return mensaje;
	};
	return (
		<div>
			{showDeletionModalFor === familyId && (
				<DeletionModal
					id={familyId}
					name={name}
					onClose={() => handleCloseModal()}
					onCloseDelete={handleCloseModalDeletion}
					onDelete={() => handleDelete(familyId || '', name)}
					message={deletionMessage}
					confirmationInfo={confirmationInfo() || null}
				/>
			)}
			<div className='familyedit'>
				{successLogFamily.isSuccess && (
					<SuccessMessage message={successLogFamily.message} />
				)}
				{errorLogFamily.isError && (
					<ErrorMessage message={errorLogFamily.message} />
				)}
				<button
					className='delete'
					onClick={() => setShowDeletionModalFor(familyId || '')}
				>
					<TrashIcon />
				</button>
				<h2>
					<span>Editando la Familia</span> {name}
				</h2>
				<div className='familycontent'>
					<div className='column'>
						<Editables
							what='Nombre'
							valueOf={name}
							type='input'
							onUpdate={handleNameUpdate}
						/>
						<Editables
							what='Descripción'
							valueOf={description || ''}
							type='textarea'
							onUpdate={handleDescriptionUpdate}
						/>
						<ImageUploaderSingle
							title={`Imagen:`}
							filePreviews={filePreviews}
							onFileSelect={handleFileSelect}
							onRemoveFile={(type, index) => {
								handleRemoveFile(type, index);
								setDeleteImage(true);
							}}
							type={'family'}
							placeholder={deleteImage ? '' : images[0]}
						/>
					</div>

					<button
						className='save'
						onClick={handleUpdateFamily}
						style={{ marginTop: '2em' }}
					>
						Guardar Cambios
					</button>
				</div>
			</div>
			<h3>Categorias</h3>
			<EditCategory
				familyId={familyId}
				update={update}
				updateCategoryList={updateCategoryList}
			/>
			<CreateCategory
				createdBy={createdBy}
				familyId={familyId}
				updateCategoryList={updateCategoryList}
			/>
		</div>
	);
}

export default function EditFamily() {
	const initialState = {
		family: { id: 'N/A', name: 'Desconocido' },
	};

	const [state] = useState(() => {
		const savedState = localStorage.getItem('familyToEdit');
		return savedState ? JSON.parse(savedState) : initialState;
	});

	useEffect(() => {
		localStorage.setItem('familyToEdit', JSON.stringify(state));
	}, [state]);

	const { family } = state;
	return <EditFamilyForm familyToEdit={family} />;
}
