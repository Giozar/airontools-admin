interface SVGIconProps {
	width?: number;
	height?: number;
	color?: string;
	className?: string;
}

function CrossIcon({
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
			<circle cx='12' cy='12' r='10' />
			<path d='m15 9-6 6' />
			<path d='m9 9 6 6' />
		</svg>
	);
}

export default CrossIcon;
