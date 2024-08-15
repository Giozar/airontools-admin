import '@components/css/dropdownmenu.css';
import DownArrow from '@components/svg/DownArrow';
import RightArrow from '@components/svg/RightArrow';
import { CategoryDataFrontend } from '@interfaces/Category.interface';
import { FamilyDataFrontend } from '@interfaces/Family.interface';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { SubcategoryDataFrontend } from '@interfaces/subcategory.interface';
import { useState } from 'react';

interface DropdownMenuProps {
	family: FamilyDataFrontend;
	filteredCategories: CategoryDataFrontend[];
	filteredSubcategories: SubcategoryDataFrontend[];
	specifications: SpecDataFrontend[];
}

function DropdownMenu({
	filteredCategories,
	filteredSubcategories,
	specifications,
	family,
}: DropdownMenuProps) {
	const [activeCategory, setActiveCategory] = useState<string | null>(null);

	const handleCategoryClick = (categoryId: string) => {
		setActiveCategory(prevCategoryId =>
			prevCategoryId === categoryId ? null : categoryId,
		);
	};

	const renderSpecifications = (specs: SpecDataFrontend[]) => (
		<>
			<span className='subtitle'>Especificaciones:</span>
			<ul className='specs-list'>
				{specs.map(spec => (
					<li key={spec.id}>
						{spec.name} {spec.unit && `(${spec.unit})`}
					</li>
				))}
			</ul>
		</>
	);

	return (
		<div className='dropdown'>
			<span className='dropdown-title'>Categorías:</span>
			<ul className='category-list'>
				{filteredCategories
					.filter(category => category.family.id === family.id)
					.map(category => {
						const categorySpecs = specifications.filter(
							spec =>
								spec.category._id === category.id && !spec.subcategory._id,
						);
						const categorySubcategories = filteredSubcategories.filter(
							subcategory => subcategory.category._id === category.id,
						);

						return (
							<li key={category.id} className='category-item'>
								<div
									className='category-header'
									onClick={() => handleCategoryClick(category.id || '')}
								>
									{category.name}
									{activeCategory === category.id ? (
										<RightArrow />
									) : (
										<DownArrow />
									)}
								</div>
								{activeCategory === category.id && (
									<div className='category-content'>
										{categorySpecs.length > 0 &&
											renderSpecifications(categorySpecs)}
										{categorySubcategories.length > 0 && (
											<>
												<span className='subtitle'>Subcategorías:</span>
												<ul className='subcategory-list'>
													{categorySubcategories.map(subcategory => {
														const subcategorySpecs = specifications.filter(
															spec => spec.subcategory._id === subcategory.id,
														);
														return (
															<li
																key={subcategory.id}
																className='subcategory-item'
															>
																{subcategory.name}
																{subcategorySpecs.length > 0 &&
																	renderSpecifications(subcategorySpecs)}
															</li>
														);
													})}
												</ul>
											</>
										)}
									</div>
								)}
							</li>
						);
					})}
			</ul>
		</div>
	);
}

export default DropdownMenu;
