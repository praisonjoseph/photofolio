import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFolderPlus} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { database } from '../firebase';
import { addDoc, serverTimestamp } from "firebase/firestore"; 

export default function AddFolderButton() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const openModal = () =>{
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        // Create a album in the database
        await addDoc(database.album, {
            name: name,
            createdAt: serverTimestamp()
          });
        setName("")
        closeModal()
    }
  return (
    <>
    <Button onClick={openModal} variant='dark' size='lg' className='my-4 mx-2'>
        <FontAwesomeIcon style={{paddingRight:'10px'}} icon={faFolderPlus} />
        Add Album
    </Button>
    <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Album Name</Form.Label>
                    <Form.Control type='text' required value={name} onChange={e => setName(e.target.value)}></Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' size="lg" onClick={closeModal} >Close</Button>
                <Button variant="dark" size="lg"  onClick={() => setName("")}>Clear</Button>
                <Button variant="dark" type="submit" size="lg">Add Album</Button>
            </Modal.Footer>
            
        </Form>
    </Modal>
    </>
  )
}
