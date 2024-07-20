import ActionCard from '@components/ActionCard';
import HeaderTitle from '@components/HeaderTitle';
import BasePage from '@layouts/BasePage';
import HeaderApp from '@layouts/HeaderApp';
import React from 'react';
import { useLocation } from 'react-router-dom';
interface Subcategory {
	name: string;
}

interface Category {
	name: string;
	subcategories?: Subcategory[];
}

interface Family {
	name: string;
	description: string;
	categories: Category[];
}

const SubcategoryList: React.FC<{ subcategories: Subcategory[] }> = ({
	subcategories,
}) => (
	<ul className='ml-6 list-disc'>
		{subcategories.map((subcategory, index) => (
			<li key={index}>{subcategory.name}</li>
		))}
	</ul>
);

const CategoryList: React.FC<{ categories: Category[] }> = ({ categories }) => (
	<ul className='ml-4 list-disc'>
		{categories.map((category, index) => (
			<li key={index}>
				{category.name}
				{category.subcategories && (
					<SubcategoryList subcategories={category.subcategories} />
				)}
			</li>
		))}
	</ul>
);

const FamilyList: React.FC<{ families: Family[] }> = ({ families }) => (
	<div className='space-y-6'>
		{families.map((family, index) => (
			<div key={index} className='bg-white shadow rounded-lg p-6'>
				<h2 className='text-xl font-bold mb-2'>{family.name}</h2>
				<p className='text-sm text-gray-500 mb-4'>{family.description}</p>
				<div className='space-y-4'>
					{family.categories.map((category, catIndex) => (
						<div key={catIndex}>
							<Collapsible
								trigger={isOpen => (
									<div className='flex items-center py-2 cursor-pointer'>
										<span className='mr-2'>{isOpen ? '▼' : '▶'}</span>
										<span className='font-medium'>{category.name}</span>
									</div>
								)}
							>
								<CategoryList categories={category.subcategories || []} />
							</Collapsible>
						</div>
					))}
				</div>
			</div>
		))}
	</div>
);

const Collapsible: React.FC<{
	trigger: (isOpen: boolean) => React.ReactNode;
}> = ({ trigger, children }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div>
			<div onClick={() => setIsOpen(!isOpen)}>{trigger(isOpen)}</div>
			{isOpen && children}
		</div>
	);
};

function ListofFamilies() {
	const families = [
		{
			name: 'Power Tools',
			description:
				'A family of electric and battery-powered tools for construction and DIY projects.',
			categories: [
				{
					name: 'Drills',
					subcategories: [
						{
							name: 'Cordless Drills',
							subcategories: [
								{ name: '12V Drills' },
								{ name: '18V Drills' },
								{ name: '20V Drills' },
							],
						},
						{ name: 'Hammer Drills' },
						{ name: 'Impact Drivers' },
					],
				},
				{
					name: 'Saws',
					subcategories: [
						{ name: 'Circular Saws' },
						{ name: 'Reciprocating Saws' },
						{ name: 'Jigsaws' },
					],
				},
			],
		},
		{
			name: 'Hand Tools',
			description: 'Traditional non-powered tools for various tasks.',
			categories: [
				{
					name: 'Cutting Tools',
					subcategories: [
						{ name: 'Chisels' },
						{ name: 'Knives' },
						{ name: 'Scissors' },
					],
				},
				{
					name: 'Measuring Tools',
					subcategories: [
						{ name: 'Tape Measures' },
						{ name: 'Calipers' },
						{ name: 'Levels' },
					],
				},
			],
		},
	];
	return (
		<>
			<div>
				<h3>Lista de familias</h3>
				<FamilyList families={families} />
			</div>
		</>
	);
}

function ContentMainPage() {
	const location = useLocation();
	return (
		<BasePage>
			<HeaderApp />
			<main>
				<HeaderTitle title='Categorización' />
				<div className='options users'>
					<ActionCard
						title='Crear Familia'
						path={location.pathname + '/crear-familia'}
					/>
				</div>
				<ListofFamilies />
			</main>
		</BasePage>
	);
}

function CategorizationMenu() {
	return <ContentMainPage />;
}

export default CategorizationMenu;
