import { FamilyFrontend } from '@adapters/family.adapter';
import { AuthContext } from '@apps/App';
import CreateCategory from '@components/CreateCategory';
import DeletionModal from '@components/DeletionModal';
import Editables from '@components/Editables';
import EditCategory from '@components/EditCategory';

import ErrorMessage from '@components/ErrorMessage';
import HeaderTitle from '@components/HeaderTitle';

import SuccessMessage from '@components/SuccessMessage';
import TrashIcon from '@components/svg/TrashIcon';

import useFamilyManagement from '@hooks/useFamilyManagement';
import useFamilyUpdate from '@hooks/useFamilyUpdate';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/css/editFamily.css';

import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EditFamilyForm({ familyToEdit }: { familyToEdit: FamilyFrontend }) {
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
	const updateCategoryList = () => {
		setUpdate(!update);
	};

	const handleNameUpdate = (newValue: string) => {
		setName(newValue);
	};

	const handleDescriptionUpdate = (newValue: string) => {
		setDescription(newValue);
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
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const navigate = useNavigate();
	const handleCloseModalDeletion = () => {
		navigate('/home/categorizacion');
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
	const location = useLocation();
	const { family } = location.state || {
		family: { id: 'N/A', name: 'Desconocido' },
	};
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
function CategorizationMenu() {
	return <ContentMainPage />;
}

export default CategorizationMenu;
