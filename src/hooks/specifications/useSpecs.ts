interface Spec {
	catId: string;
	subcatId: string;
	initialSpecs?: Array<{ specification: string; value: string }>;
	flag?: boolean;
}

function useSpecs({ catId, subcatId, initialSpecs, flag }: Spec) {}

export default useSpecs;
