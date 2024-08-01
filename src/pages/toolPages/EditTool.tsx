import {
	ProductFrontend,
	transformProductDataBack,
} from '@adapters/products.adapter';
import { SpecsFrontend } from '@adapters/specifications.adapter';
import Editables from '@components/Editables';
import HeaderTitle from '@components/HeaderTitle';
import TrashIcon from '@components/svg/TrashIcon';
import useToolCategorizationEdit from '@hooks/useToolCategorizationEdit';

import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import { fetchSpecificationsByCategoryId } from '@services/specifications/fetchSpecificationsByCategoryId.service';
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
	const id = toolToEdit.id;
	const [name, setName] = useState(toolToEdit.name);
	const [description, setDescription] = useState(toolToEdit.description);
	const [model, setModel] = useState(toolToEdit.model);
	const [images] = useState(toolToEdit.imagesUrl);
	const [char, setChar] = useState(toolToEdit.characteristics);
	const [specs, setSpecs] = useState(toolToEdit.specifications);
	const [specifications, setSpecifications] = useState<SpecsFrontend[]>([]);

	const handleNameUpdate = (newValue: string) => {
		setName(newValue);
	};

	const handleDescriptionUpdate = (newValue: string) => {
		setDescription(newValue);
	};
	const handleModelUpdate = (newValue: string) => {
		setModel(newValue);
	};
	const editOrCreateKeyInSpecs = (keyToFind: string, newValue: string) => {
		let keyFound = false;
		const updatedSpecs = specs.map(spec => {
			if (keyToFind in spec) {
				keyFound = true;
				return { ...spec, [keyToFind]: newValue };
			}
			return spec;
		});

		if (!keyFound) {
			updatedSpecs.push({ [keyToFind]: newValue });
		}

		setSpecs(updatedSpecs);
	};
	const findKeyInSpecs = (keyToFind: string) => {
		for (const spec of specs) {
			if (keyToFind in spec) {
				return spec[keyToFind];
			}
		}
		return null;
	};

	const handleSpecUpdate = (newValue: string, index: number) => {
		console.log(editOrCreateKeyInSpecs(specifications[index - 1].id, newValue));
	};
	const [flag, setFlag] = useState(true);
	useEffect(() => {
		if (!flag) setSpecs([]);
		if (flag) {
			setFlag(false);
		}
		const getSpecifications = async () => {
			try {
				const data = await fetchSpecificationsByCategoryId(categoryId);
				setSpecifications(data);
			} catch (error) {
				console.error('fallo :(');
			}
		};
		getSpecifications();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId]);

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
					specifications: specs,
				}),
			);
			alert('Herramienta actualizada con exito!');
		} catch (error) {
			console.error('Error editing tool:', error);
		}
	};

	return (
		<>
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
