import React, { useState } from 'react'
import EditImage from "../images/edit.png";
import DeleteImage from "../images/trash-bin.png";
import styles from "./ShowImage.module.css"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function ShowImage({ image, index, setSelectedImageIndex, setShowModal, albumId, album, openAddImageModal }) {
    const [currentHoverIndex, setcurrentHoverIndex] = useState(null);
    const imageNameWithoutExtension = image['name'].split('.').slice(0, -1).join();

    const handleDelete = () => {

    };

    const handleEditClick = (imageId) => {
        console.log("clicked")

        // <AddImage albumId={albumId} album={album} />

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
        setSelectedImageIndex(index);
        setShowModal(true);
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
                {/* <div className={styles.edit} onClick={() => handleEditClick(image.id)}>
                    <img src={EditImage} height="100%" alt="Edit" />
                </div>
                <div className={styles.delete} onClick={() => handleDelete(image.id)}>
                    <img src={DeleteImage} height="100%" alt="Delete" />
                </div> */}
                <Link 
                className={styles.edit} 
                onClick={() => openAddImageModal(image.id)}
                to={`/album/${album.id}`}
                state={{album}}
                as={Link}
                >
                    <img src={EditImage} height="100%" alt="Edit" />
                </Link>
                <Link className={styles.delete} onClick={() => handleDelete(image.id)}>
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
