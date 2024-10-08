import { transformCategoryDataToFrontend } from '@adapters/category.adapter';
import { airontoolsAPI } from '@configs/api.config';
import {
	CategoryDataBackend,
	CategoryDataFrontend,
} from '@interfaces/Category.interface';
import { errorHandler } from '@utils/errorHandler.util';

import axios from 'axios';

export const getcategoryByFamilyIdService = async (
	familyId: string,
): Promise<CategoryDataFrontend[]> => {
	try {
		const response = await axios.get<CategoryDataBackend[]>(
			`${airontoolsAPI}/categories/family/${familyId}`,
		);
		const category = response.data;
		return category.map(product => transformCategoryDataToFrontend(product));
	} catch (error) {
		throw errorHandler(error);
	}
};
