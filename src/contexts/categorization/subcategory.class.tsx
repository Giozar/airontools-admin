// Subcategory Class

import { SubcategoryCreateContextProps } from '@interfaces/subcategory.interface';

export class SubcategoryInstance implements SubcategoryCreateContextProps {
	id: string;
	family: string;
	category: string;
	name: string;
	description: string;
	rawImage: File | null;
	image: string;
	imageToDelete: boolean;
	createdBy: string;
	mode: 'create' | 'edit';

	constructor(
		id?: string,
		family?: string,
		category?: string,
		name?: string,
		description?: string,
		image?: string,
		imageToDelete?: boolean,
		createdBy?: string,
		mode?: 'create' | 'edit',
	) {
		this.id = id || '';
		this.family = family || '';
		this.category = category || '';
		this.name = name || '';
		this.description = description || '';
		this.rawImage = null;
		this.image = image || '';
		this.imageToDelete = imageToDelete || false;
		this.createdBy = createdBy || '';
		this.mode = mode || 'create';
	}

	setId(id: string) {
		this.id = id;
	}

	setFamily(family: string) {
		this.family = family;
	}

	setCategory(category: string) {
		this.category = category;
	}

	setName(name: string) {
		this.name = name;
	}

	setDescription(description: string) {
		this.description = description;
	}

	setRawImage(rawImage: File | null) {
		this.rawImage = rawImage;
	}

	setImage(image: string) {
		this.image = image;
	}
	setImageToDelete(imageToDelete: boolean) {
		this.imageToDelete = imageToDelete;
	}
	setCreatedBy(createdBy: string) {
		this.createdBy = createdBy;
	}
	setMode(mode: 'create' | 'edit') {
		this.mode = mode;
	}
}
