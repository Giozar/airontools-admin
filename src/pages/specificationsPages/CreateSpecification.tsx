/* eslint-disable react-hooks/exhaustive-deps */
import AutoCompleteInput from '@components/AutoCompleteInput';
import CreateSpecs from '@components/CreateSpecs';

import HeaderTitle from '@components/HeaderTitle';
import useFetchCategoriesFromFamily from '@hooks/useFetchCategoriesFromFamily';
import useFetchFamilies from '@hooks/useFetchFamilies';
import useFetchSubcategoriesFromFamily from '@hooks/useFetchSubcategoriesFromFamily';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';

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
			<div>
				<AutoCompleteInput
					inputName='Familia'
					options={families.map(family => ({
						id: family.id || 'error',
						name: family.name || 'error',
					}))}
					onSelect={handleSelectFamily}
				/>
				{selectedFamily && (
					<AutoCompleteInput
						inputName='Categoria'
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
				{selectedCategory && (
					<AutoCompleteInput
						inputName='Subcategoria'
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
			</div>
			{selectedCategory && (
				<CreateSpecs
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
