export interface Specification {
	id_: string;
	name: string;
	description?: string;
	units?: string;
	familyId: string;
	categoryId: string;
	subcategoryId?: string;
	createdBy?: string;
	updatedBy?: string;
}
export interface SpecificationSuccessResponse {}