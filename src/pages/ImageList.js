import React, { useState } from 'react'
import AddEditmage from '../components/AddEditImage'
import { Link, useParams, useLocation } from 'react-router-dom'
import { Button, Stack, Form, Spinner } from 'react-bootstrap'
import { useAlbum } from '../hooks/useAlbum'
import ModalCarousel from '../components/ModalCarousel'
import ShowImage from '../components/ShowImage'
import NavbarComponent from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'

export default function ImageList() {

    const { albumId } = useParams()
    const { state = {} } = useLocation()
    const album = state.album

    const { images, imageloading } = useAlbum(albumId)
    const [showCarouselModal, setShowCarouselModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [openimage, setOpenImage] = useState(false)
    const [imageId, setImageId] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');

    const openAddImageModal = (imageId = null) => {
        console.log(imageId)
        setImageId(imageId)
        setOpenImage(true)
    }

    const closeCarouselModal = () => {
        setShowCarouselModal(false);
    };

    const filteredImages = images.filter((image) =>
        image.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <NavbarComponent />
            {imageloading ? (
                <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
                <Spinner animation="border" />
            </div>
            ): (
            <div>
            <Stack direction="horizontal" gap={3} className='my-3 '>
                <Link className="ms-2" to="/">
                    <Button variant='btn btn-outline-dark btn-lg'>Back</Button>
                </Link>
                <Form.Control
                    type="text"
                    placeholder="Search images"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2"
                />
                <Button
                    onClick={() => openAddImageModal()}
                    variant='btn btn-outline-dark'
                    size='lg'
                    className='me-2'
                    style={{ whiteSpace: "nowrap" }}
                >
                    <FontAwesomeIcon style={{ paddingRight: '10px' }} icon={faFileUpload} />
                    Add Image
                </Button>
            </Stack>

            <AddEditmage
                openimage={openimage}
                setOpenImage={setOpenImage}
                album={album}
                albumId={albumId}
                imageId={imageId}
            />
            {!searchTerm ? (
                <div className="d-flex flex-wrap m-3">
                    {images.map((image, index) => (
                        <ShowImage
                            key={image.id}
                            image={image}
                            index={index}
                            setSelectedImageIndex={setSelectedImageIndex}
                            setShowModal={setShowCarouselModal}
                            albumId={albumId}
                            album={album}
                            openAddImageModal={openAddImageModal}
                        />
                    ))}
                </div>

            ) : (
                <div className="d-flex flex-wrap m-3">
                    {filteredImages.map((image, index) => (
                        <ShowImage
                            key={image.id}
                            image={image}
                            index={index}
                            setSelectedImageIndex={setSelectedImageIndex}
                            setShowModal={setShowCarouselModal}
                            albumId={albumId}
                            album={album}
                            openAddImageModal={openAddImageModal}
                        />
                    ))}
                </div>
            )}

            < ModalCarousel
                images={images}
                show={showCarouselModal}
                closeCarouselModal={closeCarouselModal}
                initialIndex={selectedImageIndex}
            />
            </div>
            )}
        </div>
    )
}
