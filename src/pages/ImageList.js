import React, { useEffect, useState } from 'react'
import AddImage from '../components/AddImage'
import { Link, useParams,useLocation  } from 'react-router-dom'
import { Button, Stack } from 'react-bootstrap'
import { useAlbum } from '../hooks/useAlbum'
import ModalCarousel from '../components/ModalCarousel'
import ShowImage from '../components/ShowImage'
import NavbarComponent from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'

export default function ImageList() {

    const { albumId } = useParams()
    const { state={} } = useLocation()
    const album = state.album
    // console.log(albumId, album)

    const { images } = useAlbum(albumId)
    const [showCarouselModal, setShowCarouselModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [openimage, setOpenImage] = useState(false)
    const [imageId, setImageId] = useState(null)

    const openAddImageModal = (imageId = null) => {
        console.log(imageId)
        setImageId(imageId)
        setOpenImage(true)
    }


    const closeCarouselModal = () => {
        setShowCarouselModal(false);
    };

    return (
        <>
            <NavbarComponent />
            <Stack direction="horizontal" gap={5} style={{ minWidth: '250px' }}>
                <Link className="p-2" to="/">
                    <Button variant='btn btn-outline-dark btn-lg m-2'>Back</Button>
                </Link>
                <div className='ms-auto'>
                    <Button
                        onClick={() => openAddImageModal()}
                        variant='btn btn-outline-dark'
                        size='lg'
                        className='my-4 mx-2'
                    >
                        <FontAwesomeIcon style={{ paddingRight: '10px' }} icon={faFileUpload} />
                        Add Image
                    </Button>
                    <AddImage
                        openimage={openimage}
                        setOpenImage={setOpenImage}
                        album = {album}
                        albumId = {albumId}
                        imageId = {imageId}
                    />
                    {/* <Button
                    to={/image/}
                    state={{ album: album, albumId:albumId, openimage: openimage, setOpenImage: setOpenImage }}
                    as={Link}
                >
                </Button> */}
                </div>

            </Stack>
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
                        openAddImageModal = {openAddImageModal}
                    />
                ))}
            </div>
            <ModalCarousel
                images={images}
                show={showCarouselModal}
                closeCarouselModal={closeCarouselModal}
                initialIndex={selectedImageIndex}
            />

        </>
    )
}
