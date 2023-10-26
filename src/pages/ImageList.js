import React, { useState } from 'react'
import AddImage from '../components/AddImage'
import { Link } from 'react-router-dom'
import { Button, Stack } from 'react-bootstrap'
import { useAlbum } from '../hooks/useAlbum'
import ModalCarousel from '../components/ModalCarousel'
import ShowImage from '../components/ShowImage'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import NavbarComponent from '../components/Navbar'

export default function ImageList() {

    const { albumId } = useParams()
    const { state } = useLocation()
    const album = state.album
    // console.log(albumId, album)

    const { images } = useAlbum(albumId)
    const [showModal, setShowModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <NavbarComponent />
            <Stack direction="horizontal" gap={5} style={{ minWidth: '250px' }}>
                <Link className="p-2" to="/">
                    <Button variant='btn btn-outline-dark btn-lg m-2'>Back</Button>
                </Link>
                <AddImage albumId={albumId} album={album} />
            </Stack>
            <div className="d-flex flex-wrap m-3">
                {images.map((image, index) => (
                    <ShowImage 
                    key={image.id}
                    image={image} 
                    index = {index}
                    setSelectedImageIndex ={setSelectedImageIndex}
                    setShowModal = {setShowModal}
                    albumId = {albumId}
                    album = {album}
                    />
                ))}
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
