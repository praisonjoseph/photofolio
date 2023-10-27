import React from 'react';
import { Modal, Carousel } from 'react-bootstrap';

function ModalCarousel({ images, show, closeCarouselModal, initialIndex }) {

  return (
    <Modal show={show} onHide={closeCarouselModal} size="lg">
      <Modal.Header closeButton />
      <Modal.Body>
        <Carousel variant='dark' interval={null} defaultActiveIndex={initialIndex}>
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
