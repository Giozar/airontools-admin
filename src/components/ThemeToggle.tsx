import BriefcaseIcon from '@components/svg/BriefcaseIcon';
import MoonIcon from '@components/svg/MoonIcon';
import PawIcon from '@components/svg/PawIcon';
import SunIcon from '@components/svg/SunIcon';
import { useEffect, useState } from 'react';
// ThemeToggleButton.tsx

const themes = [
	'dark-theme',
	'dark-blue-theme',
	'storm-light-theme',
	'light-theme',
];
const icons = [
	<BriefcaseIcon key='brief' />,
	<SunIcon key='sun' />,
	<PawIcon key='paw' />,
	<MoonIcon key='moon' />,
];
function ThemeToggleButton() {
	const [currentThemeIndex, setCurrentThemeIndex] = useState<number>(0);

	useEffect(() => {
		// Apply the current theme from localStorage or default to light theme
		const savedThemeIndex = localStorage.getItem('themeIndex');
		if (savedThemeIndex) {
			setCurrentThemeIndex(parseInt(savedThemeIndex, 10));
		}
		document.documentElement.classList.add(themes[currentThemeIndex]);
	}, [currentThemeIndex]);

	const toggleTheme = () => {
		document.documentElement.classList.remove(themes[currentThemeIndex]);
		const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
		setCurrentThemeIndex(nextThemeIndex);
		document.documentElement.classList.add(themes[nextThemeIndex]);
		localStorage.setItem('themeIndex', nextThemeIndex.toString());
	};

	return (
		<button onClick={toggleTheme} className='header__button-toggle-theme '>
			{icons[currentThemeIndex]}
		</button>
	);
}

export default ThemeToggleButton;
