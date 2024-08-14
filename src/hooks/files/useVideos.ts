import { useState } from 'react';

interface Video {
	id: number;
	url: string;
}

function useVideos() {
	const [videos, setVideos] = useState<Video[]>([{ id: Date.now(), url: '' }]);

	const addVideo = () => {
		setVideos([...videos, { id: Date.now(), url: '' }]);
	};

	const removeVideo = (id: number) => {
		setVideos(videos.filter(item => item.id !== id));
	};

	const updateVideo = (id: number, url: string) => {
		setVideos(videos.map(item => (item.id === id ? { ...item, url } : item)));
	};

	return {
		videos,
		addVideo,
		removeVideo,
		updateVideo,
	};
}
export default useVideos;
