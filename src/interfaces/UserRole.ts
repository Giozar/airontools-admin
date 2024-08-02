export interface UserRole {
	_id: string;
	name: string;
	description: string;
	permissions: object;
	createdBy: string;
	updatedBy: string;
}
