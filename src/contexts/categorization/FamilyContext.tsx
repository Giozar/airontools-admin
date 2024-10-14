import { FamilyCreateContextProps } from '@interfaces/Family.interface';
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';

const FamilyCreateContext = createContext<FamilyCreateContextProps | null>(
	null,
);

export const FamilyCreateProvider = ({ children }: { children: ReactNode }) => {
	const [id, setId] = useState<string>('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [rawImage, setRawImage] = useState<File | null>(null);
	const [image, setImage] = useState('');
	const [imageToDelete, setImageToDelete] = useState(false);
	const [createdBy, setCreatedBy] = useState<string>('');
	const resetFamilyValues = useCallback(() => {
		setId('');
		setName('');
		setDescription('');
		setRawImage(null);
		setImage('');
		setImageToDelete(false);
		setCreatedBy('');
	}, []);
	return (
		<FamilyCreateContext.Provider
			value={{
				id,
				setId,
				name,
				setName,
				description,
				setDescription,
				rawImage,
				setRawImage,
				image,
				setImage,
				imageToDelete,
				setImageToDelete,
				createdBy,
				setCreatedBy,
				resetFamilyValues,
			}}
		>
			{children}
		</FamilyCreateContext.Provider>
	);
};

export const useFamilyCreateContext = () => {
	const context = useContext(FamilyCreateContext);
	if (!context) {
		throw new Error(
			'useFamilyCreateContext debe ser usado dentro de un FamilyCreateProvider',
		);
	}
	return context;
};
