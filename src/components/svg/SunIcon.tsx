interface SVGIconProps {
	width?: number;
	height?: number;
	color?: string;
	className?: string;
}

function SunIcon({
	width = 24,
	height = 24,
	color = 'currentColor',
	className,
}: SVGIconProps) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill='none'
			stroke={color}
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className={className}
		>
			<circle cx='12' cy='12' r='4' />
			<path d='M12 2v2' />
			<path d='M12 20v2' />
			<path d='m4.93 4.93 1.41 1.41' />
			<path d='m17.66 17.66 1.41 1.41' />
			<path d='M2 12h2' />
			<path d='M20 12h2' />
			<path d='m6.34 17.66-1.41 1.41' />
			<path d='m19.07 4.93-1.41 1.41' />
		</svg>
	);
}

export default SunIcon;