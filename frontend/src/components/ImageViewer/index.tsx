import React from 'react';
import { Container, Typography, Box, Button, Slider } from '@mui/material';
import { useImageContext } from 'src/contexts/ImageContext';
import useImageManipulation from 'src/hooks/useImageManipulation';

export const ImageViewer: React.FC = () => {
  const { imageUrl } = useImageContext();
  const { scale, rotate, changeScale, reset, canvasRef, setFlipHorizontal, setFlipVertical } = useImageManipulation(imageUrl);

  return (
    <Container maxWidth="md" style={{ textAlign: 'center' }}>
      {imageUrl ? (
        <Box>
          <canvas ref={canvasRef} style={{ maxWidth: '100%', margin: '0 auto' }} />
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={rotate} sx={{ mr: 2 }}>
              Rotate
            </Button>
            <Button variant="contained" color="secondary" onClick={reset}>
              Reset
            </Button>
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={() => setFlipHorizontal(prev => !prev)} sx={{ mr: 2 }}>
              Flip Horizontal
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setFlipVertical(prev => !prev)}>
              Flip Vertical
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
