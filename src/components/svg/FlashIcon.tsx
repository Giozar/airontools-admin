interface SVGIconProps {
	width?: number;
	height?: number;
	color?: string;
	className?: string;
}

function FlashIcon({
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
			<path d='M13 10V3L4 14h7v7l9-11h-7z' />
		</svg>
	);
}

export default FlashIcon;
