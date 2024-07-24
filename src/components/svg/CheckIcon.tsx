interface SVGIconProps {
	width?: number;
	height?: number;
	color?: string;
	className?: string;
}

function CheckIcon({
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
			<path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
			<path d='m9 11 3 3L22 4' />
		</svg>
	);
}

export default CheckIcon;
