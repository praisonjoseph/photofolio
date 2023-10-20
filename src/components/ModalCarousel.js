import React from 'react';
import { Modal, Carousel } from 'react-bootstrap';

function ModalCarousel({ images, show, onHide, initialIndex }) {
  const imageStyle = {
    objectFit: 'contain', // Maintain aspect ratio and fit the entire image
    width: '100%',
    height: '100%',
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton />
      <Modal.Body>
        <Carousel variant='dark' interval={500} defaultActiveIndex={initialIndex}>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img 
              src={image.url} 
              alt={`Image ${image.id}`} 
              width="200" 
              height="400" 
              className="d-block w-100" 
              style={imageStyle}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
}

export default ModalCarousel;
