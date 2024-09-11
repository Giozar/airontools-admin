import { ProductCreateContextProps } from '@interfaces/Product.interface';
import { ProductSpecification } from '@interfaces/Specifications.interface';
import { createContext, ReactNode, useContext, useState } from 'react';

const ProductCreateContext = createContext<ProductCreateContextProps | null>(
	null,
);

export const ProductCreateProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	// Definir estados para cada propiedad del contrato
	const [id, setId] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [model, setModel] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [characteristics, setCharacteristics] = useState<string[]>([]);
	const [specifications, setSpecifications] = useState<ProductSpecification[]>(
		[],
	);
	const [family, setFamily] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [subcategory, setSubcategory] = useState<string>('');
	const [includedItems, setIncludedItems] = useState<string[]>([]);
	const [optionalAccessories, setOptionalAccessories] = useState<string[]>([]);
	const [operationRequirements, setOperationRequirements] = useState<string[]>(
		[],
	);
	const [applications, setApplications] = useState<string[]>([]);
	const [recommendations, setRecommendations] = useState<string[]>([]);
	const [images, setImages] = useState<string[]>([]);
	const [manuals, setManuals] = useState<string[]>([]);
	const [imagesRaw, setImagesRaw] = useState<File[]>([]);
	const [manualsRaw, setManualsRaw] = useState<File[]>([]);
	const [videos, setVideos] = useState<string[]>([]);
	const [createdBy, setCreatedBy] = useState<string>('');

	return (
		<ProductCreateContext.Provider
			value={{
				id,
				setId,
				name,
				setName,
				model,
				setModel,
				description,
				setDescription,
				characteristics,
				setCharacteristics,
				specifications,
				setSpecifications,
				family,
				setFamily,
				category,
				setCategory,
				subcategory,
				setSubcategory,
				includedItems,
				setIncludedItems,
				optionalAccessories,
				setOptionalAccessories,
				operationRequirements,
				setOperationRequirements,
				applications,
				setApplications,
				recommendations,
				setRecommendations,
				images,
				setImages,
				manuals,
				setManuals,
				imagesRaw,
				setImagesRaw,
				manualsRaw,
				setManualsRaw,
				videos,
				setVideos,
				createdBy,
				setCreatedBy,
			}}
		>
			{children}
		</ProductCreateContext.Provider>
	);
};

export const useProductCreateContext = () => {
	const context = useContext(ProductCreateContext);
	if (!context) {
		throw new Error(
			'useProductCreateContext debe ser usado dentro de un ProductCreateProvider',
		);
	}
	return context;
};
