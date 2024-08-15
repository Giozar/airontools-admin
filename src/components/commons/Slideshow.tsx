import { useState } from 'react';

interface SlideshowProps {
	images: string[];
}

function Slideshow({ images }: SlideshowProps) {
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
