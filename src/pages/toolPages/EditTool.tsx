import { ProductFrontend } from '@adapters/products.adapter';
import Editables from '@components/Editables';
import HeaderTitle from '@components/HeaderTitle';
import TrashIcon from '@components/svg/TrashIcon';
import useFetchCategories from '@hooks/useFetchCategories';
import useFetchFamilies from '@hooks/useFetchFamilies';
import useFetchSubcategories from '@hooks/useFetchSubcategories';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import { fetchSpecificationsByCategoryId } from '@services/specifications/fetchSpecificationsByCategoryId.service';
import { useEffect, useState } from 'react';

interface Specification {
	_id: string;
	name: string;
	description: string;
	unit: string;
	categoryId: string;
	subcategoryId: string;
}

function EditToolForm({ toolToEdit }: { toolToEdit: ProductFrontend }) {
	const id = toolToEdit.id;
	const [familyId, setFamilyId] = useState(toolToEdit.familyId);
	const [categoryId, setCategoryId] = useState(toolToEdit.categoryId);
	const [subcategoryId, setSubcategoryId] = useState(toolToEdit.subcategoryId);
	const [name, setName] = useState(toolToEdit.name);
	const [description, setDescription] = useState(toolToEdit.description);
	const [model, setModel] = useState(toolToEdit.model);
	const [images, setImages] = useState(toolToEdit.imagesUrl);
	const [char, setChar] = useState(toolToEdit.characteristics);
	const [specs, SetSpecs] = useState(toolToEdit.specifications);
	console.log(specs);
	const [familyName, setFamilyName] = useState('');
	const [categoryName, setCategoryName] = useState('');
	const [subcategoryName, setSubcategoryName] = useState('');

	function findKeyInSpecs(keyToFind: string): string | null {
		for (const spec of specs) {
			if (keyToFind in spec) {
				return spec[keyToFind];
			}
		}
		return null; // Return null if the key is not found in any object
	}

	const { families } = useFetchFamilies();
	const { categories, filteredCategories, setFilteredCategories } =
		useFetchCategories();
	const { subcategories, filteredSubcategories, setFilteredSubcategories } =
		useFetchSubcategories();

	const handleNameUpdate = (newValue: string) => {
		setName(newValue);
	};

	const handleDescriptionUpdate = (newValue: string) => {
		setDescription(newValue);
	};
	const handleModelUpdate = (newValue: string) => {
		setModel(newValue);
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

	const [specifications, setSpecifications] = useState<Specification[]>([]);

	useEffect(() => {
		console.log(categoryId);
		const getSpecifications = async () => {
			try {
				const data = await fetchSpecificationsByCategoryId(categoryId);
				console.log(data);
				setSpecifications(data);
			} catch (error) {
				console.error('fallo :(');
			}
		};
		getSpecifications();
	}, [categoryId]);

	const handleUpdateChar = (newValues: string[]) => {
		setChar(newValues);
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
							what='SubCategoría'
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
							specifications.map(spec => (
								<div key={spec._id}>
									<Editables
										what={spec.name}
										valueOf={findKeyInSpecs(spec._id) || 'N/A'}
										unit={spec.unit}
										type='input'
										onUpdate={handleModelUpdate}
									/>
									<p></p>
								</div>
							))}
						<hr></hr>
					</div>
					<p> Imágenes: </p>
					<div className='image-upload'>
						{images.map((preview, index) => (
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
