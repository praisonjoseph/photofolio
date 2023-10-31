import React from 'react';
import { Modal, Carousel } from 'react-bootstrap';
import { useImage } from '../hooks/useImage'

function ModalCarousel({albumId, closeCarouselModal }) {
  const {
    images,
    selectedImageIndex, 
    showCarouselModal
  } = useImage(albumId)

  return (
    <Modal show={showCarouselModal} onHide={closeCarouselModal} size="lg">
      <Modal.Header closeButton />
      <Modal.Body>
        <Carousel variant='dark' interval={null} defaultActiveIndex={selectedImageIndex}>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img 
              src={image.url} 
              alt={`${image.id}`} 
              width="300" 
              height="400" 
              className="d-block w-100" 
              style={{objectFit: 'contain'}}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
}

export default ModalCarousel;
