import React, { useState } from 'react'
import AddEditmage from '../components/AddEditImage'
import { Link, useParams, useLocation } from 'react-router-dom'
import { Button, Stack, Form, Spinner } from 'react-bootstrap'
import { useImage } from '../hooks/useImage'
import ModalCarousel from '../components/ModalCarousel'
import ShowImage from '../components/ShowImage'
import NavbarComponent from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'

export default function ImageList() {

    const { albumId } = useParams()
    const { state = {} } = useLocation()
    const album = state.album

    const {
        // setOpenAddImage, 
        // setImageId,
        // setShowCarouselModal,
        searchTerm,
        setSearchTerm, 
        images, 
        imageloading
            } = useImage(albumId)

    const [openAddimage, setOpenAddImage] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [showCarouselModal, setShowCarouselModal] = useState(false)
    const [imageId, setImageId] = useState(null)
    
    const openAddImageModal = (imageId = null) => {
        console.log(imageId)
        setImageId(imageId)
        setOpenAddImage(true)
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
                album={album}
                albumId={albumId}
                openAddimage = {openAddimage}
                setOpenAddImage = {setOpenAddImage}
                imageId ={imageId}
            />
            {!searchTerm ? (
                <div className="d-flex flex-wrap m-3">
                    {images.map((image, index) => (
                        <ShowImage
                            key={image.id}
                            image={image}
                            index={index}
                            albumId={albumId}
                            album={album}
                            openAddImageModal={openAddImageModal}
                            setSelectedImageIndex = {setSelectedImageIndex}
                            setShowCarouselModal = {setShowCarouselModal}
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
                            albumId={albumId}
                            album={album}
                            openAddImageModal={openAddImageModal}
                            setSelectedImageIndex = {setSelectedImageIndex}
                            setShowCarouselModal = {setShowCarouselModal}
                        />
                    ))}
                </div>
            )}

            < ModalCarousel
                albumId={albumId}
                closeCarouselModal={closeCarouselModal}
                showCarouselModal = {showCarouselModal}
                selectedImageIndex = {selectedImageIndex}
            />
            </div>
            )}
        </div>
    )
}
