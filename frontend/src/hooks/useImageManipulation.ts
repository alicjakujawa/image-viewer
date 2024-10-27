import { useState } from 'react';

interface UseImageManipulation {
  rotation: number;
  scale: number;
  rotate: () => void;
  changeScale: (newScale: number) => void;
  reset: () => void;
}

const useImageManipulation = (): UseImageManipulation => {
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);

  const rotate = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  const changeScale = (newScale: number) => {
    setScale(newScale);
  };

  const reset = () => {
    setRotation(0);
    setScale(1);
  };

  return {
    rotation,
    scale,
    rotate,
    changeScale,
    reset,
  };
};

export default useImageManipulation;
