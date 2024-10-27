import React, { useState } from 'react';
import { Container, Button, CircularProgress, Snackbar, Box } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useImageUpload } from 'src/hooks/useImageUpload';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const VisuallyHiddenInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function VisuallyHiddenInput(props, ref) {
    return <input type="file" ref={ref} style={{ display: 'none' }} {...props} />;
  }
);

export const ImagesUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadImage, loading, snackbarMessage, setSnackbarMessage } = useImageUpload();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadImage(selectedFile);
    }
  };

  const handleCloseSnackbar = () => setSnackbarMessage('');

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center' }}>
      <Box display="flex" alignItems="center" justifyContent="center" sx={{ margin: '20px 0' }}>
        <Button
          component="label"
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
          disabled={loading}
        >
          Upload file
          <VisuallyHiddenInput
            onChange={handleFileChange}
          />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          sx={{ marginLeft: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </Box>
      <Snackbar open={!!snackbarMessage} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Error') ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ImagesUpload;
