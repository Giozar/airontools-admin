interface SVGIconProps {
	width?: number;
	height?: number;
	color?: string;
	className?: string;
}

function PlusIcon({
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
			<path d='M5 12h14' />
			<path d='M12 5v14' />
		</svg>
	);
}

export default PlusIcon;
