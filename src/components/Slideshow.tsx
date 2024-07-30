import { useState } from 'react';

interface SlideshowProps {
	imagesUrl: string[];
}

function Slideshow({ imagesUrl }: SlideshowProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrevious = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === 0 ? imagesUrl.length - 1 : prevIndex - 1,
		);
	};

	const goToNext = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === imagesUrl.length - 1 ? 0 : prevIndex + 1,
		);
	};

	if (imagesUrl.length === 0) return <p>No hay imágenes disponibles</p>;

	return (
		<div className='slideshow-container'>
			<button className='nav-button prev' onClick={goToPrevious}>
				&lt;
			</button>
			<img
				src={imagesUrl[currentIndex]}
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
