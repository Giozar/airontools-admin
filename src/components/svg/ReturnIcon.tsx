interface SVGIconProps {
	width?: number;
	height?: number;
	color?: string;
	className?: string;
}

function ReturnIcon({}: SVGIconProps) {
	return (
		<svg
			className='return__icon'
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			viewBox='0 0 48 48'
		>
			<g
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={4}
			>
				<path d='m13 8l-7 6l7 7'></path>
				<path d='M6 14h22.994c6.883 0 12.728 5.62 12.996 12.5c.284 7.27-5.723 13.5-12.996 13.5H11.998'></path>
			</g>
		</svg>
	);
}

export default ReturnIcon;
