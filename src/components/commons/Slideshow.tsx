import { useState } from 'react';

interface SlideshowProps {
	images: string[];
	showNumbers?: boolean;
}

function Slideshow({ showNumbers, images }: SlideshowProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrevious = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1,
		);
	};

	const goToNext = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1,
		);
	};

	if (images.length === 0) return <p>No hay imágenes disponibles</p>;

	return (
		<div className='slideshow-container'>
			{showNumbers && (
				<p className='number-counter' onClick={goToPrevious}>
					{currentIndex + 1}
				</p>
			)}
			<button className='nav-button prev' onClick={goToPrevious}>
				&lt;
			</button>
			<img
				src={images[currentIndex]}
				alt={`Slide ${currentIndex + 1}`}
				className='slideshow-image'
			/>
			<button className='nav-button next' onClick={goToNext}>
				&gt;
			</button>
		</div>
	);
}

export default Slideshow;
