import { Container, Typography, Box } from '@mui/material';
import { useImageContext } from 'src/contexts/ImageContext';

export const ImageViewer = () => {
  const { imageUrl } = useImageContext();

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center' }}>
      {imageUrl ? (
        <Box>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '500px' }} />
        </Box>
      ) : (
        <Typography variant="body1">No image uploaded yet.</Typography>
      )}
    </Container>
  );
};

export default ImageViewer;
