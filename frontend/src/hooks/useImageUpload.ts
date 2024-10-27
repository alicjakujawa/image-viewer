import { useState } from 'react';
import axios from 'axios';
import { useImageContext } from 'src/contexts/ImageContext';

export const useImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { setImageUrl } = useImageContext();

  const uploadImage = async (file: File) => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImageUrl(response.data.imageUrl);
      setSnackbarMessage('Image uploaded successfully!');
    } catch (error) {
      setSnackbarMessage('Error uploading image: ' + JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading, snackbarMessage, setSnackbarMessage };
};
