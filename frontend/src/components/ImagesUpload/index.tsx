import React, { useState } from 'react';
import { Container, Button, Input, CircularProgress, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useImageUpload } from 'src/hooks/useImageUpload';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ImagesUpload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { uploadImage, loading, snackbarMessage, setSnackbarMessage } = useImageUpload();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedImage) uploadImage(selectedImage);
  };

  const handleCloseSnackbar = () => setSnackbarMessage('');

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center' }}>
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
      <Snackbar open={!!snackbarMessage} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Error') ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ImagesUpload;
