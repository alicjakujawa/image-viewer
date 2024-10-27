import { Grid, Typography, Box } from '@mui/material';
import { useFetchImages } from 'src/hooks/useFetchImages';

const AllImagesViewer = () => {
  const images = useFetchImages();

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
