import {
	ProductFrontend,
	transformProductDataBack,
} from '@adapters/products.adapter';
import Editables from '@components/Editables';
import ErrorMessage from '@components/ErrorMessage';
import HeaderTitle from '@components/HeaderTitle';
import SuccessMessage from '@components/SuccessMessage';
import TrashIcon from '@components/svg/TrashIcon';
import useErrorHandling from '@hooks/common/useErrorHandling';
import useSuccessHandling from '@hooks/common/useSuccessHandling';
import useSpecs from '@hooks/useSpecs';
import useToolCategorizationEdit from '@hooks/useToolCategorizationEdit';

import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import axios from 'axios';
import { useEffect, useState } from 'react';

function EditToolForm({ toolToEdit }: { toolToEdit: ProductFrontend }) {
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
		initialFamilyId: toolToEdit.familyId,
		initialCategoryId: toolToEdit.categoryId,
		initialSubcategoryId: toolToEdit.subcategoryId,
	});
	const { specs, specifications, findKeyInSpecs, handleSpecUpdate } = useSpecs({
		catId: categoryId,
		initialSpecs: toolToEdit.specifications,
	});
	const id = toolToEdit.id;
	const [name, setName] = useState(toolToEdit.name);
	const [description, setDescription] = useState(toolToEdit.description);
	const [model, setModel] = useState(toolToEdit.model);
	const [images] = useState(toolToEdit.imagesUrl);
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
	const handleSubmit = async () => {
		try {
			await axios.patch(
				import.meta.env.VITE_API_URL + '/products/' + id,
				transformProductDataBack({
					id,
					name,
					model,
					characteristics: char,
					familyId,
					categoryId,
					subcategoryId: subcategoryId || '',
					description,
					specifications: specs || toolToEdit.specifications,
				}),
			);
			showSuccess('Herramienta actualizada con éxito');
		} catch (error) {
			showError('No se pudo actualizar la herramienta');
		}
	};

	return (
		<>
			{successLog.isSuccess && <SuccessMessage message={successLog.message} />}
			{errorLog.isError && <ErrorMessage message={errorLog.message} />}
			<div className='editspecification'>
				<div className='familyedit'>
					<h2>
						<span>Editando la herramienta</span> {name}
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
							what='Modelo'
							valueOf={model}
							type='input'
							onUpdate={handleModelUpdate}
						/>
						<Editables
							what='Descripción'
							valueOf={description}
							type='textarea'
							onUpdate={handleDescriptionUpdate}
						/>
						<Editables
							what='Características'
							valueOf={char.join(', ')}
							type='list'
							onUpdateMany={handleUpdateChar}
							strlist={char}
						/>
						<hr></hr>
					</div>
					<div className='familycontent'>
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
							what='Subcategoría'
							valueOf={subcategoryName}
							type='select'
							onUpdate={handleSubcategoryIdUpdate}
							list={filteredSubcategories.map(item => ({
								id: item.id || 'error',
								name: item.name || 'error',
							}))}
						/>
						<hr></hr>
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
						<hr></hr>
					</div>
					<p> Imágenes: </p>
					<div className='image-upload'>
						{images &&
							images.map((preview, index) => (
								<div key={index} className='image-preview'>
									<img
										src={preview}
										alt={`preview-${index}`}
										className='image-placeholder'
									/>
									<button
										// borra la imagen del servidor?
										// onClick={() => handleRemoveImage(index)}
										// deberia de poder borrar del servidor y aqui solo cambiar la lista (borrar el string de la imagen)
										className='delete'
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
								// onChange={handleFileSelect}
								style={{ display: 'none' }}
							/>
						</div>
					</div>
				</div>
				<button onClick={handleSubmit}>subir</button>
			</div>
		</>
	);
}

function ContentMainPage() {
	const initialState = {
		spec: { id: 'N/A', name: 'Desconocido' },
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
