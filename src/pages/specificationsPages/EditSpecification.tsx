/* eslint-disable react-hooks/exhaustive-deps */
import { SpecsBackend, SpecsFrontend } from '@adapters/specifications.adapter';
import DeletionModal from '@components/DeletionModal';
import Editables from '@components/Editables';
import ErrorMessage from '@components/ErrorMessage';

import HeaderTitle from '@components/HeaderTitle';
import SuccessMessage from '@components/SuccessMessage';
import TrashIcon from '@components/svg/TrashIcon';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import useFetchCategories from '@hooks/useFetchCategories';
import useFetchFamilies from '@hooks/useFetchFamilies';
import useFetchSubcategories from '@hooks/useFetchSubcategories';
import useSpecificationsManagement from '@hooks/useSpecificationsManagement';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import { errorHandler } from '@utils/errorHandler.util';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditSpecificationsForm({ specToEdit }: { specToEdit: SpecsFrontend }) {
	const id = specToEdit.id;
	const [familyId, setFamilyId] = useState(specToEdit.familyId);
	const [categoryId, setCategoryId] = useState(specToEdit.categoryId);
	const [subcategoryId, setSubcategoryId] = useState(specToEdit.subcategoryId);
	const [name, setName] = useState(specToEdit.name);
	const [description, setDescription] = useState(specToEdit.description);
	const [unit, setUnit] = useState(specToEdit.unit);
	const { families } = useFetchFamilies();
	const { categories, filteredCategories, setFilteredCategories } =
		useFetchCategories();
	const { subcategories, filteredSubcategories, setFilteredSubcategories } =
		useFetchSubcategories();

	const [familyName, setFamilyName] = useState('');
	const [categoryName, setCategoryName] = useState('');
	const [subcategoryName, setSubcategoryName] = useState('');

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
	const handleFamilyIdUpdate = (newValue: string) => {
		setFamilyId(newValue);
		const family = families.find(f => f.id === newValue);
		setFamilyName(family ? family.name : '');
		setFilteredCategories(categories.filter(f => f.familyId === newValue));
		setCategoryId('');
		setCategoryName('');
		setSubcategoryId('');
		setSubcategoryName('');
	};
	const handleCategoryIdUpdate = (newValue: string) => {
		setCategoryId(newValue);
		const category = filteredCategories.find(f => f.id === newValue);
		setCategoryName(category ? category.name : '');
		setFilteredSubcategories(
			subcategories.filter(f => f.categoryId === newValue),
		);
		setSubcategoryId('');
		setSubcategoryName('');
	};
	const handleSubcategoryIdUpdate = (newValue: string) => {
		setSubcategoryId(newValue);
		const subcategory = filteredSubcategories.find(f => f.id === newValue);
		setSubcategoryName(subcategory ? subcategory.name : '');
	};

	useEffect(() => {
		const family = families.find(f => f.id === familyId);
		setFamilyName(family ? family.name : '');

		const category = filteredCategories.find(c => c.id === categoryId);
		setCategoryName(category ? category.name : '');

		const subcategory = filteredSubcategories.find(s => s.id === subcategoryId);
		setSubcategoryName(subcategory ? subcategory.name : '');
	}, [families]);

	const handleSave = async () => {
		try {
			const response = await axios.patch<SpecsBackend>(
				`${import.meta.env.VITE_API_URL}/specifications/${id}`,
				{ name, description, unit, familyId, categoryId, subcategoryId },
			);
			// Handle the response if needed
			showSuccess('Especificación editada con éxito');

			console.log('Save successful:', response.data);
		} catch (error) {
			// Handle errors if the request fails
			errorHandler(error, showError);
			console.error('Save failed:', error);
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
							valueOf={description}
							type='textarea'
							onUpdate={handleDescriptionUpdate}
						/>
						<Editables
							what='Unidades'
							valueOf={unit}
							type='input'
							onUpdate={handleUnitUpdate}
						/>
						<hr></hr>
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
							what='SubCategoría'
							valueOf={subcategoryName}
							type='select'
							onUpdate={handleSubcategoryIdUpdate}
							list={filteredSubcategories.map(item => ({
								id: item.id || 'error',
								name: item.name || 'error',
							}))}
						/>

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
