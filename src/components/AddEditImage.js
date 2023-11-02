import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { database, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, getDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { Button, Form, Modal, Row, Col, Alert } from 'react-bootstrap'
import { useImage } from '../hooks/useImage'

export default function AddImage({ album, albumId, openAddimage, 
              setOpenAddImage,
              imageId
  }) {

  const [name, setName] = useState('')
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const {
    // openAddimage,
    // setOpenAddImage, 
    // imageId 
  } = useImage(albumId)

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
  },[imageId])

  const closeModal = () => {
    setOpenAddImage(false)
    setFile(null)
    setName('')
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Create a album in the database
    if (albumId == null || file == null) {
      setError("Please select a file to upload")
      return
    }
    // const fileName = file.name + new Date().getTime()
    const storageRef = ref(storage, `/images/${album.name}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            if (!imageId) {
              await addDoc(database.images, {
                name: name,
                albumId: album.id,
                url: downloadURL,
                createdAt: serverTimestamp()
              });

            } else {
              const docRef = doc(database.images, imageId)
              await updateDoc(docRef, {
                name: name,
                albumId: album.id,
                url: downloadURL,
                createdAt: serverTimestamp()
              });
            }

          })
          .catch(error => {
            console.log('Error updating database ', error);
          })
      }
    );
    setName("")
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
          <Button variant="dark" size="lg" onClick={() => setName("")}>Clear</Button>
          <Button variant="dark" type="submit" size="lg">{imageId ? "Update Image" : "Submit"} </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}