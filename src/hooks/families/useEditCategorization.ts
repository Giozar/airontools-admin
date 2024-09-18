import { airontoolsAPI } from '@configs/api.config';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useFamilyCreateContext } from '@contexts/categorization/FamilyContext';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import useCategoryCreate from '@hooks/categories/useCategoryCreate';
import useSubcategoryCreate from '@hooks/subcategories/useSubcategoryCreate';
import { deleteCategory } from '@services/categories/deleteCategory.service';
import { getcategoryByFamilyId } from '@services/categories/getCategoriesByCategorization.service';
import { deleteFamilyService } from '@services/families/deleteFamily.service';
import { deleteFileService } from '@services/files/deleteFile.service';
import uploadFileService from '@services/files/fileUpload.service';
import { deleteSubcategoryService } from '@services/subcategories/deleteSubcategory.service';
import { getSubcategoryByFamilyId } from '@services/subcategories/getSubcategoriesByCategorization.service';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useEditCategorization() {
	const { ...familyToEdit } = useFamilyCreateContext();
	const { user } = useAuthContext();
	const { addCategoryInstance, getCategoryInstance, getAllCategoryInstances } =
		useCategoryCreateContext();
	const {
		addSubcategoryInstance,
		getSubcategoryInstance,
		getAllSubcategoryInstances,
	} = useSubcategoryCreateContext();
	const subcategoryInstances = getAllSubcategoryInstances();
	const categoryInstances = getAllCategoryInstances();
	const { createSubcategory } = useSubcategoryCreate();
	const { createCategory } = useCategoryCreate();

	const location = useLocation();
	const family = location.state?.familyId;
	//Obten los valores de para editar xdxdxd

	useEffect(() => {
		const getFamilyData = async () => {
			const response = await axios.get(`${airontoolsAPI}/families/${family}`);
			const imageUrl = response.data.images ? response.data.images[0] : '';
			familyToEdit.setId(response.data._id);
			familyToEdit.setName(response.data.name);
			familyToEdit.setDescription(response.data.description);
			familyToEdit.setImage(imageUrl);
		};

		const getCategoryData = async () => {
			try {
				const response = await getcategoryByFamilyId(family);
				if (response.length === 0) return;

				for (const [index, category] of response.entries()) {
					const imageUrl = category.images ? category.images[0] : '';
					const instanceId = 'cat' + index;

					addCategoryInstance(instanceId, {
						id: category.id,
						name: category.name,
						description: category.description,
						family: category.family.id,
						image: imageUrl,
						mode: 'edit',
					});
				}
			} catch (error) {
				console.error('Error al obtener los datos de la categoría:', error);
			}
		};

		const getSubcategoryData = async () => {
			const response = await getSubcategoryByFamilyId(family);
			if (response.length === 0) return;
			response.forEach((subcategory, index) => {
				const instanceId = 'cat' + index;
				addSubcategoryInstance(instanceId, {
					id: subcategory.id,
					name: subcategory.name,
					description: subcategory.description,
					family: subcategory.family.id,
					category: subcategory.category._id,
					image: subcategory.images ? subcategory.images[0] : '',
					mode: 'edit',
				});
			});
		};
		getSubcategoryData();
		getFamilyData();
		getCategoryData();
	}, [family]);

	const handleRawImageUpload = async (rawImage: File, id: string) => {
		try {
			if (rawImage === null) return;
			const url = await uploadFileService(rawImage, 'image', id);
			console.log('Imagen subida ', url);
			return url;
		} catch (error) {
			console.error('No se pudo subir archivos:', rawImage, error);
			alert('no se pudo subir el archivo');
		}
	};

	const handleDeleteFile = async (fileId: string) => {
		try {
			await deleteFileService(fileId);
		} catch (error) {
			console.error(`Error al eliminar archivo ${fileId}:`, error);
			alert('no se pudo borrar el archivo');
		}
	};

	const handleDeleteFamily = async (familyId: string) => {
		try {
			await deleteFamilyService(familyId);
			console.log('borrefamailia');
			alert('Familia borrada');
			setTimeout(() => {
				window.location.reload();
			}, 300);
		} catch (error) {
			console.error(error);
			alert('no se pudo borrar familia');
		}
	};

	const handleDeleteCategory = async (id: string) => {
		try {
			await deleteCategory(id);
			console.log('borrefamailia');
			alert('Categoría borrada');
			setTimeout(() => {
				window.location.reload();
			}, 300);
		} catch (error) {
			console.error(error);
			alert('no se pudo borrar categoria');
		}
	};

	const handleDeleteSubcategory = async (id: string) => {
		try {
			await deleteSubcategoryService(id);
			console.log('borrefamailia');
			alert('Subcategoría borrada');
			setTimeout(() => {
				window.location.reload();
			}, 300);
		} catch (error) {
			console.error(error);
			alert('no se pudo borrar subcategoria');
		}
	};

	const handleUpdateFamily = async () => {
		try {
			if (!user) return;
			// Crear la familia
			let img = familyToEdit.image;
			if (familyToEdit.imageToDelete) {
				await handleDeleteFile(familyToEdit.image);
				img = '';
			}
			if (familyToEdit.rawImage && familyToEdit.id) {
				if (familyToEdit.image) await handleDeleteFile(familyToEdit.image);
				img =
					(await handleRawImageUpload(
						familyToEdit.rawImage,
						familyToEdit.id,
					)) || '';
			}
			await axios.patch(`${airontoolsAPI}/families/${familyToEdit.id}`, {
				name: familyToEdit.name,
				description: familyToEdit.description,
				images: [img],
			});
			alert('Familia actualizada');
		} catch (error) {
			alert('no se pudo actualizar familia');
		}
	};

	const handleUpdateCategory = async (key: string) => {
		try {
			const category = getCategoryInstance(key);
			if (category) {
				let img = category.image;
				if (category.imageToDelete) {
					await handleDeleteFile(category.image);
					img = '';
				}
				if (category.rawImage && category.id) {
					if (category.image) await handleDeleteFile(category.image);
					img =
						(await handleRawImageUpload(category.rawImage, category.id)) || '';
				}
				await axios.patch(`${airontoolsAPI}/categories/${category.id}`, {
					name: category.name,
					description: category.description,
					images: [img],
				});
			}
			alert('Categoria actualizada');
		} catch (error) {
			console.error('Error:', error);
			alert('No se pudo actualizar categoria');
		}
	};
	const handleUpdateSubcategory = async (key: string) => {
		try {
			const subcategory = getSubcategoryInstance(key);
			if (subcategory) {
				let img = subcategory.image;
				if (subcategory.imageToDelete) {
					await handleDeleteFile(subcategory.image);
					img = '';
				}
				if (subcategory.rawImage && subcategory.id) {
					if (subcategory.image) await handleDeleteFile(subcategory.image);
					img =
						(await handleRawImageUpload(
							subcategory.rawImage,
							subcategory.id,
						)) || '';
				}
				await axios.patch(`${airontoolsAPI}/subcategories/${subcategory.id}`, {
					name: subcategory.name,
					description: subcategory.description,
					images: [img],
				});
			}
			alert('Subcategoria actualizada');
		} catch (error) {
			console.error('Error:', error);
			alert('No se pudo actualizar subcategoria');
		}
	};
	const handleUpdateCategorization = async (e: {
		preventDefault: () => void;
	}) => {
		e.preventDefault;
		console.log('a');
	};

	const handleCreateSubcategory = async () => {
		try {
			if (!user) return;
			console.log('Subcategorias creadas');
			for (const subcategory of subcategoryInstances) {
				if (subcategory.mode !== 'create') continue;

				const subcategoryId = await createSubcategory({
					name: subcategory.name,
					description: subcategory.description,
					createdBy: user.id,
					images: [],
					family: familyToEdit.id,
					category: subcategory.category,
				});
				console.log('ID de la subcategoría:', subcategoryId._id);

				// Actualizar categoría con imagen

				const uploadedSubcategoryImageUrl = subcategory.rawImage
					? await handleRawImageUpload(subcategory.rawImage, subcategoryId._id)
					: '';
				console.log(
					'Imagen subida para la subcategoría:',
					uploadedSubcategoryImageUrl,
				);

				await axios.patch(
					`${airontoolsAPI}/subcategories/${subcategoryId._id}`,
					{
						images: [uploadedSubcategoryImageUrl],
					},
				);
			}
			alert('Proceso completado exitosamente');
			setTimeout(() => {
				window.location.reload();
			}, 300);
		} catch (error) {
			console.error(
				'Error al crear familias, categorías o subcategorías:',
				error,
			);
			alert('no se pudo crear subcategorias');
		}
	};
	const handleCreateCategory = async () => {
		try {
			if (!user) return;
			console.log('Subcategorias creadas');
			for (const category of categoryInstances) {
				if (category.mode !== 'create') continue;

				const categoryId = await createCategory({
					name: category.name,
					description: category.description,
					createdBy: user.id,
					images: [],
					family: familyToEdit.id,
				});
				console.log('ID de la categoría:', categoryId._id);

				// Actualizar categoría con imagen

				const uploadedCategoryImageUrl = category.rawImage
					? await handleRawImageUpload(category.rawImage, categoryId._id)
					: '';
				console.log(
					'Imagen subida para la categoría:',
					uploadedCategoryImageUrl,
				);

				await axios.patch(`${airontoolsAPI}/categories/${categoryId._id}`, {
					images: [uploadedCategoryImageUrl],
				});
			}
			alert('Proceso completado exitosamente');
			setTimeout(() => {
				window.location.reload();
			}, 300);
		} catch (error) {
			console.error(
				'Error al crear familias, categorías o subcategorías:',
				error,
			);
			alert('no se pudo crear categorias');
		}
	};
	return {
		handleUpdateFamily,
		handleDeleteFamily,
		handleUpdateCategory,
		handleDeleteCategory,
		handleCreateCategory,
		handleUpdateSubcategory,
		handleDeleteSubcategory,
		handleUpdateCategorization,
		handleCreateSubcategory,
	};
}
