export interface UserFormData {
	id?: string;
	name?: string;
	email?: string;
	imageUrl?: string;
	role?: string;
	createdBy?: string;
}

export interface UserContextProps {
	id?: string;
	setId: (value: string) => void;
	name: string;
	setName: (value: string) => void;
	email: string;
	setEmail: (value: string) => void;
	imageUrl: string;
	setImageUrl: (value: string) => void;
	rawImage: File | null;
	setRawImage: (value: File | null) => void;
	role: string;
	setRole: (value: string) => void;
	createdBy: string;
	setCreatedBy: (value: string) => void;
	password: string;
	setPassword: (value: string) => void;
}
