/* eslint-disable react-hooks/exhaustive-deps */
import SelectInput from '@components/commons/SelectInput';
import CreateSpecs from '@components/CreateSpecs';

import useFetchCategoriesFromFamily from '@hooks/categories/useFetchCategoriesFromFamily';
import useFetchFamilies from '@hooks/families/useFetchFamilies';
import useFetchSubcategoriesFromFamily from '@hooks/subcategories/useFetchSubcategoriesFromFamily';
import BasePage from '@layouts/BasePage';

import { useEffect, useState } from 'react';

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
			<div style={{ width: '50%' }}>
				<SelectInput
					key={selectedFamily}
					id='familiaselect'
					name='Selecciona una familia'
					options={families.map(family => ({
						value: family.id,
						label: family.name,
					}))}
					onChange={handleSelectFamily}
				/>
				{categories.length > 0 && (
					<SelectInput
						id='catselect'
						name='Selecciona una categoría'
						options={categories.map(category => ({
							value: category.id,
							label: category.name,
						}))}
						onChange={handleSelectCategory}
					/>
				)}
				{subcategories.length > 0 && (
					<SelectInput
						id='subcatselect'
						name='Selecciona una subcategoría'
						options={subcategories.map(subcategory => ({
							value: subcategory.id,
							label: subcategory.name,
						}))}
						onChange={handleSelectSubcategory}
					/>
				)}
				<hr></hr>
			</div>
			{/* Se tiene que repetir para evitar el bug de que no se guarden las subcategorias */}
			{selectedFamily && selectedCategory && selectedSubcategory && (
				<CreateSpecs
					familyId={selectedFamily}
					categoryId={selectedCategory}
					subcategoryId={selectedSubcategory}
				/>
			)}
			{selectedFamily && selectedCategory && !selectedSubcategory && (
				<CreateSpecs
					familyId={selectedFamily}
					categoryId={selectedCategory}
					subcategoryId={selectedSubcategory}
				/>
			)}
		</>
	);
}

function ContentMainPage() {
	return (
		<BasePage title='Crear Especificaciones'>
			<FamilySpecifications />
		</BasePage>
	);
}

function CreateSpecification() {
	return <ContentMainPage />;
}

export default CreateSpecification;
