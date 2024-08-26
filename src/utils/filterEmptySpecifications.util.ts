import { ProductSpecification } from '@interfaces/Specifications.interface';

export function filterEmptySpecifications(
	specifications: ProductSpecification[],
): ProductSpecification[] {
	return specifications.filter(spec => spec.value.trim() !== '');
}
