// refactoring this component for storage and database to use useReducer.
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { database, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, getMetadata } from "firebase/storage";
import { addDoc, getDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { Button, Form, Modal, Row, Col, Alert } from 'react-bootstrap'
import { useImage } from '../hooks/useImage'
import { getImageURLonUpload } from '../utility/firebasestorage';
import { editImageStorage } from '../utility/firebasestorage';

export default function AddImage({ album, albumId,
    openAddimage,
    setOpenAddImage,
    imageId
}) {

    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [progress, setProgress] = useState(0)
    const { addImage, editImage } = useImage(albumId)

    const getSingleImage = async () => {
        const docRef = doc(database.images, imageId)
        const snapshot = await getDoc(docRef)
        if (snapshot.exists()) {
            const image = snapshot.data()
            setName(image.name)
        }
    }
    useEffect(() => {
        imageId && getSingleImage()
    }, [imageId])

    useEffect(() => {
        // Do something with the progress state, e.g., display it in your component
        console.log(`Upload progress: ${progress}%`);
    }, [progress]);

    const closeModal = () => {
        setOpenAddImage(false)
        setFile(null)
        setName('')
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (albumId == null || file == null) {
            setError("Please select a file to upload")
            return
        }
        try {
            const filePath = `/images/${album.name}/`
            console.log('filePath in addeidtimage', filePath)
            const imageData = {
                name: name,
                albumId: albumId,
                url: null,
                createdAt: serverTimestamp()
            }
            if (!imageId) {
                //Add image to firebase storage
                const downloadURL = await getImageURLonUpload(file, filePath, file.name, setProgress)
                console.log('Upload successful. Download URL:', downloadURL);
                console.log('adding doc to database')
                imageData.url = downloadURL
                addImage(imageData)
            } else {

                const downloadURL = await editImageStorage(imageId, file, filePath, file.name, setProgress)
                console.log('Edit Image successful. Download URL:', downloadURL);
                console.log('updating doc to database', imageId)
                imageData.url = downloadURL
                editImage(imageData, imageId)
            }

            //Add/Edit image details on firestore database
            // updateDatabase(downloadURL);
        } catch (error) {
            console.error('Upload failed:', error);
        }

        setName('')
        setFile(null)
        closeModal()
    }

    return (
        <Modal show={openAddimage} onHide={closeModal}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <h2> {!imageId ? "Add Image" : "Edit Image"}</h2>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" required value={name} placeholder="Image Name" onChange={(e) => setName(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='btn btn-outline-dark btn-md my-2'>
                            <FontAwesomeIcon style={{ paddingRight: '10px' }} icon={faFileUpload} />Upload Image
                            <Form.Control
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ opacity: 0, position: 'absolute', left: "-9999px" }}
                            />
                        </Form.Label>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' size="lg" onClick={closeModal} >Close</Button>
                    <Button variant="dark" size="lg" onClick={() => setName('')}>Clear</Button>
                    <Button variant="dark" type="submit" size="lg">{imageId ? "Update Image" : "Submit"} </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}