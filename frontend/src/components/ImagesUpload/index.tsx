import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  Input,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useImageContext } from 'src/contexts/ImageContext';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ImagesUpload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const { setImageUrl } = useImageContext();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', selectedImage);

      try {
        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setImageUrl(response.data.imageUrl);
        setSnackbarMessage('Image uploaded successfully!');
      } catch (error) {
        setSnackbarMessage('Error uploading image. ' + JSON.stringify(error));
      } finally {
        setLoading(false);
        setSnackbarOpen(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4">Image Upload</Typography>
      <Input
        type="file"
        onChange={handleImageChange}
        inputProps={{ accept: 'image/*' }}
        sx={{ margin: '20px 0' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!selectedImage || loading}
        sx={{ marginBottom: '20px' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Upload'}
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Error') ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ImagesUpload;
