import '@components/css/dropdownmenu.css';
import { CategoryDataFrontend } from '@interfaces/Category.interface';
import { FamilyDataFrontend } from '@interfaces/Family.interface';
import { SpecDataFrontend } from '@interfaces/Specifications.interface';
import { SubcategoryDataFrontend } from '@interfaces/subcategory.interface';
import { useState } from 'react';
import DownArrow from './svg/DownArrow';
import RightArrow from './svg/RightArrow';
interface props {
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
}: props) {
	const [activeCategory, setActiveCategory] = useState<string | null>(null);

	const handleCategoryClick = (categoryId: string) => {
		setActiveCategory(prevCategoryId =>
			prevCategoryId === categoryId ? '' : categoryId,
		);
	};

	return (
		<div className='dropdown'>
			<span>Categorías:</span>
			<div className='dropdown-content'>
				<ul>
					{filteredCategories
						.filter(category => category.family.id === family.id)
						.map(category => (
							<li key={category.id}>
								<div onClick={() => handleCategoryClick(category.id || '')}>
									{category.name}
									{activeCategory === category.id ? (
										<RightArrow />
									) : (
										<DownArrow />
									)}
								</div>
								{activeCategory === category.id && (
									<>
										{specifications.some(
											specs =>
												specs.category._id === category.id &&
												!specs.subcategory._id,
										) && <span>Especificaciones:</span>}
										<ul>
											{specifications
												.filter(
													specs =>
														specs.category._id === category.id &&
														!specs.subcategory._id,
												)
												.map(specs => (
													<li key={specs.id}>
														{specs.name} {specs.unit && `(${specs.unit})`}
													</li>
												))}
										</ul>
										{filteredSubcategories.some(
											subcategory => subcategory.category._id === category.id,
										) && <span>Subcategorias:</span>}
										<ul>
											{filteredSubcategories
												.filter(
													subcategory =>
														subcategory.category._id === category.id,
												)
												.map(subcategory => (
													<>
														<li key={subcategory.id}>{subcategory.name}</li>
														{specifications.some(
															specs => specs.subcategory._id === subcategory.id,
														) && <span>Especificaciones:</span>}
														<ul>
															{specifications
																.filter(
																	specs =>
																		specs.subcategory._id === subcategory.id,
																)
																.map(specs => (
																	<li key={`spec${specs.id}`}>
																		{specs.name}
																		{specs.unit && `(${specs.unit})`}
																	</li>
																))}
														</ul>
													</>
												))}
										</ul>
									</>
								)}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}

export default DropdownMenu;
