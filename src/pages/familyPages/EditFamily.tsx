import { FamilyFrontend } from '@adapters/family.adapter';
import CreateCategory from '@components/CreateCategory';
import DeletionModal from '@components/DeletionModal';
import Editables from '@components/Editables';
import EditCategory from '@components/EditCategory';
import { AuthContext } from '@contexts/AuthContext';

import ErrorMessage from '@components/ErrorMessage';
import HeaderTitle from '@components/HeaderTitle';

import SuccessMessage from '@components/SuccessMessage';
import TrashIcon from '@components/svg/TrashIcon';

import useFamilyManagement from '@hooks/useFamilyManagement';
import useFamilyUpdate from '@hooks/useFamilyUpdate';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/css/editFamily.css';
import axios from 'axios';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface EditFamilyFormProps {
	familyToEdit: FamilyFrontend;
}
function EditFamilyForm({ familyToEdit }: EditFamilyFormProps) {
	// Datos recuperados y que se pueden modificar
	const [name, setName] = useState(familyToEdit.name);
	const [description, setDescription] = useState(familyToEdit.description);
	const familyId = familyToEdit.id || '';
	const authContext = useContext(AuthContext);
	const createdBy = authContext?.user?.name || 'user';
	const { errorLogFamily, successLogFamily, updateFamily } = useFamilyUpdate();
	const {
		showDeletionModalFor,
		setShowDeletionModalFor,
		deletionMessage,
		handleCloseModal,
		handleDelete,
	} = useFamilyManagement();
	const [update, setUpdate] = useState(false);
	const [numberOfCategories, setNumberOfCategories] = useState<number | null>(
		null,
	);
	const [numberOfSubcategories, setNumberOfSubcategories] = useState<
		number | null
	>(null);
	const [numberOfSpecifications, setNumberOfSpecifications] = useState<
		number | null
	>(null);
	const [numberOfProducts, setNumberOfProducts] = useState<number | null>(null);

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
	const handleUpdateFamily = async () => {
		try {
			if (
				name === familyToEdit.name &&
				description === familyToEdit.description
			)
				return;
			await updateFamily({
				...familyToEdit,
				name,
				description,
			});
			// Esto tal vez cause bugs cuando de refresh...
			localStorage.setItem(
				'familyToEdit',
				JSON.stringify({
					family: { ...familyToEdit, name, description },
				}),
			);
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		const fetchCounts = async () => {
			if (!familyId) {
				setNumberOfCategories(null);
				setNumberOfSubcategories(null);
				setNumberOfSpecifications(null);
				setNumberOfProducts(null);
				setLoading(false);
				return;
			}
			setLoading(true);
			try {
				const [
					categoriesResponse,
					subcategoriesResponse,
					specificationsResponse,
					productsResponse,
				] = await Promise.all([
					axios.get(
						`${import.meta.env.VITE_API_URL}/categories/count/${familyId}`,
					),
					axios.get(
						`${import.meta.env.VITE_API_URL}/subcategories/count/${familyId}`,
					),
					axios.get(
						`${import.meta.env.VITE_API_URL}/specifications/count/${familyId}`,
					),
					axios.get(
						`${import.meta.env.VITE_API_URL}/products/count/${familyId}`,
					),
				]);

				setNumberOfCategories(categoriesResponse.data);
				setNumberOfSubcategories(subcategoriesResponse.data);
				setNumberOfSpecifications(specificationsResponse.data);
				setNumberOfProducts(productsResponse.data);
			} catch (error) {
				console.error(
					'Error al contar categorias, subcategorias y especificaciones:',
					error,
				);
			} finally {
				setLoading(false);
			}
		};

		fetchCounts();
	}, [familyId]);

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
			mensaje += `. Además se afectarán ${numberOfProducts} productos`;
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
					<Editables
						what='Nombre'
						valueOf={name}
						type='input'
						onUpdate={handleNameUpdate}
					/>
					<Editables
						what='Descripción'
						valueOf={description}
						type='textarea'
						onUpdate={handleDescriptionUpdate}
					/>
					<button className='save' onClick={handleUpdateFamily}>
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
function ContentMainPage() {
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
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Editar Familia' />
				<EditFamilyForm familyToEdit={family} />
			</main>
		</BasePage>
	);
}
function EditFamily() {
	return <ContentMainPage />;
}

export default EditFamily;