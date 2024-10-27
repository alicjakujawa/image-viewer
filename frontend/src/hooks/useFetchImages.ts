import { useEffect, useState } from 'react';
import axios from 'axios';
import { useImageContext } from 'src/contexts/ImageContext';

export const useFetchImages = () => {
  const [images, setImages] = useState([]);
  const { imageUrl } = useImageContext();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/images');
        setImages(response.data.images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [imageUrl]);

  return images;
};
