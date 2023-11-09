import React, { useEffect, useState } from 'react'
import EditImage from "../images/edit.png";
import DeleteImage from "../images/trash-bin.png";
import styles from "./ShowImage.module.css"
import { Link } from 'react-router-dom'
import { useImage } from '../hooks/useImage'


export default function ShowImage({ 
            image, index, albumId, album, openAddImageModal,
            setSelectedImageIndex, 
            setShowCarouselModal 
    }) {
        
    const {deleteImage} = useImage(albumId)
    const [currentHoverIndex, setcurrentHoverIndex] = useState(null);

    const handleDelete = async (imageId) => {
        deleteImage(imageId).then((isdeleted) => {
            console.log('is deleted', isdeleted)
        })
        
    };

    const handleEditClick = (imageId) => {
        openAddImageModal(imageId)
    };
    const imageStyles = {
        border: '1px solid #ccc',
        padding: '15px',
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
    };

    const openModal = (index) => {
        console.log(index)
        setSelectedImageIndex(index);
        setShowCarouselModal(true);
    };


    return (
        <div
            className="d-flex flex-column m-3"
            style={imageStyles}
            onMouseOver={() => {
                setcurrentHoverIndex(image.id);
            }}
            onMouseLeave={() => {
                setcurrentHoverIndex(null);
            }}
        >
            <div className={`${styles.buttonGroup} ${currentHoverIndex === image.id && styles.active}`}  >
                <Link
                    className={styles.edit}
                    onClick={() => handleEditClick(image.id)}
                    to={`/album/${album.id}`}
                    state={{ album }}
                    as={Link}
                >
                    <img src={EditImage} height="100%" alt="Edit" />
                </Link>
                <Link
                    className={styles.delete}
                    onClick={() => handleDelete(image.id)}
                    to={`/album/${album.id}`}
                    state={{ album }}
                >
                    <img src={DeleteImage} height="100%" alt="Delete" />
                </Link>
            </div>
            <img
                key={index}
                src={image.url}
                alt={image.name}
                onClick={() => openModal(index)}
                width="200"
                height="200"
                style={{ objectFit: 'contain' }}
            />
            <p>
                {image.name}
            </p>
        </div>
    )
}
