import { specificationRoutes } from '@apps/routes/products/specificationRoutes';
import { CategoryCreateProvider } from '@contexts/categorization/CategoryContext';
import { FamilyCreateProvider } from '@contexts/categorization/FamilyContext';
import { SubcategoryCreateProvider } from '@contexts/categorization/SubcategoryContext';
import CategorizationMenu from '@pages/CategorizationPages/CategorizationMenu';
import CreateCategorization from '@pages/CategorizationPages/Create/CreateCategorization';
import CreateCategoryPage from '@pages/CategorizationPages/Edit/CreateCategoryPage';
import CreateSubcategoryPage from '@pages/CategorizationPages/Edit/CreateSubcategoryPage';
import EditCategorization from '@pages/CategorizationPages/Edit/EditCategorization';
import EditCategoryPage from '@pages/CategorizationPages/Edit/EditCategoryPage';
import EditSubcategoryPage from '@pages/CategorizationPages/Edit/EditSubcategoryPage';
import EditCategorizationRedirect from '@pages/Redirects/EditCategorizationRedirect';

export const categorizationRoutes = () => [
	{
		path: 'categorizacion',
		element: (
			<FamilyCreateProvider>
				<CategoryCreateProvider>
					<SubcategoryCreateProvider>
						<CategorizationMenu />
					</SubcategoryCreateProvider>
				</CategoryCreateProvider>
			</FamilyCreateProvider>
		),
	},
	{
		path: 'categorizacion',
		children: specificationRoutes(),
	},
	{
		path: 'categorizacion',
		children: createEditFamilyRoutes(),
	},
];

export const createEditFamilyRoutes = () => [
	{
		path: 'crear-familia',
		element: (
			<FamilyCreateProvider>
				<CategoryCreateProvider>
					<SubcategoryCreateProvider>
						<CreateCategorization />
					</SubcategoryCreateProvider>
				</CategoryCreateProvider>
			</FamilyCreateProvider>
		),
	},
	{
		path: 'editar-familia',
		element: <EditCategorizationRedirect />,
	},
	{
		path: 'editar-familia',
		children: editFamilyRoutes(),
	},
];

export const editFamilyRoutes = () => [
	{
		path: ':familyId',
		element: (
			<FamilyCreateProvider>
				<CategoryCreateProvider>
					<SubcategoryCreateProvider>
						<EditCategorization />
					</SubcategoryCreateProvider>
				</CategoryCreateProvider>
			</FamilyCreateProvider>
		),
	},
	{
		path: ':familyId',
		children: createEditCategoryRoutes(),
	},
];

export const createEditCategoryRoutes = () => [
	{
		path: 'crear-categoria',
		element: (
			<FamilyCreateProvider>
				<CategoryCreateProvider>
					<SubcategoryCreateProvider>
						<CreateCategoryPage />
					</SubcategoryCreateProvider>
				</CategoryCreateProvider>
			</FamilyCreateProvider>
		),
	},
	{
		path: 'editar-categoria',
		element: <EditCategorizationRedirect />,
	},
	{
		path: 'editar-categoria',
		children: editCategoryRoutes(),
	},
];

export const editCategoryRoutes = () => [
	{
		path: ':categoryId',
		element: (
			<FamilyCreateProvider>
				<CategoryCreateProvider>
					<SubcategoryCreateProvider>
						<EditCategoryPage />
					</SubcategoryCreateProvider>
				</CategoryCreateProvider>
			</FamilyCreateProvider>
		),
	},
	{
		path: ':categoryId',
		children: createEditSubcategoryRoutes(),
	},
];

export const createEditSubcategoryRoutes = () => [
	{
		path: 'crear-subcategoria',
		element: (
			<FamilyCreateProvider>
				<CategoryCreateProvider>
					<SubcategoryCreateProvider>
						<CreateSubcategoryPage />
					</SubcategoryCreateProvider>
				</CategoryCreateProvider>
			</FamilyCreateProvider>
		),
	},
	{
		path: 'editar-subcategoria',
		element: <EditCategorizationRedirect />,
	},
	{
		path: 'editar-subcategoria',
		children: editSubcategoryRoutes(),
	},
];

export const editSubcategoryRoutes = () => [
	{
		path: ':subcategoryId',
		element: (
			<FamilyCreateProvider>
				<CategoryCreateProvider>
					<SubcategoryCreateProvider>
						<EditSubcategoryPage />
					</SubcategoryCreateProvider>
				</CategoryCreateProvider>
			</FamilyCreateProvider>
		),
	},
];
