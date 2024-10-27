import React from 'react';
import { Container, Typography, Box, Button, Slider } from '@mui/material';
import { useImageContext } from 'src/contexts/ImageContext';
import useImageManipulation from 'src/hooks/useImageManipulation';

export const ImageViewer: React.FC = () => {
  const { imageUrl } = useImageContext();
  const { rotation, scale, rotate, changeScale, reset } = useImageManipulation();

  return (
    <Container maxWidth="md" style={{ textAlign: 'center' }}>
      {imageUrl ? (
        <Box mt={15}>
          <Box
            component="img"
            src={imageUrl}
            alt="Uploaded"
            style={{
              maxWidth: '150px',
              transform: `rotate(${rotation}deg) scale(${scale})`,
              transition: 'transform 0.2s',
              display: 'block',
              margin: '0 auto',
            }}
          />
          <Box mt={15}>
            <Button variant="contained" color="primary" onClick={rotate} sx={{ mr: 2 }}>
              Rotate
            </Button>
            <Button variant="contained" color="secondary" onClick={reset}>
              Reset
            </Button>
          </Box>
          <Box mt={2}>
            <Typography variant="body1">Scale: {scale.toFixed(2)}x</Typography>
            <Slider
              value={scale}
              onChange={(_, newValue) => changeScale(newValue as number)}
              min={0.1}
              max={2}
              step={0.1}
              valueLabelDisplay="auto"
            />
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">No image uploaded yet.</Typography>
      )}
    </Container>
  );
};

export default ImageViewer;
