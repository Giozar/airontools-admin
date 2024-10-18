// Custom hook to debounce the callback function
import debounce from 'just-debounce-it';
import { useMemo } from 'react';

export default function useDebounce(
	callback: (arg: string) => void,
	delay: number,
) {
	const debouncedFetch = useMemo(
		() => debounce(callback, delay),
		[callback, delay],
	);
	return { debouncedFetch };
}
