import { useState, useEffect, useRef } from 'react';

interface UseImageManipulation {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  rotation: number;
  scale: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  rotate: () => void;
  changeScale: (newScale: number) => void;
  reset: () => void;
  setFlipHorizontal: React.Dispatch<React.SetStateAction<boolean>>;
  setFlipVertical: React.Dispatch<React.SetStateAction<boolean>>;
}

const useImageManipulation = (imageUrl: string | null): UseImageManipulation => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(false);
  const [flipVertical, setFlipVertical] = useState<boolean>(false);
  const BASE_WIDTH = window.innerWidth / 4;

  const rotate = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  const changeScale = (newScale: number) => {
    setScale(newScale);
  };

  const reset = () => {
    setRotation(0);
    setScale(1);
    setFlipHorizontal(false);
    setFlipVertical(false);
  };

  useEffect(() => {
    if (canvasRef.current && imageUrl) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const image = new Image();
      image.src = imageUrl;

      image.onload = () => {
        const aspectRatio = image.height / image.width;
        const width = BASE_WIDTH * scale;
        const height = width * aspectRatio;

        const swap = rotation % 180 !== 0;

        const scaledWidth = swap ? height : width;
        const scaledHeight = swap ? width : height;
  
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
  
        ctx.translate(scaledWidth / 2, scaledHeight / 2);
        ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(scale, scale);
  
        ctx.drawImage(image, -BASE_WIDTH / 2, -BASE_WIDTH * aspectRatio / 2, BASE_WIDTH, BASE_WIDTH * aspectRatio);
        ctx.restore();
      };
    }
  }, [imageUrl, rotation, scale, flipHorizontal, flipVertical, BASE_WIDTH]);

  return {
    rotation,
    scale,
    rotate,
    changeScale,
    reset,
    setFlipHorizontal,
    setFlipVertical,
    flipHorizontal,
    flipVertical,
    canvasRef,
  };
};

export default useImageManipulation;
