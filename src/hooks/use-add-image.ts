import React from 'react';

export function useAddImage(setImage: React.Dispatch<React.SetStateAction<string>>) {
  const [tooBigImage, setTooBigImage] = React.useState(false);

  const addImageHandler = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const maxSize = 300 * 1024; // 300KB, ограничение для размера изображения, чтобы быстро не переполнить localStorage
        if (file.size <= maxSize) {
          const reader = new FileReader();
          reader.onload = function (event: ProgressEvent<FileReader>) {
            const imageData = event.target?.result;
            setImage(String(imageData));
            setTooBigImage(false);
          };
          reader.readAsDataURL(file);
        } else {
          setTooBigImage(true);
        }
      }
    };
    input.click();
    return () => {
      input.remove();
    };
  };

  const handleTooBigImage = () => {
    setTooBigImage((prev) => !prev);
  };

  return { tooBigImage, addImageHandler, handleTooBigImage };
}
