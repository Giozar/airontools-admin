/* eslint-disable react-hooks/exhaustive-deps */
import AutoCompleteInput from '@components/AutoCompleteInput';
import HeaderTitle from '@components/HeaderTitle';
import useFetchCategoriesFromFamily from '@hooks/useFetchCategoriesFromFamily';
import useFetchFamilies from '@hooks/useFetchFamilies';
import useFetchSubcategoriesFromFamily from '@hooks/useFetchSubcategoriesFromFamily';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import '@pages/css/createSpecification.css';
import { useEffect, useState } from 'react';

interface Especificacion {
	name: string;
	descripcion: string;
	unidades: string;
}
function Specifications({
	familyId,
	categoryId,
	subcategoryId,
}: {
	familyId: string;
	categoryId: string;
	subcategoryId?: string;
}) {
	const [specifications, setSpecifications] = useState<Especificacion[]>([]);
	const [specificationsCounter, setSpecificationsCounter] = useState<number>(0);

	const addSpecifications = () => {
		setSpecificationsCounter(specificationsCounter + 1);
		setSpecifications([
			...specifications,
			{ name: '', descripcion: '', unidades: '' },
		]);
	};

	const borrarEspecificacion = (index: number) => {
		setSpecifications(specifications.filter((_, i) => i !== index));
	};

	const handleInputChangeInSpec = (
		index: number,
		field: keyof Especificacion,
		value: string,
	) => {
		const newspecifications = [...specifications];
		newspecifications[index] = {
			...newspecifications[index],
			[field]: value,
		};
		setSpecifications(newspecifications);
	};

	const saveSpecifications = () => {
		const datos = {
			familyId,
			categoryId,
			subcategoryId,
			specifications,
		};
		console.log(JSON.stringify(datos));
		alert('specifications guardadas. Revisa la consola para ver los datos.');
	};
	return (
		<div id='specifications'>
			{specifications.map((especificacion, index) => (
				<div
					key={index}
					id={`especificacion-${index}`}
					className='especificacion'
				>
					<p>Especificación {index + 1}</p>
					<form className='form-group'>
						<input
							type='text'
							placeholder='Name'
							value={especificacion.name}
							onChange={e =>
								handleInputChangeInSpec(index, 'name', e.target.value)
							}
							required
						/>
						<textarea
							placeholder='Descripción'
							value={especificacion.descripcion}
							onChange={e =>
								handleInputChangeInSpec(index, 'descripcion', e.target.value)
							}
						/>
						<input
							type='text'
							placeholder='Unidades'
							value={especificacion.unidades}
							onChange={e =>
								handleInputChangeInSpec(index, 'unidades', e.target.value)
							}
						/>
					</form>
					<button
						onClick={() => borrarEspecificacion(index)}
						className='delete'
					>
						Borrar
					</button>
				</div>
			))}
			<button onClick={addSpecifications}>Agregar Especificación</button>
			<button onClick={saveSpecifications}>Guardar specifications</button>
		</div>
	);
}

function FamilySpecifications() {
	const { families } = useFetchFamilies();
	const { categories, fetchCategories } = useFetchCategoriesFromFamily();
	const { subcategories, fetchSubcategories } =
		useFetchSubcategoriesFromFamily();
	const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
		null,
	);
	const [clearInputCategory, setClearInputCategory] = useState(false);
	const [clearInputSubcategory, setClearInputSubcategory] = useState(false);
	useEffect(() => {
		if (selectedFamily) {
			fetchCategories(selectedFamily);
			setSelectedCategory(null);
			setClearInputCategory(!clearInputCategory);
		}
	}, [selectedFamily]);

	useEffect(() => {
		if (selectedFamily && selectedCategory) {
			fetchSubcategories(selectedCategory);
			setClearInputSubcategory(!clearInputSubcategory);
		}
	}, [selectedCategory]);

	useEffect(() => {
		setSelectedSubcategory(null);
	}, [selectedFamily, selectedCategory]);

	const handleSelectFamily = (value: string) => {
		setSelectedFamily(value);
	};

	const handleSelectCategory = (value: string) => {
		setSelectedCategory(value);
	};

	const handleSelectSubcategory = (value: string) => {
		setSelectedSubcategory(value);
	};

	return (
		<>
			<div>
				<AutoCompleteInput
					inputName='Familia'
					options={families.map(family => ({
						id: family.id || 'error',
						name: family.name || 'error',
					}))}
					onSelect={handleSelectFamily}
				/>
				{selectedFamily && <p>Seleccionado: {selectedFamily}</p>}
				{selectedFamily && (
					<AutoCompleteInput
						inputName='Categorias'
						options={categories.map(category =>
							category.familyId === selectedFamily
								? {
										id: category.id || 'error',
										name: category.name || 'error',
									}
								: { id: '', name: '' },
						)}
						onSelect={handleSelectCategory}
						clearInput={clearInputCategory}
					/>
				)}
				{selectedCategory && <p>Seleccionado: {selectedCategory}</p>}
				{selectedCategory && (
					<AutoCompleteInput
						inputName='Subcategorias'
						options={subcategories.map(subcategory =>
							subcategory.categoryId === selectedCategory
								? {
										id: subcategory.id || 'error',
										name: subcategory.name || 'error',
									}
								: { id: '', name: '' },
						)}
						onSelect={handleSelectSubcategory}
						clearInput={clearInputSubcategory}
					/>
				)}
				{selectedSubcategory && <p>Seleccionado: {selectedSubcategory}</p>}
			</div>
			{selectedCategory && (
				<Specifications
					familyId={selectedFamily || ''}
					categoryId={selectedCategory || ''}
					subcategoryId={selectedSubcategory || ''}
				/>
			)}
		</>
	);
}

function ContentMainPage() {
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Crear Especificaciones' />
				<FamilySpecifications />
			</main>
		</BasePage>
	);
}

function CreateSpecification() {
	return <ContentMainPage />;
}

export default CreateSpecification;
