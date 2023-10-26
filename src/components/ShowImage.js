import React, { useState } from 'react'
import EditImage from "../images/edit.png";
import DeleteImage from "../images/trash-bin.png";
import styles from "./ShowImage.module.css"
import AddImage from './AddImage';
export default function ShowImage({image, index, setSelectedImageIndex, setShowModal, albumId, album}) {
    const [currentHoverIndex, setcurrentHoverIndex] = useState(null);
    const imageNameWithoutExtension = image['name'].split('.').slice(0, -1).join();

    const handleDelete = () => {

    };

    const handleEditClick = () => {
        console.log("clicked")
        return(
        <AddImage albumId={albumId} album={album} />
        )
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
                <div className={styles.edit} onClick={() => handleEditClick(image.id)}>
                    <img src={EditImage} height="100%" alt="Edit" />
                </div>
                <div className={styles.delete} onClick={() => handleDelete(image.id)}>
                    <img src={DeleteImage} height="100%" alt="Delete" />
                </div>
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
                {imageNameWithoutExtension}
            </p>
        </div>
    )
}
