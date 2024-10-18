import { useAlertHelper } from '@contexts/Alert/alert.helper';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useFamilyCreateContext } from '@contexts/categorization/FamilyContext';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import { FamilyDataFrontend } from '@interfaces/Family.interface';
import { createCategoryService } from '@services/categories/createCategory.service';
import { deleteCategoryService } from '@services/categories/deleteCategory.service';
import { getcategoryByFamilyIdService } from '@services/categories/getCategoriesByCategorization.service';
import { updateCategoryService } from '@services/categories/updateCategory.service';
import { deleteFamilyService } from '@services/families/deleteFamily.service';
import { getFamilyService } from '@services/families/getFamily.service';
import { updateFamilyService } from '@services/families/updateFamily.service';
import { deleteFileService } from '@services/files/deleteFile.service';
import uploadFileService from '@services/files/fileUpload.service';
import { createSubcategoryService } from '@services/subcategories/createSubcategory.service';
import { deleteSubcategoryService } from '@services/subcategories/deleteSubcategory.service';
import { getSubcategoryByFamilyIdService } from '@services/subcategories/getSubcategoriesByCategorization.service';
import { updateSubcategoryService } from '@services/subcategories/updateSubcategory.service';
import { errorHandler } from '@utils/errorHandler.util';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function useEditCategorization() {
	const { ...familyToEdit } = useFamilyCreateContext();
	const { showError, showSuccess } = useAlertHelper();
	const { user } = useAuthContext();
	const {
		addCategoryInstance,
		getCategoryInstance,
		getAllCategoryInstances,
		removeCreateModeCategories,
		resetCategoryInstances,
	} = useCategoryCreateContext();
	const {
		addSubcategoryInstance,
		getSubcategoryInstance,
		getAllSubcategoryInstances,
		removeCreateModeSubcategories,
		resetSubcategoryInstances,
	} = useSubcategoryCreateContext();
	const subcategoryInstances = getAllSubcategoryInstances();
	const categoryInstances = getAllCategoryInstances();
	const navigate = useNavigate();
	const location = useLocation();

	const { familyId } = useParams();
	// useEffect para obtener los datos de familia, categorías y subcategorías
	useEffect(() => {
		// Función para obtener los datos de la familia
		const getFamilyData = async () => {
			if (!familyId) return;
			try {
				const response = await getFamilyService(familyId);
				if (!response)
					throw new Error('no se pudo obtener datos de la familia');
				const imageUrl = response.images ? response.images[0] : '';
				familyToEdit.setId(response.id);
				familyToEdit.setName(response.name);
				familyToEdit.setDescription(response.description || '');
				familyToEdit.setImage(imageUrl);
				familyToEdit.setCreatedBy(response.createdBy.id);
			} catch (error) {
				showError('No se pudo obtener la familia', error);
			}
		};

		// Función para obtener los datos de las categorías
		const getCategoryData = async () => {
			if (!familyId) return;
			try {
				const response = await getcategoryByFamilyIdService(familyId);
				if (response.length === 0) return;

				for (const category of response.values()) {
					const imageUrl = category.images ? category.images[0] : '';
					const instanceId = category.id;

					addCategoryInstance(instanceId, {
						id: category.id,
						name: category.name,
						description: category.description,
						family: category.family.id,
						image: imageUrl,
						mode: 'edit',
						createdBy: category.createdBy.id,
					});
				}
			} catch (error) {
				showError('No se pudo obtener las categorias', error);
			}
		};

		// Función para obtener los datos de las subcategorías
		const getSubcategoryData = async () => {
			if (!familyId) return;
			try {
				const response = await getSubcategoryByFamilyIdService(familyId);
				if (response.length === 0) return;
				response.forEach(subcategory => {
					const instanceId = subcategory.id;
					addSubcategoryInstance(instanceId, {
						id: subcategory.id,
						name: subcategory.name,
						description: subcategory.description,
						family: subcategory.family.id,
						category: subcategory.category._id,
						image: subcategory.images ? subcategory.images[0] : '',
						mode: 'edit',
						createdBy: subcategory.createdBy.id,
					});
				});
			} catch (error) {
				showError('No se pudo obtener las subcategorias', error);
			}
		};
		// Llamado a las funciones de obtención de datos
		if (familyId) {
			getFamilyData();
			getCategoryData();
			getSubcategoryData();
		}
	}, [familyId]);

	useEffect(() => {
		familyToEdit.resetFamilyValues();
		resetCategoryInstances();
		resetSubcategoryInstances();
	}, []);

	// Función general para manejar la actualización de datos
	const handleUpdate = async (
		updateService: (id: string, data: any) => Promise<void>,
		item: any,
	) => {
		try {
			let img = item.image;
			if (item.imageToDelete && item.image) {
				await deleteFileService(item.image);
				img = '';
			}

			if (item.rawImage && item.id) {
				if (item.image) await deleteFileService(item.image);
				img = (await handleRawImageUpload(item.rawImage, item.id)) || '';
			}

			await updateService(item.id, {
				...item,
				images: [img],
			});
			showSuccess(`${item.name} actualizado`);
		} catch (error) {
			showError(`No se pudo actualizar ${item.name}`, error);
			console.error(`Error actualizando ${item.name}:`, error);
		}
	};

	// Función para manejar la carga de imágenes
	const handleRawImageUpload = async (rawImage: File, id: string) => {
		try {
			if (rawImage === null) return;
			const url = await uploadFileService(rawImage, 'images', id);
			return url;
		} catch (error) {
			throw errorHandler(error);
		}
	};

	// Función para borrar una familia
	const handleDeleteFamily = async (familyId: string) => {
		if (!familyId)
			throw new Error(`No existe la familia con el id ${familyId}`);
		try {
			await deleteFamilyService(familyId);
			showSuccess('Familia borrada');
		} catch (error) {
			showError('no se pudo borrar familia', error);
		}
	};

	// Función para borrar una categoría
	const handleDeleteCategory = async (categoryId: string) => {
		try {
			if (!categoryId)
				throw new Error(`No existe la categoría con el id ${categoryId}`);
			await deleteCategoryService(categoryId);
			showSuccess('Categoría borrada');
		} catch (error) {
			showError('no se pudo borrar categoría', error);
		}
	};

	// Función para borrar una subcategoría
	const handleDeleteSubcategory = async (subcategoryId: string) => {
		try {
			if (!subcategoryId)
				throw new Error(`No existe la categoría con el id ${subcategoryId}`);
			await deleteSubcategoryService(subcategoryId);
			showSuccess('Subcategoría borrada');
		} catch (error) {
			showError('no se pudo borrar subcategoria', error);
		}
	};

	// Funciones específicas de actualización
	const handleUpdateFamily = async () => {
		await handleUpdate(updateFamilyService, familyToEdit);
	};

	const handleUpdateCategory = async (key: string) => {
		const category = getCategoryInstance(key);
		if (category) {
			await handleUpdate(updateCategoryService, category);
		}
	};

	const handleUpdateSubcategory = async (key: string) => {
		const subcategory = getSubcategoryInstance(key);
		if (subcategory) {
			await handleUpdate(updateSubcategoryService, subcategory);
		}
	};

	// Funciones de creación de categorías y subcategorías
	const handleCreateSubcategory = async () => {
		try {
			if (!user) return;
			console.log('Subcategorias creadas');
			console.log(subcategoryInstances);
			let categoryId = '';
			for (const subcategory of subcategoryInstances) {
				if (subcategory.mode !== 'create') continue;
				const subcategoryId = await createSubcategoryService({
					name: subcategory.name,
					description: subcategory.description,
					createdBy: user.id,
					images: [],
					family: familyToEdit.id,
					category: subcategory.category,
				});
				console.log('ID de la subcategoría:', subcategoryId._id);
				categoryId = subcategory.category;
				const uploadedSubcategoryImageUrl = subcategory.rawImage
					? await handleRawImageUpload(subcategory.rawImage, subcategoryId._id)
					: '';
				if (uploadedSubcategoryImageUrl) {
					await updateSubcategoryService(subcategoryId._id, {
						images: [uploadedSubcategoryImageUrl],
					});
				}
			}
			removeCreateModeSubcategories();
			addSubcategoryInstance(`subcat-${Date.now()}`, { category: categoryId });
			showSuccess('Subcategorías creadas con éxito');
		} catch (error) {
			showError('no se pudo crear subcategorias', error);
		}
	};

	const handleCreateCategory = async () => {
		try {
			if (!user) return;
			console.log('Categorías creadas');
			for (const category of categoryInstances) {
				if (category.mode !== 'create') continue;

				const categoryId = await createCategoryService({
					name: category.name,
					description: category.description,
					createdBy: user.id,
					images: [],
					family: familyToEdit.id,
				});
				console.log('ID de la categoría:', categoryId._id);

				const uploadedCategoryImageUrl = category.rawImage
					? await handleRawImageUpload(category.rawImage, categoryId._id)
					: '';
				if (uploadedCategoryImageUrl) {
					await updateCategoryService(categoryId._id, {
						images: [uploadedCategoryImageUrl],
					});
				}
			}
			removeCreateModeCategories();
			addCategoryInstance(`cat-${Date.now()}`, {});
			showSuccess('Categorías creadas con exito');
		} catch (error) {
			showError('no se pudo crear categorias', error);
		}
	};

	const handleEditCategorization = (family: FamilyDataFrontend) => {
		navigate(`${location.pathname}/editar-familia/${family.id}`);
	};

	return {
		handleUpdateFamily,
		handleCreateCategory,
		handleCreateSubcategory,
		handleUpdateCategory,
		handleUpdateSubcategory,
		handleDeleteFamily,
		handleDeleteCategory,
		handleDeleteSubcategory,
		handleEditCategorization,
	};
}
