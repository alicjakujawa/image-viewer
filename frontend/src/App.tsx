import { ImageProvider } from 'src/contexts/ImageContext';
import ImagesUpload from 'src/components/ImagesUpload';
import ImageViewer from 'src/components/ImageViewer';
import AllImagesViewer from 'src/components/AllImagesViewer';
import { Container, Grid, Paper, Typography } from '@mui/material';

import './App.css';

const App = () => {
  return (
    <ImageProvider>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Image Viewer
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <ImagesUpload />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <ImageViewer />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <AllImagesViewer />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ImageProvider>
  );
};

export default App;
