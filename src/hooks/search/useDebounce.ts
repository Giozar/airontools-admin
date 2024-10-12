import debounce from 'just-debounce-it';
import { useCallback } from 'react';
import { Search } from 'react-router-dom';

export default function useDebounce({ callback }: { callback: Function }) {
	const debouncedSearch = useCallback(
		debounce((search: Search) => {
			callback({ search });
		}, 300),
		[callback],
	);

	return { debouncedSearch };
}
