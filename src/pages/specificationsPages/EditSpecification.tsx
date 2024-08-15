/* eslint-disable react-hooks/exhaustive-deps */
import DeletionModal from '@components/commons/DeletionModal';
import Editables from '@components/Editables';

import SelectInput from '@components/commons/SelectInput';
import HeaderTitle from '@components/HeaderTitle';
import TrashIcon from '@components/svg/TrashIcon';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import useToolCategorizationEdit from '@hooks/products/useToolCategorizationEdit';
import useSpecificationsManagement from '@hooks/specifications/useSpecificationsManagement';
import { SpecDataToSend } from '@interfaces/Specifications.interface';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

import ErrorMessage from '@components/commons/ErrorMessage';
import SuccessMessage from '@components/commons/SuccessMessage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditSpecificationsForm({
	specToEdit,
}: {
	specToEdit: SpecDataToSend;
}) {
	const id = specToEdit._id;
	const [name, setName] = useState(specToEdit.name);
	const [description, setDescription] = useState(specToEdit.description);
	const [unit, setUnit] = useState(specToEdit.unit);
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

	const { showError, errorLog } = useErrorHandling();
	const { showSuccess, successLog } = useSuccessHandling();

	const handleNameUpdate = (newValue: string) => {
		setName(newValue);
	};

	const handleDescriptionUpdate = (newValue: string) => {
		setDescription(newValue);
	};
	const handleUnitUpdate = (newValue: string) => {
		setUnit(newValue);
	};

	const handleSave = async () => {
		console.log(id);
		try {
			await axios.patch(
				`${import.meta.env.VITE_API_URL}/specifications/${id}`,
				{
					name,
					description,
					unit,
					family: selectedFamily?.id,
					category: selectedCategory?.id,
					subcategory: selectedSubcategory?.id,
				},
			);
			showSuccess('Especificación editada con éxito');
		} catch (error) {
			errorHandler(error, showError);
		}
	};
	const {
		showDeletionModalFor,
		setShowDeletionModalFor,
		deletionMessage,
		handleCloseModal,
		handleDelete,
	} = useSpecificationsManagement();

	const navigate = useNavigate();
	const handleCloseModalDeletion = () => {
		navigate('/home/categorizacion/ver-especificaciones');
	};
	return (
		<>
			<ErrorMessage message={errorLog.message} />
			<SuccessMessage message={successLog.message} />
			<div className='editspecification'>
				<div className='familyedit'>
					<button
						className='delete'
						onClick={() => setShowDeletionModalFor(id || '')}
					>
						<TrashIcon />
					</button>
					{showDeletionModalFor === id && (
						<DeletionModal
							id={id}
							name={name}
							onClose={() => handleCloseModal()}
							onCloseDelete={handleCloseModalDeletion}
							onDelete={() => handleDelete(id || '', name)}
							message={deletionMessage}
						/>
					)}
					<h2>
						<span>Editando la especificación</span> {name}
					</h2>
					<div className='familycontent'>
						<hr></hr>
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
						<Editables
							what='Unidades'
							valueOf={unit || ''}
							type='input'
							onUpdate={handleUnitUpdate}
						/>
						<hr></hr>
						<SelectInput
							id='familiaselect'
							name='Selecciona una familia'
							options={families.map(family => ({
								value: family.id,
								label: family.name,
							}))}
							value={selectedFamily?.name || ''}
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
								value={selectedCategory?.name || ''}
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
								value={selectedSubcategory?.name || ''}
								onChange={handleSubcategoryChange}
							/>
						)}
						<hr></hr>

						<button className='save' onClick={handleSave}>
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
		spec: { id: 'N/A', name: 'Desconocido' },
	};

	const [state] = useState(() => {
		const savedState = localStorage.getItem('specToEdit');
		return savedState ? JSON.parse(savedState) : initialState;
	});

	useEffect(() => {
		localStorage.setItem('specToEdit', JSON.stringify(state));
	}, [state]);

	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Editar Especificación' />
				<EditSpecificationsForm specToEdit={state} />
			</main>
		</BasePage>
	);
}

function EditSpecification() {
	return <ContentMainPage />;
}

export default EditSpecification;
