import React, { useState } from 'react'
import AddImage from './AddImage'
import { Link } from 'react-router-dom'
import { Button, Stack } from 'react-bootstrap'
import { useAlbum } from '../hooks/useAlbum'
import ModalCarousel from './ModalCarousel'
import EditImage from "../images/edit.png";
import DeleteImage from "../images/trash-bin.png";

export default function ImageList({ albumId, album }) {
    const { images } = useAlbum(albumId)
    const [showModal, setShowModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const imageStyles = {
        border: '1px solid #ccc',
        padding: '15px',
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',

    };

    const openModal = (index) => {
        setSelectedImageIndex(index);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <>
            <Stack direction="horizontal" gap={5} style={{ minWidth: '250px' }}>
                <Link className="p-2" to="/">
                    <Button variant='btn btn-outline-dark btn-lg m-2'>Back</Button>
                </Link>
                <AddImage albumId={albumId} album={album} />
            </Stack>
            <div className="d-flex flex-wrap m-3">

                {images.map((image, index) => {
                    const imageName = image.name
                    const imageNameWithoutExtension = imageName.split('.').slice(0, -1).join();
                    // console.log(imageNameWithoutExtension)

                    return (
                        <div className="d-flex flex-column m-3" style={imageStyles}>
                            <img
                                key={index}
                                src={image.url}
                                alt={image.name}
                                onClick={() => openModal(index)}
                                width="200"
                                height="200"
                                style={{objectFit: 'contain'}}
                            />
                            <div>
                                {imageNameWithoutExtension}
                            </div>
                        </div>
                    )
                })}

            </div>
            <ModalCarousel
                images={images}
                show={showModal}
                onHide={closeModal}
                initialIndex={selectedImageIndex}
            />

        </>
    )
}
