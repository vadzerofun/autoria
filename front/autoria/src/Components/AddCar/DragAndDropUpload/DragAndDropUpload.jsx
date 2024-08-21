import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'react-bootstrap';
import './DragAndDropUpload.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

// import required modules
import { FreeMode } from 'swiper/modules';

export const DragAndDropUpload = ({ onFilesAdded, images, existingImages }) => {
  const [isSwiperActive, setIsSwiperActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!isSwiperActive) {
        onFilesAdded(acceptedFiles);
      }
    },
    [onFilesAdded, isSwiperActive]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg', '.jpeg']
    },
    maxFiles: 40,
    noClick: isSwiperActive,
    noKeyboard: isSwiperActive
  });

  const handleSwiperInteraction = (e) => {
    if (e.target.className.includes('swiper') || e.target.tagName === 'IMG') {
      setIsSwiperActive(true);
    }
    else {
      setIsSwiperActive(false);
    }
  };

  // imagesURL
  const imagesURL = import.meta.env.VITE_IMAGES_URL;

  return (
    <div
      onPointerDown={handleSwiperInteraction}
      {...getRootProps()}
      className="d-flex flex-column align-items-center justify-content-center mb-4 imageDropzone">
      <input {...getInputProps()} />
      <Button>Додайте фото</Button>
      <p className="imageDropzoneText">
        Ми рекомендуємо щонайменше 15 фотографій, але ви можете додати максимум 40 фотографій.
        Приймаються формати файлів JPG та PNG.
      </p>
      {images.length > 0 && (
        <Swiper
          spaceBetween={10}
          slidesPerView={'auto'}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode]}
          className="addCarGallery"
        >
          {existingImages.map((imagePath, index) => (
            <SwiperSlide key={`existing-car-slide-${index}`}>
              <img src={`${imagesURL}${imagePath}`} alt='car' />
            </SwiperSlide>
          ))}
          {images.map((image, index) => (
            <SwiperSlide key={`add-car-slide-${index}`}>
              <img src={URL.createObjectURL(image)} alt='car'/>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
