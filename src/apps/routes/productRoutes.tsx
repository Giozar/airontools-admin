import { CategoryCreateProvider } from '@contexts/categorization/CategoryContext';
import { FamilyCreateProvider } from '@contexts/categorization/FamilyContext';
import { SubcategoryCreateProvider } from '@contexts/categorization/SubcategoryContext';
import { ProductCreateProvider } from '@contexts/product/ProductContext';
import { SpecificationProvider } from '@contexts/specification/SpecificationContext';
import CategorizationMenu from '@pages/CategorizationPages/CategorizationMenu';
import CreateCategorization from '@pages/CategorizationPages/Create/CreateCategorization';
import CreateCategoryPage from '@pages/CategorizationPages/Edit/CreateCategoryPage';
import CreateSubcategoryPage from '@pages/CategorizationPages/Edit/CreateSubcategoryPage';
import EditCategorization from '@pages/CategorizationPages/Edit/EditCategorization';
import EditCategoryPage from '@pages/CategorizationPages/Edit/EditCategoryPage';
import EditSubcategoryPage from '@pages/CategorizationPages/Edit/EditSubcategoryPage';
import CreateProductPage from '@pages/productPages/CreateProductPage';
import EditProductPage from '@pages/productPages/EditProductPage';
import ToolMenu from '@pages/productPages/ProductMenu';
import CreateSpecification from '@pages/specificationsPages/CreateSpecification';
import EditSpecification from '@pages/specificationsPages/EditSpecification';
import ListOfSpecs from '@pages/specificationsPages/ListOfSpecs';

export const specificationRoutes = () => {
	return [
		{
			path: 'crear-especificaciones',
			element: (
				<SpecificationProvider>
					<CreateSpecification />
				</SpecificationProvider>
			),
		},
		{
			path: 'editar-especificacion',
			element: (
				<SpecificationProvider>
					<EditSpecification />
				</SpecificationProvider>
			),
		},
	];
};
export const toolRoutes = () => {
	return [
		{
			path: 'crear-herramienta',
			element: (
				<ProductCreateProvider>
					<CreateProductPage />
				</ProductCreateProvider>
			),
		},
		{
			path: 'editar-herramienta',
			element: (
				<ProductCreateProvider>
					<EditProductPage />
				</ProductCreateProvider>
			),
		},
	];
};
export const categorizationRoutes = () => {
	return [
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
			path: 'editar-familia',
			children: editFamilyRoutes(),
		},

		{
			path: 'especificaciones',
			element: <ListOfSpecs />,
		},
		{
			path: 'especificaciones',
			children: specificationRoutes(),
		},
	];
};

export const editFamilyRoutes = () => {
	return [
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
			path: 'editar-categoria',
			children: editCategoryRoutes(),
		},
	];
};

export const editCategoryRoutes = () => {
	return [
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
};

export const productRoutes = () => {
	return [
		{
			path: 'especificaciones',
			element: <ListOfSpecs />,
		},
		{
			path: 'especificaciones',
			children: specificationRoutes(),
		},
		{
			path: 'herramientas',
			element: <ToolMenu />,
		},

		{
			path: 'herramientas',

			children: toolRoutes(),
		},
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
			children: categorizationRoutes(),
		},
	];
};
