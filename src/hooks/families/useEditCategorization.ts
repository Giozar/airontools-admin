import { airontoolsAPI } from '@configs/api.config';
import { useAuthContext } from '@contexts/auth/AuthContext';
import { useCategoryCreateContext } from '@contexts/categorization/CategoryContext';
import { useFamilyCreateContext } from '@contexts/categorization/FamilyContext';
import { useSubcategoryCreateContext } from '@contexts/categorization/SubcategoryContext';
import useCategoryCreate from '@hooks/categories/useCategoryCreate';
import useSubcategoryCreate from '@hooks/subcategories/useSubcategoryCreate';
import { getcategoryByFamilyId } from '@services/categories/getCategoriesByCategorization.service';
import uploadFileService from '@services/files/fileUpload.service';
import { getSubcategoryByFamilyId } from '@services/subcategories/getSubcategoriesByCategorization.service';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useFamilyUpdate from './useFamilyUpdate';

export function useEditCategorization() {
	const { ...familyToEdit } = useFamilyCreateContext();
	const { updateFamily } = useFamilyUpdate();
	const { createCategory } = useCategoryCreate();
	const { createSubcategory } = useSubcategoryCreate();
	const { user } = useAuthContext();
	const {
		addCategoryInstance,
		updateCategoryInstance,
		getAllCategoryInstances,
	} = useCategoryCreateContext();
	const categoryInstances = getAllCategoryInstances();
	const {
		addSubcategoryInstance,
		updateSubcategoryInstance,
		getAllSubcategoryInstances,
	} = useSubcategoryCreateContext();
	const subcategoryInstances = getAllSubcategoryInstances();

	const location = useLocation();
	const family = location.state?.familyId;
	//Obten los valores de para editar xdxdxd
	useEffect(() => {
		const getFamilyData = async () => {
			const response = await axios.get(`${airontoolsAPI}/families/${family}`);
			familyToEdit.setId(response.data._id);
			familyToEdit.setName(response.data.name);
			familyToEdit.setDescription(response.data.description);
			familyToEdit.setImage(response.data.images);
		};

		const getCategoryData = async () => {
			const response = await getcategoryByFamilyId(family);
			if (response.length === 0) return;
			response.forEach((category, index) => {
				const instanceId = 'cat' + index;
				addCategoryInstance(instanceId);
				updateCategoryInstance(instanceId, {
					id: category.id,
					name: category.name,
					description: category.description,
					family: category.family.id,
					image: category.images ? category.images[0] : '',
				});
			});
			console.log(response);
		};

		const getSubcategoryData = async () => {
			const response = await getSubcategoryByFamilyId(family);
			if (response.length === 0) return;
			response.forEach((category, index) => {
				const instanceId = 'cat' + index;
				addSubcategoryInstance(instanceId);
				updateSubcategoryInstance(instanceId, {
					id: category.id,
					name: category.name,
					description: category.description,
					family: category.family.id,
					image: category.images ? category.images[0] : '',
				});
			});
			console.log(response);
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
		}
	};

	const handleUpdateFamily = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (!user) return;
		// Crear la familia
		await axios.patch(`${airontoolsAPI}/families/${familyToEdit.id}`, {
			name: familyToEdit.name,
			description: familyToEdit.description,
		});
	};

	return { handleUpdateFamily };
}
