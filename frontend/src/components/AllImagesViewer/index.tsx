import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Box } from '@mui/material';
import { useImageContext } from 'src/contexts/ImageContext';

const AllImagesViewer = () => {
  const [images, setImages] = useState<string[]>([]);
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

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        All Uploaded Images
      </Typography>
      <Grid container spacing={2}>
        {images.map((imageUrl, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Box
              component="img"
              src={imageUrl}
              alt={`Uploaded ${index}`}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 1,
                boxShadow: 1,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllImagesViewer;
