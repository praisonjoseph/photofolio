import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { database, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { Button, Form, Modal } from 'react-bootstrap'

export default function AddImage({ albumId, album }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)
  // console.log(file)
  const openModal = () => {
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
    setFile(null)
    setName('')
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Create a album in the database
    if (albumId == null || file == null) return
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
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          await addDoc(database.images, {
            name: file.name,
            albumId: album.id,
            url: downloadURL,
            createdAt: serverTimestamp()
          });
        });
      }
    );
    setName("")
    setFile(null)
    closeModal()
  }
  return (

    <div className='ms-auto'>
      <Button onClick={openModal} variant='btn btn-outline-dark' size='lg' className='my-4 mx-2'>
        <FontAwesomeIcon style={{ paddingRight: '10px' }} icon={faFileUpload} />
        Add Image
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Image Name</Form.Label>
              <Form.Control type='text' required value={name} onChange={e => setName(e.target.value)}></Form.Control>
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
            <Button variant="dark" type="submit" size="lg">Submit</Button>
          </Modal.Footer>

        </Form>
      </Modal>
    </div>
  )
}