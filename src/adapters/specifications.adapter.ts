import {
	SpecDataBackend,
	SpecDataFrontend,
	SpecDataToSend,
} from '@interfaces/Specifications.interface';
import { transformUserDataFront } from './user.adapter';

export const transformSpecDataToFrontend = (
	Spec: SpecDataBackend,
): SpecDataFrontend => {
	return {
		id: Spec._id,
		name: Spec.name,
		description: Spec.description,
		unit: Spec.unit,
		families: Spec.families,
		categories: Spec.categories,
		subcategories: Spec.subcategories,
		createdBy: transformUserDataFront(Spec.createdBy),
	};
};

export const transformSpecDataToBackend = (
	Spec: SpecDataFrontend,
): SpecDataToSend => {
	return {
		_id: Spec.id,
		name: Spec.name,
		description: Spec.description,
		unit: Spec.unit,
		families: Spec.families.map(family => family._id || ''),
		categories: Spec.categories.map(category => category._id || ''),
		subcategories: Spec.subcategories.map(subcategory => subcategory._id || ''),
		createdBy: Spec.createdBy.id,
	};
};
