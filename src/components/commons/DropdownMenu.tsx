import '@components/css/dropdownmenu.css';
import DownArrow from '@components/svg/DownArrow';
import RightArrow from '@components/svg/RightArrow';
import { CategoryDataFrontend } from '@interfaces/Category.interface';
import { FamilyDataFrontend } from '@interfaces/Family.interface';
import { SubcategoryDataFrontend } from '@interfaces/subcategory.interface';
import { useState } from 'react';

interface DropdownMenuProps {
	family: FamilyDataFrontend;
	filteredCategories: CategoryDataFrontend[];
	filteredSubcategories: SubcategoryDataFrontend[];
}

function DropdownMenu({
	filteredCategories,
	filteredSubcategories,
}: DropdownMenuProps) {
	const [activeCategory, setActiveCategory] = useState<string | null>(null);

	const handleCategoryClick = (categoryId: string) => {
		setActiveCategory(prevCategoryId =>
			prevCategoryId === categoryId ? null : categoryId,
		);
	};

	return (
		<div className='dropdown'>
			<span className='dropdown-title'>Categorías:</span>
			<ul className='category-list'>
				{filteredCategories.map(category => {
					const categorySubcategories = filteredSubcategories.filter(
						subcategory => subcategory.category._id === category.id,
					);

					return (
						<li key={category.id} className='category-item'>
							<div
								className='category-header'
								onClick={() => handleCategoryClick(category.id || '')}
							>
								{category.images && category.images[0] && (
									<img
										src={category.images[0]}
										width={60}
										height={60}
										style={{ margin: '5px' }}
									></img>
								)}
								{category.name}
								{activeCategory === category.id ? (
									<RightArrow />
								) : (
									<DownArrow />
								)}
							</div>
							{activeCategory === category.id && (
								<div className='category-content'>
									{categorySubcategories.length > 0 && (
										<>
											<span className='subtitle'>Subcategorías:</span>
											<ul className='subcategory-list'>
												{categorySubcategories.map(subcategory => {
													return (
														<li
															key={subcategory.id}
															className='subcategory-item'
														>
															{subcategory.images && subcategory.images[0] && (
																<img
																	src={subcategory.images[0]}
																	width={40}
																	height={40}
																	style={{ margin: '5px' }}
																></img>
															)}
															{subcategory.name}
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
