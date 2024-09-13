import { CategoryCreateContextProps } from '@interfaces/Category.interface';

// Category Class

export class CategoryInstance implements CategoryCreateContextProps {
	id: string;
	family: string;
	name: string;
	description: string;
	rawImage: File | null;
	image: string;
	createdBy: string;

	constructor() {
		this.id = '';
		this.family = '';
		this.name = '';
		this.description = '';
		this.rawImage = null;
		this.image = '';
		this.createdBy = '';
	}

	setId(id: string) {
		this.id = id;
	}

	setFamily(family: string) {
		this.family = family;
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

	setCreatedBy(createdBy: string) {
		this.createdBy = createdBy;
	}
}
