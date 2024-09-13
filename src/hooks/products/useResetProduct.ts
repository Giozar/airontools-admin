import { useProductCreateContext } from '@contexts/product/ProductContext';

export default function useResetProduct() {
	const { ...product } = useProductCreateContext();

	const resetProduct = () => {
		if (product) {
			product.setId('');
			product.setName('');
			product.setModel('');
			product.setDescription('');
			product.setImages([]);
			product.setImagesRaw([]);
			product.setManuals([]);
			product.setManualsRaw([]);
			product.setCharacteristics([]);
			product.setSpecifications([]);
			product.setApplications([]);
			product.setRecommendations([]);
			product.setOperationRequirements([]);
			product.setVideos([]);
			product.setIncludedItems([]);
			product.setOptionalAccessories([]);
			product.setFamily('');
			product.setCategory('');
			product.setSubcategory('');
		}
	};

	return { resetProduct };
}
