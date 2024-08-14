import { useState } from 'react';
interface Item {
	id: number;
	value: string;
}
const useCharacteristics = () => {
	const [characteristics, setCharacteristics] = useState<Item[]>([
		{ id: Date.now(), value: '' },
	]);
	const addCharacteristic = () => {
		setCharacteristics([...characteristics, { id: Date.now(), value: '' }]);
	};

	const removeCharacteristic = (id: number) => {
		setCharacteristics(characteristics.filter(item => item.id !== id));
	};

	const updateCharacteristic = (id: number, value: string) => {
		setCharacteristics(
			characteristics.map(item => (item.id === id ? { ...item, value } : item)),
		);
	};

	return {
		characteristics,
		addCharacteristic,
		removeCharacteristic,
		updateCharacteristic,
	};
};

export default useCharacteristics;
