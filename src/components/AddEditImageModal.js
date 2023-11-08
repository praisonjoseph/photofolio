// refactoring this component for storage and database to use useReducer.
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { database, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, getMetadata } from "firebase/storage";
import { addDoc, getDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { Button, Form, Modal, Row, Col, Alert } from 'react-bootstrap'
import { useImage } from '../hooks/useImage'

export default function AddImage({ album, albumId,
    openAddimage,
    setOpenAddImage,
    imageId
}) {

    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [progress, setProgress] = useState(null)

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


    const closeModal = () => {
        setOpenAddImage(false)
        setFile(null)
        setName('')
        setError('')
    }

    const checkImageExistsinStorage = async (storageRef) => {
        try {
            const metadata = await getMetadata(storageRef);
            return true;
        } catch (error) {
            console.error('An error occurred:', error);
            // You can handle the error here or re-throw it if needed
            if (error.code === 'storage/object-not-found') {
                return false; // File does not exist
            } else {
                throw error; // Re-throw the error for further handling
            }
        }
    }

    const updateDatabase = async (downloadURL) => {
        try {
            // Update the image document in the database
            const imageData = {
                name: name,
                albumId: albumId,
                url: downloadURL,
                createdAt: serverTimestamp()
            }
            if (!imageId) {
                console.log('adding doc to database')
                await addDoc(database.images, imageData);
            } else {
                console.log('updating doc to database', imageId)
                const docRef = doc(database.images, imageId)
                await updateDoc(docRef, imageData);
            }
        } catch (error) {
            console.error('Error updating the database:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Create a album in the database
        if (albumId == null || file == null) {
            setError("Please select a file to upload")
            return
        }
        // const fileName = file.name + new Date().getTime()
        const storageRef = ref(storage, `/images/${album.name}/${file.name}`);
        try {
            const exists = await checkImageExistsinStorage(storageRef);
            if (exists) {
                console.log('File exists in Firebase Storage.');
                // Get the download URL for the existing image
                const downloadURL = await getDownloadURL(storageRef);
                console.log('File available at', downloadURL);

                // Update the database and close the modal
                updateDatabase(downloadURL);
            } else {
                console.log('File does not exist in Firebase Storage.');
                // Upload the new image to Firebase Storage
                const uploadTask = uploadBytesResumable(storageRef, file);
                // Listen for state changes on the upload task
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Handle progress or other state changes here
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setProgress(progress);
                    },
                    (error) => {
                        // Handle errors during upload
                        console.error('Upload error:', error);
                    },
                    async () => {
                        // Handle successful uploads on complete

                        // Get the download URL for the newly uploaded image
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('File available at', downloadURL);

                        // Update the database and close the modal
                        updateDatabase(downloadURL);
                    }
                );
            }
        } catch (error) {
            console.error('An error occurred:', error);
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